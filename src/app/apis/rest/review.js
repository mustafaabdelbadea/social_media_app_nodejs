import { Router } from "express";
import reviewService from "../../services/review.service.js";
const router = Router();

//create a review
router.post("/:id",async (req, res) => {
    try {
      const data = {
        rate: req.body.rate,
        post: req.params.id
      }
      const result = await reviewService.reviewCreate(data, req.headers['authorization']);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });



router.get('/:id',async(req,res) => {
    try {
        const result = await reviewService.reviewGetOne(req.params.id, req.headers['authorization']);
    
        res.send(result);
      } catch (error) {
        res.send(error);
      }
});



router.patch('/:id',async (req,res) => {
    try {
      const data = {
        _id: req.params.id,
        rate: req.body.rate
      }
        const result = await reviewService.reviewUpdateOne(data, req.headers['authorization']);
    
        res.send(result);
      } catch (error) {
        res.send(error);
      }
});



router.delete('/:id',async (req,res) => {
    
    try {
        const result = await reviewService.reviewDeleteOne(req.params.id,req.headers['authorization']);

        res.send(result);
      } catch (error) {
        res.send(error);
      }
});

export const reviewRouter = router;