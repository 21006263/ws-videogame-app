//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {conn} = require('./src/db.js');
//!const axios = require('axios');

//!const {API_KEY} = process.env;

//!datos para mantener prepargas


// // Syncing all the models at once.
// conn.sync({ force: false }).then( /*async*/ () => {

// // //Precargar los generos
// // const verification = await Genre.findAll()
// // if(verification.length <1){
// // //Tendre que caragr 


// // // todo          https://api.rawg.io/api/genres?key=5232972c76f74429ab954178fce13d1b
// // const pedido = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

// //   const formateo = pedido.data.results?.map(gn => {
// //   return {
  
// //     name: gn.name
// //    //
    
// //   }
// // })

// // //Buklkcreate Recibe una regla de objetos y crea una fila por cada uno 
// // await Genre.bulkCreate(formateo)
// // //console.log(formateo)

// // }

//   server.listen(process.env.PORT , () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });


let port = process.env.PORT || 3001;
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});