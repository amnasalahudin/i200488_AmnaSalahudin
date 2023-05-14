const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  contact: {
    type: String,
    required: true, 
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User_Schema",
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
