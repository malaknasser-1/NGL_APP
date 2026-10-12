
import mongoose from "mongoose";
import { env } from "../config/env.js";
//mongoose.connect(process.env.MONGODB_URL);


/*
const URI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/ngl";

mongoose.connect(URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));
  */
 
 mongoose.connect(env.db.url)