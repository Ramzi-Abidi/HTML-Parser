import express, { urlencoded, json } from "express";
import { ErrorRequestHandler } from "express-serve-static-core";
import processHtmlRouter from "./routes/processHtmlRouter";

const app = express();
app.use(json());

app.use(urlencoded({ extended: true }));

app.use(processHtmlRouter);

const port = 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server is up and running",
  });
});

const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
  });
};

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
