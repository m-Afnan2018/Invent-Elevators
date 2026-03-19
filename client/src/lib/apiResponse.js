export const extractData = (payload) => {
  if (payload == null) return null;
  if (Array.isArray(payload)) return payload;
  if (payload.data != null) return payload.data;
  if (payload.item != null) return payload.item;
  return payload;
};

export const extractCollection = (payload, preferredKeys = []) => {
  if (Array.isArray(payload)) return payload;

  const normalized = extractData(payload);
  if (Array.isArray(normalized)) return normalized;

  for (const key of preferredKeys) {
    if (Array.isArray(payload?.[key])) return payload[key];
    if (Array.isArray(normalized?.[key])) return normalized[key];
  }

  if (normalized && typeof normalized === 'object') {
    const firstArray = Object.values(normalized).find(Array.isArray);
    if (firstArray) return firstArray;
  }

  if (payload && typeof payload === 'object') {
    const firstArray = Object.values(payload).find(Array.isArray);
    if (firstArray) return firstArray;
  }

  return [];
};
