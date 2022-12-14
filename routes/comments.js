const router = require('express').Router();
const ErrorResponse = require('../utils/error');
const Comment = require('../models/Comment')
const { isAuthenticated } = require('../middlewares/jwt');
// @desc    GET all the Comments of one shoe
// @route   GET /api/v1/comments/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
  try {
    const comments = await Comment.find({shoe_id:id});
    if (comments.length === 0) {
      res.status(404).json({ response: 'No comments were found in the database ' });
    } else {
      res.status(200).json({ data: comments })
    }
  } catch (error) {
    next(error);
  }
});
// @desc    Create a comment
// @route   POST /api/v1/comments/:shoeId
// @access  Private
router.post('/:shoeId',isAuthenticated, async (req, res, next) => {
    const { text, rating, user_name } = req.body;
    const { shoeId } = req.params;
    const { _id } = req.payload;
    if (!text) {
      return next(new ErrorResponse('Please fill the comment section', 400))
  } if(!isAuthenticated){
    return next(new ErrorResponse('Please log in first!', 400))
  }
    try {
      const newComment = await Comment.create({ text, rating, user_name, shoe_id: shoeId, user_id: _id });
      res.status(201).json({ data: newComment })
    } catch (error) {
      next(error);
    }
  });
// @desc    Edit a comment
// @route   PUT /api/v1/comments/:id
// @access  Private
router.put('/:commentId', isAuthenticated, async (req, res, next) => {
    const { text, rating } = req.body;
    const { commentId } = req.params;
    const { _id } = req.payload;
    if (!text) {
      return next(new ErrorResponse('Please fill the comment section', 400))
    }
    try {
      const comment = await Comment.findById(commentId);
      if(!comment){
        return next(ErrorResponse('Comment not found', 404));
      }
      if(comment.user_id !== _id){
        return next(ErrorResponse('User not authorized to edit this comment', 401));
      }
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { text, rating }, { new: true });
      res.status(202).json({ data: updatedComment })
    } catch (error) {
      next(error);
    }
  });

  // @desc    Delete a comment
  // @route   DELETE /api/v1/comments/:id
  // @access  Public
  router.delete('/:id', isAuthenticated, async (req, res, next) => {
    const { commentId } = req.params;
    const { _id } = req.payload;
    try {
      const comment = await Comment.findById(commentId);
      if(!comment){
        return next(ErrorResponse('Comment not found', 404));
      }
      if(comment.user_id !== _id){
        return next(ErrorResponse('User not authorized to delete this comment', 401));
      }
      const deleted = await Comment.findByIdAndDelete(commentId);
      res.status(204).json({ data: deleted });
    } catch (error) {
      next(error);
    }
  });
  module.exports=router