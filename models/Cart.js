const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shoppingCartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  shoes: {
    type: [{
      Object
    }]
  },
  adress:{
    type: String,
    default: ''
  }},
  {timestamps:true},
);
module.exports = model("Cart", shoppingCartSchema);