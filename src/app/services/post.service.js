import PostController  from "../controllers/post.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import postValidator from "./utils/post-validator.js";



class PostService {

  async postCreate(data) {
    try {
      await postValidator.create(data);

      const foundPost = (
        await PostController.getOneByFilter({ id: data.id })
      ).data;

      if (foundPost) {
        throw new serviceErrorHandler(
          { message: "Id already exists", name: "userFound" },
          {
            code: 409,
            path: "Id",
          }
        );
      }

      

      const postResponse = await ReviewController.postRegister(data);

      return postResponse;
    } catch (error) {
      throw error;
    }
  }

  async postGetOne(data) {
    try {
      const foundPost = (await PostController.getOneById(data)).data;

      if (!foundPost) {
          throw new serviceErrorHandler(
              { message: "Post not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundPost;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async postUpdateOne(data) {
    try {
      const foundPost = (await PostController.updateOneByFilter(data)).data;

      if (!foundPost) {
          throw new serviceErrorHandler(
              { message: "Post not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundPost;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  async postDeleteOne(data) {
    try {
      const foundPost = (await PostController.deleteOneByFilter(data)).data;

      if (!foundPost) {
          throw new serviceErrorHandler(
              { message: "Post not found", name: "usernotfound" },
              {
            code: 404,
            path: "_id",
        }
        );
    }
    
    return foundPost;
} catch (error) {
        console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
      throw error;
    }
  }

  

}

export default new PostService();