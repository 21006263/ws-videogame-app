const express = require('express');
const router = express.Router();
//!IMPORTAMOS LAS FUNCIONES DE CONTROLLERS
const { getAll_ByName , createVideogame, searchById, } = require('../controllers/Videogame.controllers.js');

router.get('/', getAll_ByName);
router.post('/', createVideogame);
router.get('/:id', searchById);


 module.exports = router;
