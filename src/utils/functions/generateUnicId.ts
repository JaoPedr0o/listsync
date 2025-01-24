export const generateUnicId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};
