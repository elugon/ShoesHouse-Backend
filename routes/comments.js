const router = require('express').Router();
const ErrorResponse = require('../utils/error');
const axios = require('axios');
const Comment = require('../models/Comment')
const jwt = require("jsonwebtoken");
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
// @route   POST /
// @access  Private
router.post('/:shoeId',isAuthenticated, async (req, res, next) => {
    const { text, rating } = req.body;
    const { shoeId } = req.params;
    const { _id } = req.payload;
    try {
      const newComment = await Comment.create({ text, rating, shoe_id: shoeId, user_id: _id });
      res.status(201).json({ data: newComment })
    } catch (error) {
      next(error);
    }
  });
// @desc    Edit a comment
// @route   PUT /:id
// @access  Private
router.put('/:commentId', isAuthenticated, async (req, res, next) => {
    const { text, rating } = req.body;
    const { commentId } = req.params;
    const { _id } = req.payload;
    try {
        // buscar el comentario by Id
        // Si no existe error
        // comment.user_id = req.payload._id
        // Si no, no estas autorizado a editar este comentario

      const updatedComment = await Comment.findByIdAndUpdate(commentId, { text, rating }, { new: true });
      res.status(202).json({ data: updatedComment })
    } catch (error) {
      next(error);
    }
  });
  // @desc    Delete a comment
  // @route   DELETE /:id
  // @access  Public
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleted = await Movie.findByIdAndDelete(id);
      res.status(204).json({ data: deleted });
    } catch (error) {
      next(error);
    }
  });
  module.exports=router