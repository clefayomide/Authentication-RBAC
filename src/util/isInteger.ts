export const isInteger = (value: unknown) => {
  if (typeof value === "string") {
    return false;
  }
  return typeof value === "number" && Number.isInteger(value);
};
