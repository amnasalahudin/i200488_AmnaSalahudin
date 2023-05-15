const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;