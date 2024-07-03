import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());

const PORT = 1000;

app.use(cors());
app.use("/api/v1/", userRouter);

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.log(err.stack);
  res.status(500).send("Backend not responding");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});