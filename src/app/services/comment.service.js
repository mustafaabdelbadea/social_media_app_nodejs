import UsersController  from "../controllers/user.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import usersValidator from "./utils/user-validator.js";

class CommentService {
    
    async userSignUp(data) {
      try {
        await usersValidator.create(data);
  
        const foundUser = (
          await UsersController.getOneByFilter({ email: data.email })
        ).data;
  
        if (foundUser) {
          throw new serviceErrorHandler(
            { message: "Email already exists", name: "userFound" },
            {
              code: 409,
              path: "email",
            }
          );
        }
  
        delete data.confirmPassword;
  
        const userResponse = await UsersController.userRegister(data);
  
        return userResponse;
      } catch (error) {
        throw error;
      }
    }
  
    async userSignIn(data) {
      try {
        await usersValidator.signin(data);
  
        const userResponse = await UsersController.signIn(data);
  
        return userResponse;
      } catch (error) {
          throw error 
      }
    }
  
    async userGetOne(data) {
      try {
        const foundUser = (await UsersController.getOneById(data)).data;
  
        if (!foundUser) {
            throw new serviceErrorHandler(
                { message: "User not found", name: "usernotfound" },
                {
              code: 404,
              path: "_id",
          }
          );
      }
      
      return foundUser;
  } catch (error) {
          console.log("🚀 ~ file: user.service.js:48 ~ UserService ~ userGetOne ~ error:", error)
        throw error;
      }
    }
  
    async UploadPhoto(photo){
      try {
        
      } catch (error) {
        
      }
     
    }
  }
  
  export default new CommentService();