import CommentController from "../controllers/comment.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import commentValidator from "./utils/comment-validator.js";
import { authenticateUser } from "./utils/authentication.js";
import  PostController  from "../controllers/post.controller.js";

class CommentService {
  async commentCreate(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }

      const contentObj = {
        content: data.content,
      };

      await commentValidator.create(contentObj);

      const foundPost = (await PostController.getPosts({_id: data.post}));

      if (!foundPost) {
        throw new serviceErrorHandler(
          { message: "Post not found" },
          { code: 404 }
        );
      }

      const preparedData = {
        content: data.content,
        user: authenticatedUser._id,
        post: data.post,
      };

      const commentResponse = await CommentController.addComment(preparedData);

      return commentResponse;
    } catch (error) {
      throw error;
    }
  }

  async commentGetOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);

      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }

      const foundComment = (await CommentController.getOneById(data)).data;

      if (!foundComment) {
        throw new serviceErrorHandler(
          { message: "Comment not found", name: "usernotfound" },
          {
            code: 404,
            path: "_id",
          }
        );
      }

      return foundComment;
    } catch (error) {
      throw error;
    }
  }

  async commentUpdateOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "user") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }

      const contentObj = {
        content: data.content,
      };

      await commentValidator.create(contentObj);
      const filter = {
        user: authenticatedUser._id,
        _id: data._id,
      };
      const foundComment = await CommentController.updateOneByFilter(
        filter,
        contentObj
      );

      return foundComment;
    } catch (error) {
      throw error;
    }
  }

  async commentDeleteOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "admin") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }

      const foundComment = await CommentController.deleteOneByFilter({
        _id: data,
      });

      return foundComment;
    } catch (error) {
      throw error;
    }
  }
}

export default new CommentService();
