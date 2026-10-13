import './lib/db/mongoose.js';
import express from 'express';
import cors from 'cors';
import { router } from "./route.js";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import { correlationId } from './pkg/correlation/correlationid.js';
import cookieParser from "cookie-parser";

export function createApp() {
  const app = express();
  

  app.use(cors({ origin: 'http://localhost:4200' }));
  
  
  app.use(express.json());
  
  app.use(cookieParser());

  app.use(correlationId);
  
  
  app.use('/api', router);
  app.use(globalErrorHandler);
  
  return app;
}