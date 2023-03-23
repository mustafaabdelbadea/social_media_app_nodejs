import { Router } from "express";
import postService from "../../services/post.service.js";
const router = Router();

router.post("/",async (req, res) => {
  try {
    const result = await postService.postCreate(req.body,req.headers['authorization']);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});


router.get('/:id',async(req,res) => {
  try {
      const result = await postService.postGetOne(req.params.id,req.headers['authorization']);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});


router.patch('/:id',async (req,res) => {

  try {
    const data = {
      _id: req.params.id,
      content: req.body.content
    }
      const result = await postService.postUpdateOne(data,req.headers['authorization']);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});



router.delete('/:id',async (req,res) => {
  
  try {
    const result = await postService.postDeleteOne(req.params.id,req.headers['authorization']);      
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});

export const postRouter = router;