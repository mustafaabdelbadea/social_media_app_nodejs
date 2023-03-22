import { Router } from "express";
import userService from "../../services/user.service.js";
import multer from 'multer';
const upload = multer({ dest: './uploads/' })
const router = Router();

router.post("/", upload.single('avatar') ,async (req, res) => {
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

router.delete("/:id", async (req,res) => {
  try {
    const result = await userService.deleteOne(req.params.id, req.headers['authorization']);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const result = await userService.userGetOne(req.params.id);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});



export const userRouter = router;
