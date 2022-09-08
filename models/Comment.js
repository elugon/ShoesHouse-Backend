const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  shoe_id: {
    type: Schema.Types.ObjectId, ref: 'Shoe',
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  }
});
module.exports = model("Comment", commentSchema);