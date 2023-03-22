import joi from "joi";
import { serviceErrorHandler } from "./error.js";

class PostValidation {
async create(data) {
    const createSchema = joi.object({
      content: joi
        .string()
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

export default new PostValidation();