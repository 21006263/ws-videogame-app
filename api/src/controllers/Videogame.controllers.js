const {Videogame , Genre} = require ('../db');
const axios = require('axios');
const {API_KEY} = process.env;
const {Op} = require('sequelize')



//! trae todos los juegos de y busqueda por name!! */
const getAll_ByName = async (req , res) => {

  let count = 0; // variable to keep api page count
  let pages = []; // array to save api pages
  let arr1 = []; // arr1 used to store games
  if (!req.query.name) {
    arr1 = []; // clearing arr1 before each request
    let head = await axios.get(`https://rawg.io/api/games?key=${API_KEY}`);
    let current = head.data; // api data structured as a linked list - assigning head to varible current
    pages.push(current); // pushing head's content (full page) to pages array - each page contains 20 games
    while (count < 4) {
      let getNext = await axios.get(current.next); // grab four more pages going through this linked list
      pages.push(getNext.data);
      current = getNext.data;
      count++;
    }
    let myDb = await Videogame.findAll({
      include: Genre,
    });
    arr1.push(myDb); // if no req query, add all games from our db
    for (var i = 0; i < pages.length; i++) {
      var x = pages[i].results.map((elem) => {
        // needed properties come under the results prop of every page in api
        return {
          // mapping those properties out in an obj, reflecting how our db model structure for conformity
          id: elem.id,
          name: elem.name,
          genres: elem.genres,
          image: elem.background_image,
          rating: elem.rating,
          //price: elem.price,
          platforms: elem.platforms.map((elem) => elem.platform.name),
        };
      });
      arr1.push(x); // push every obj
    }
  } else if (req.query.name) {
    try {
      arr1 = [];
      let search = await axios.get(
        `https://rawg.io/api/games?key=${API_KEY}&search=${req.query.name}`
      );
      let curr = search.data; // api data structured as a linked list - assigning head to varible current
      pages.push(curr); // pushing head's content (full page) to pages array - each page contains 20 games
      while (count < 4) {
        let findNext = await axios.get(curr.next); // grab four more pages going through this linked list
        pages.push(findNext.data);
        curr = findNext.data;
        count++;
      }
      let findDb = await Videogame.findAll({
        // if req query, find all games in db which contain req.query in name
        include: Genre,
        where: {
          name: { [Op.iLike]: `%${req.query.name}%` },
        },
      });
      arr1.push(findDb);
      for (var i = 0; i < pages.length; i++) {
        // filter out games in api pages which contain req query name
        var y = pages[i].results
          .filter((elem) =>
            elem.name.toLowerCase().includes(req.query.name.toLowerCase())
          )
          .map((elem) => {
            return {
              id: elem.id,
              name: elem.name,
              genres: elem.genres,
              image: elem.background_image,
              rating: elem.rating,
             // price: elem.price,
              platforms: elem.platforms.map((elem) => elem.platform.name),
            };
          });
        arr1.push(y); // push every obj which contains req.query in its name prop
      }
    } catch (error) {
      arr1.push([{ name: 'Videogame not found', image: 'x', genres: [''] }]);
    }
  }
  let flatarr = arr1.flat(); // flatten the array to get rid of nested arrays
  res.send(flatarr);
   }




   const createVideogame = async (req ,res ) => {
    let { name, description, released, rating, genres, platforms, image , price} =
    req.body; // destructuring the request's body expected params
  let nuVideo = await Videogame.create({
    name, // create a new object in db using body params
    description,
    released,
    rating,
    image,
    platforms,
    price
  });

  genres.forEach(async (genres) => {
    // look for the req.body genre in db, Genre table
    let gen = await Genre.findAll({ where: { name: genres } });
    nuVideo.addGenre(gen); // where it matches add genre to newly created game entry
  });
  res.send('Game created');
}
     




     const searchById = async (req, res) => {
      let id = req.params.id;
      if (id && id.length < 9) {
        axios
          .get(`https://rawg.io/api/games/${id}?key=${API_KEY}`)
          .then((r) => r.data)
          .then((data) => {
            let info = {
              name: data.name,
              genres: data.genres.map((elem) => elem.name).join(' / '),
              image: data.background_image,
              description: data.description.replace(/(<([^>]+)>)/gi, ''),
              released: data.released,
              rating: data.rating,
              platforms: data.platforms
                .map((elem) => elem.platform.name).join(' - '),
               // price: r.price,
            };
            res.send(info);
          });
      } else if (id && id.length > 9) {
        Videogame.findByPk(id, { include: Genre }).then((r) => {
          let infoDb = {
            // creating new obj with response values
            name: r.name,
            genres: r.genres.map((elem) => elem.name).join(' / '),
            image: r.image,
            description: r.description,
            released: r.released,
            rating: r.rating,
            platforms: r.platforms.map((elem) => elem).join(' - '),
            price: r.price, //se pasa lo que se quiera buscar por id de base de datos o los tantos datos como se desee
          };
          res.send(infoDb);
        });
      }
  
  }




module.exports =  {
getAll_ByName,
createVideogame,
searchById,


}















