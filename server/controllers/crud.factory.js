export const createOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAll = (Model, populate = "") => async (req, res) => {
  try {
    const query = Model.find();
    if (populate) query.populate(populate);
    const docs = await query.sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOne = (Model, populate = "") => async (req, res) => {
  try {
    const query = Model.findById(req.params.id);
    if (populate) query.populate(populate);
    const doc = await query;
    if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOne = (Model) => async (req, res) => {
  try {
    // Strip empty strings so they don't fail type casts (e.g. Date fields)
    const body = Object.fromEntries(
      Object.entries(req.body).filter(([, v]) => v !== "")
    );
    const doc = await Model.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
