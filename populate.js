require("dotenv").config();

const connectDB = require("./db/connect");

const productsModel = require("./models/productsModel");

const productsJson = require("./products.json");

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productsModel.deleteMany();
    await productsModel.create(productsJson);
    console.log("sucess");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
