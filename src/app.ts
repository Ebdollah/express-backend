//app.ts
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { AppDataSource } from "./database/dbConnection"; // ✅ Correct
import { errorMiddleware } from "./middlewares/error";
import userRouter from "./routes/userRouter";
import { Request, Response, NextFunction } from "express";

export const app = express();

app.use(
  cors({
    origin: "*", // Allow all domains (if no credentials needed)
    // origin: "http://localhost:3000", // Replace with your frontend URL in development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & auth headers
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req: Request, res: Response)=>{
  res.send("Welcome")
})
app.use("/api/v1/user", userRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

interface ErrorMiddleware {
    (err: Error, req: Request, res: Response, next: NextFunction): void;
}

const errorHandler: ErrorMiddleware = (err, req, res, next) => errorMiddleware(err, req, res, next);

app.use(errorHandler);
