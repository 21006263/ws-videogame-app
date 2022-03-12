const axios = require('axios');
const {API_KEY} = process.env
const { Genre } = require('../db') 

const getGenre = async (req, res) => {
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  let genresList = genres.data.results.map((elem) => elem.name); // Just mapping out the names of genres
  let dbFind = await Genre.findAll(); // query to our Genres table
  let mappedGenres = genres.data.results.map((elem) => {
    // mapping out objs from the api as name:genre_name in order to send them as first response
    return {
      name: elem.name,
    };
  });

  if (dbFind.length < 1) {
    genresList.forEach((elem) => Genre.create({ name: elem })); // populate our db's Genres table if no entries found
    res.send(mappedGenres); // sending first response directly as mapped results from the api
  } else {
    res.send(dbFind); // if entries found in our db send them instead
  }
  }
module.exports = {
    getGenre
}









