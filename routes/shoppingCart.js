const router = require('express').Router();
const Cart = require('../models/Cart')
const Shoe = require('../models/Shoe')
const { isAuthenticated } = require('../middlewares/jwt');
// @desc    GET all the Items on the shopping cart
// @route   GET /api/v1/shoppingcart/
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
    const { _id } = req.payload;
  try {
    let items = await Cart.find({user_id:_id});
    items=items[0].shoes
    let itemsInCart = await Shoe.find({_id: {$in:items}})
    if(itemsInCart.length===0){
      res.status(404).json({ response: 'No Items were found for you shopping car in the database ' });
    } else{
      res.status(200).json({ data: itemsInCart })
    }
  } catch (error) {
    next(error);
  }})
// @desc    POST a shoe to the shopping cart
// @route   POST /api/v1/shoppingcart/:shoeId
// @access  Private
router.post('/:shoeId',isAuthenticated, async (req, res, next) => {
    const { shoeId } = req.params;
    const { _id } = req.payload;
    try {
      const items = await Cart.findOne({user_id:_id});
      console.log(items)
      if (items === null){
        const newCar = await Cart.create({ shoes: shoeId, user_id: _id });
        res.status(201).json({ data: newCar })
      } else{
        items.shoes.push(shoeId)
        items.save()
        res.status(201).json({ data: items })
      }
    } catch (error) {
      next(error);
    }
  });
// @desc    Delete a shoe from the cart
// @route   DELETE /api/v1/shoppingcart/:shoeId
// @access  Private
  router.delete('/:shoeId', isAuthenticated, async (req, res, next) => {
    const { shoeId } = req.params;
    const { _id } = req.payload;
    try {
          const deleted = await Cart.findOne({user_id:_id});
          deleted.shoes.pop(shoeId)
          deleted.save()
          res.status(202).json({ data: deleted });
        }
       catch (error) {
        next(error);
      }
    });
module.exports=router