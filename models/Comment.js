const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  user_name:{
    type:String,
  },
  shoe_id: {
    type: Schema.Types.ObjectId, ref: 'Shoe',
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  }},
    {
    timestamps: true
    });
module.exports = model("Comment", commentSchema);