import { Router } from "express";
import { withCache } from "../../lib/cash/withcache.js";
import { User } from "./model/user.model.js";

const userRouter = Router();

userRouter.get('/get-all-users', 
  withCache(),
  async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log('Error in get-all-users:', error);
      next(error);
    }
  }
);

export default userRouter;