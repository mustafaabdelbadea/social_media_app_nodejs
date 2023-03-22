import { Router } from "express";
import userService from "../../services/user.service.js";
const router = Router();
import multer from "multer";
const upload = multer({dest:"../../../../uploads"});

router.post("/",upload.single('avatar') ,async (req, res) => {
  try {
    const result = await userService.userSignUp(req);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const result = await userService.userSignIn(req.body);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await userService.userGetOne(req.params.id);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

export const commentRouter = router;
