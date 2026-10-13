import { Router } from "express";
import { withCache } from "../../lib/cash/withcache.js";
import { uploadSingleFile, uploadFilesArray } from "../../lib/media/multer.js";
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

userRouter.post('/upload-profile-pic', uploadSingleFile('pp'), (req, res, next) => {
  console.log(req.file);
  res.json('ok');
});

userRouter.post('/upload-cv', uploadSingleFile('cv'), (req, res, next) => {
    res.json('ok');
});

userRouter.post('/upload-cover-images', uploadFilesArray('cover-images'), (req, res, next) => {
  console.log(req.files);  
  res.json('ok');
});

userRouter.post('/upload-product-galary', uploadFilesArray('product-galary'), (req, res, next) => {
    res.json('ok');
});

export default userRouter;