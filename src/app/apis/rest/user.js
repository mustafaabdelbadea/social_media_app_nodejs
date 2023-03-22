import { Router } from "express";
import userService from "../../services/user.service.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await userService.userSignUp(req.body);

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

export const userRouter = router;
