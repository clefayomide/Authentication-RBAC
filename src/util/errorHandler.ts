import { CustomError } from "../lib/custom/errorConstructor";

export const errorHandler = (error: string | Error | CustomError) => {
  if (error instanceof CustomError) {
    const { message = "", data } = error;
    return { errorMessage: message, data };
  }
  if (error instanceof Error) {
    const { message = "" } = error;
    return { errorMessage: message };
  }
  return { errorMessage: error };
};
