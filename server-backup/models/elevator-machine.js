import mongoose from "mongoose";

const elevatorMachineSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true // one machine per product
        },
        machineType: {
            type: String, // Geared, Gearless
            required: true
        },
        driveType: {
            type: String, // VVVF, AC, DC
        },
        loadCapacity: {
            type: Number, // in KG
            required: true
        },
        speed: {
            type: Number // m/s
        },
        powerRating: {
            type: String // e.g. 7.5 kW
        },
        voltage: {
            type: String // e.g. 415V
        },
        brand: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model("ElevatorMachine", elevatorMachineSchema);
