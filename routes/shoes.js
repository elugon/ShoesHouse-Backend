const router = require('express').Router();
const ErrorResponse = require('../utils/error');
const axios = require('axios');
const Shoe = require('../models/Shoe')
// @desc    GET all the shoes
// @route   GET /api/v1/shoes
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const shoes = await Shoe.find({});
    if (shoes.length === 0) {
      res.status(200).json({ response: 'No shoes were found in the database ' });
    } else {
      res.status(200).json({ data: shoes })
    }
  } catch (error) {
    next(error);
  }
});
// @desc    GET one shoe
// @route   GET /api/v1/shoes
// @access  Public
router.get('/:shoeId', async (req, res, next) => {
  try {
    const selectedShoe = await Shoe.find({shoeId});
    if (selectedShoe.length === 0) {
      res.status(200).json({ response: 'The selected show was not found in the database ' });
    } else {
      res.status(200).json({ data: selectedShoe })
    }
  } catch (error) {
    next(error);
  }
});
  module.exports=router