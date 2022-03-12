const express = require('express');
const { getGenre } = require('../controllers/Genre.controller');
const router = express.Router();
//! importo las funciones de controlador

router.get('/', getGenre);

module.exports = router;
