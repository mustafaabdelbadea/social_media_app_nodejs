import joi from "joi";
import { serviceErrorHandler } from "./error.js";
const roles = ["admin", "creator", "user"];

class UserValidation {
  async create(data) {
    const createSchema = joi.object({
      name: {
        firstName: joi.string().required(),
        lastName: joi.string().required(),
      },
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/
          )
        ),
      confirmPassword: joi.ref("password"),
      role: joi.required().valid(...roles),
      photos: joi.array().items(joi.string().required()),
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

  signin(data) {
    const signinSchema = joi.object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/
          )
        ),
    });

    const { error } = signinSchema.validate(data);
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

export default new UserValidation();
