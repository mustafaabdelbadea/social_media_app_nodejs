import { authenticateUser } from "./utils/authentication.js";
import { serviceErrorHandler } from "./utils/error.js";
import reviewValidator from "./utils/review-validator.js";
import ReviewController from "../controllers/review.controller.js";
import PostController from "../controllers/post.controller.js";

class ReviewService {
  async reviewCreate(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const filter = {
        user: authenticatedUser._id,
        post: data.post
      }
      const foundReview = (await ReviewController.getOneByfiler(filter)).data
      if(foundReview) {
        throw new serviceErrorHandler(
          { message: "Already exits" },
          { code: 400 }
        );
      }
      const rateObj = {
        rate: data.rate,
      };

      await reviewValidator.create(rateObj);

      const foundPost = (await PostController.getOneById(data.post)).data;

      if (!foundPost) {
        throw new serviceErrorHandler(
          { message: "Post not found" },
          { code: 404 }
        );
      }
      const preparedData = {
        rate: data.rate,
        user: authenticatedUser._id,
        post: data.post,
      };
      const reviewResponse = await ReviewController.addReview(preparedData);
      return reviewResponse;
    } catch (error) {
      throw error;
    }
  }
  async reviewGetOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const foundReview = (await ReviewController.getOneById(data)).data;
      if (!foundReview) 
      {

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
      throw error;
    }
  }
  async reviewUpdateOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "user") 
      {

        throw new serviceErrorHandler(

          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const rateObj = {

        rate: data.rate
      }
      await reviewValidator.create(rateObj);

      const filter = {

        user: authenticatedUser._id,
        _id: data._id

      }
      const foundReview = await ReviewController.updateOneByFilter(filter, rateObj);

      return foundReview;

    } catch (error) {
      throw error;
    }
  }
  async reviewDeleteOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "admin") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const foundReview = await ReviewController.deleteOneByFilter({ _id: data });
      return foundReview;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReviewService();
