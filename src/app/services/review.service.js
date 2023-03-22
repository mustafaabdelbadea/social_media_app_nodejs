import ReviewController  from "../controllers/user.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import reviewValidator from "./utils/review-validator.js";
import reviewValidator from "./utils/user-validator.js";


class ReviewService {

  async reviewCreate(data) {
    try {
      await reviewValidator.create(data);

      const foundReview = (
        await ReviewController.getOneByFilter({ id: data.id })
      ).data;

      if (foundReview) {
        throw new serviceErrorHandler(
          { message: "Id already exists", name: "userFound" },
          {
            code: 409,
            path: "Id",
          }
        );
      }

      

      const reviewResponse = await ReviewController.reviewRegister(data);

      return reviewResponse;
    } catch (error) {
      throw error;
    }
  }

  async reviewGetOne(data) {
    try {
      const foundReview = (await ReviewController.getOneById(data)).data;

      if (!foundReview) {
          throw new serviceErrorHandler(
              { message: "Review not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundReview;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async reviewUpdateOne(data) {
    try {
      const foundReview = (await ReviewController.updateOneByFilter(data)).data;

      if (!foundReview) {
          throw new serviceErrorHandler(
              { message: "Review not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundReview;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async reviewDeleteOne(data) {
    try {
      const foundReview = (await ReviewController.deleteOneByFilter(data)).data;

      if (!foundReview) {
          throw new serviceErrorHandler(
              { message: "Review not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundReview;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  

}

export default new ReviewService();
