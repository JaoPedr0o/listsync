export const isValidItemName = (name: string) => {
  return name.length >= 3 && name.length <= 20;
};

export const isValidQuantity = (quantity: string) => {
  return quantity !== '0' && quantity.trim() !== '';
};
