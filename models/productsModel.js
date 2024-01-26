const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["bmw", "audi", "tata", "honda", "marcos", "volvo"],
      message: "{values} is not supported",
    },
    // enum: ["bmw", "audi", "tata", "honda", "volvo"],
  },
});

module.exports = mongoose.model("Products", productsSchema);
