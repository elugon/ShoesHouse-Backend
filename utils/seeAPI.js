const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
    params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': 'f1b8251433msh2902480333d2527p136df3jsn62a251715d61',
      'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com'
    }
  };

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});