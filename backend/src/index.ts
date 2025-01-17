import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import { connectDb } from "./config/db";
import { createIndex } from "./config/initializeElasticsearch";
import { bulkIndex } from "./utils/bulkIndexer";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

const PORT = 1000;

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDb();

app.use("/api/v1/", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send("Backend not responding");
});

createIndex();
// bulkIndex().catch(console.error);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
