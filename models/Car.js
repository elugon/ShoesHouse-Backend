const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shoppingCarSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  shoe_id: {
    type: [Schema.Types.ObjectId], ref: 'Shoe'
  },
  adress:{
    type: String,
    default: ''
  }},
  {timestamps:true},
);
module.exports = model("Car", shoppingCarSchema);