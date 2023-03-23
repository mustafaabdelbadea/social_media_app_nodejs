import CommentController  from "../controllers/comment.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import commentValidator from "./utils/comment-validator.js";
import { authenticateUser } from "./utils/authentication.js";



class CommentService {

  async commentCreate(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken)
      if(authenticatedUser.role != "user"){

      }
  
      await commentValidator.create(data);
      const preparedData = { 
        ...data,
        user: authenticatedUser._id
      }
  
  

      const commentResponse = await CommentController.commentRegister(preparedData);

      return commentResponse;
    } catch (error) {
      throw error;
    }
  }

  async commentGetOne(data) {
    try {
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
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async commentUpdateOne(data) {
    try {
      const foundComment = (await CommentController.updateOneByFilter(data)).data;

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
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async commentDeleteOne(data) {
    try {
      const foundComment = (await CommentController.deleteOneByFilter(data)).data;

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
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  

}

export default new CommentService();