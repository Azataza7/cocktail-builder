import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import reviewRouter from "./routers/reviewRouter";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();
