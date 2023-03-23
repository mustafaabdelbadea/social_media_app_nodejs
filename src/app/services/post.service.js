import PostController from "../controllers/post.controller.js";
import { authenticateUser } from "./utils/authentication.js";
import { serviceErrorHandler } from "./utils/error.js";
import postValidator from "./utils/post-validator.js";

class PostService {
  async postCreate(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "creator") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      await postValidator.create(data);

      const preparedData = {
        content: data.content,
        user: authenticatedUser._id,
      };

      const postResponse = await PostController.addPost(preparedData);

      return postResponse;
    } catch (error) {
      throw error;
    }
  }

  async postGetOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const foundPost = (await PostController.getOneById(data)).data;

      if (!foundPost) {
        throw new serviceErrorHandler(
          { message: "Post not found" },
          {
            code: 404,
            path: "_id",
          }
        );
      }

      return foundPost;
    } catch (error) {
      throw error;
    }
  }

  async postUpdateOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "creator") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const preparedData = {
        content: data.content,
      };

      await postValidator.create(preparedData);

      const filter = {
        user: authenticatedUser._id,
        _id: data._id,
      };

      const response = await PostController.updateOneByFilter(
        filter,
        preparedData
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async postDeleteOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "admin") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const foundPost = await PostController.deleteOneByFilter({ _id: data });

      return foundPost;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();
