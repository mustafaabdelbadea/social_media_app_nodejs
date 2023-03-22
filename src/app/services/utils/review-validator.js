import joi from "joi";
import { serviceErrorHandler } from "./error.js";

class ReviewValidation {
async create(data) {
    const createSchema = joi.object({
      rate: joi
        .number()
        .min(1)
        .max(5)
        .required()
    });

    const { error, value } = createSchema.validate(data);
    if (error) {
      throw new serviceErrorHandler(
        error.details[0],
        400,
        error?.details[0]?.path[0]
      );
    } else {
      return true;
    }
  }

  
}

export default new ReviewValidation();