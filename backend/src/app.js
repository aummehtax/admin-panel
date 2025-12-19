import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); //load environment variable first

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN ,
  credentials: true,
}))

// ADD THIS FOR DEBUGGING (remove later in production)
app.use((req, res, next) => {
  console.log('📍 Request Origin:', req.headers.origin);
  console.log('📍 Request Method:', req.method);
  console.log('📍 CORS_ORIGIN env:', process.env.CORS_ORIGIN);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TEST ROUTE - Add this after cookieParser()
app.get('/test-cookie', (req, res) => {
  console.log('🧪 Test cookie route hit');
  res.cookie('testCookie', 'testValue', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  res.json({ message: 'Test cookie set' });
});

//routes import
import userRouter from "./routes/user.routes.js";


//routes declaration
app.use("/api", userRouter);


//to catch errors from above
app.use(errorHandler)

export { app };
