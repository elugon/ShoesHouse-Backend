require('dotenv').config();
const mongoose = require('mongoose');
// Import the model

const axios = require("axios");
const Shoe= require('../models/Shoe')

const options = {
  method: 'GET',
  url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
  params: {limit: '100'},
  headers: {
    'X-RapidAPI-Key': 'f1b8251433msh2902480333d2527p136df3jsn62a251715d61',
    'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com'
  }
};

// Place the array you want to seed

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(axios.request(options).then(function(response){
    const shoesData=response.data.results
    
    return Shoe.create(shoesData)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  }))

// Run npm run seed 