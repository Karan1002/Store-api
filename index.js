require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");

const productsRouter = require("./routes/productsRoute");

//middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");
app.use(express.json());

//routes
app.get("/", (req, res) => {
  //   res.send(`<h1> Store API </h1> <a href="/api/v1/products"> Products API</a>`);
  res.send("store");
});

app.use("/products", productsRouter);

//routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
