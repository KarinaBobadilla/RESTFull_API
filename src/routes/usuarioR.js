
const express = require('express');
const router = express.Router();
const usuarioC = require('../controllers/usuarioC');

router.get('/', usuarioC.getUsuarios);
router.get('/:id', usuarioC.getUsuarioById);


module.exports = router;