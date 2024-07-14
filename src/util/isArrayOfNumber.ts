export const isArrayOfNumber = (data: number[]) => {
  return data.every((num) => typeof num === "number" && Number.isInteger);
};
