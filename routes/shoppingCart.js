const router = require('express').Router();
const ErrorResponse = require('../utils/error');
const axios = require('axios');
const Car = require('../models/Cart')
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt');
// @desc    GET all the Items on the shopping cart
// @route   GET /api/v1/shoppingcar/
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
    const { _id } = req.payload;
  try {
    const items = await Car.find({user_id:_id});
    if (items.length === 0) {
      res.status(404).json({ response: 'No Items were found for you shopping car in the database ' });
    } else {
      res.status(200).json({ data: items })
    }
  } catch (error) {
    next(error);
  }
})
// @desc    POST a shoe to the shopping cart
// @route   POST /api/v1/shoppingcar/:shoeId
// @access  Private
router.post('/:shoeId',isAuthenticated, async (req, res, next) => {
    const { shoeId } = req.params;
    const { _id } = req.payload;
    try {
      const items = await Car.findOne({user_id:_id});
      console.log(items)
      if (items === null){
        const newCar = await Car.create({ shoe_id: shoeId, user_id: _id });
        res.status(201).json({ data: newCar })
      } else{
        items.shoe_id.push(shoeId)
        items.save()
      }
      res.status(201).json({ data: items })
    } catch (error) {
      next(error);
    }
  });
// post isAuthenticated, parametros mando el id del shoe
// Ir a buscar si ese usuario (payload) ya tiene carro
// Si ya lo tiene, 
// const cart = await Car.dkffk
// cart.shoe_id.push(id_shoe)
// cart.save()

// Si no tiene carrito, create(user_id, shoe_id)

// @desc    Delete a shoe from the cart
// @route   DELETE /api/v1/shoppingcar/:shoeId
// @access  Private
  router.delete('/:id', isAuthenticated, async (req, res, next) => {
    const { shoeId } = req.params;
    const { _id } = req.payload;
    try {
        const deleted = await Car.findOne({user_id:_id});
          deleted.shoe_id.pull(shoeId)
          deleted.save()
          res.status(204).json({ data: deleted });
        }
       catch (error) {
        next(error);
      }
    });

module.exports=router