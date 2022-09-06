const router = require('express').Router();
const ErrorResponse = require('../utils/error');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

// @desc    GET all the projects
// @route   GET /api/v1/
// @access  Public
router.get('/', async (req, res, next) => {
  res.send('REST API')
});

// @desc    GET all the projects
// @route   GET /api/v1/
// @access  Public
router.get('/shoes', async (req, res, next) => {
  try {
    const shoes = await sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
      console.log(products)
  })
    if (!shoes) {
      res.status(404).json({ response: 'Shoes not found' });
    } else {
      res.status(200).json({ data: shoes })
    }
  } catch (error) {
    next(error);
  }

});


module.exports = router;