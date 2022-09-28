const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shoesSchema = new Schema({
  brand: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  retailPrice: {
    type: Number,
  },
  size:{
    type:[],
    default:[36,37,38,39,40,41,42,43,44,45,46,47]
  },
    media: {
    type: [],
  }
});
module.exports = model("Shoe", shoesSchema);