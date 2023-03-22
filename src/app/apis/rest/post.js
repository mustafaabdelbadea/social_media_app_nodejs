import { Router } from "express";
import postService from "../../services/post.service.js";
const router = Router();

router.post("/",async (req, res) => {
  try {
    const result = await postService.postCreate(req.body);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});


router.get('/:id',async(req,res) => {
  try {
      const result = await postService.postGetOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});


router.patch('/:id',async (req,res) => {

  try {
      const result = await postService.postUpdateOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});



router.delete('/:id',async (req,res) => {
  
  try {
      const result = await postService.postDeleteOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});

export const postRouter = router;