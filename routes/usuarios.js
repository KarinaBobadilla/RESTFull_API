const express = require('express');
const router = express.Router();


let usuarios = [
  { id: 1, nombre: 'pepe', email: 'agunateMessi123@.com' },
  { id: 2, nombre: 'luciano', email: 'quinterooo123@.com' }
];


router.get('/', (req, res) => {
  res.json(usuarios);
});


router.get('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.json(usuario);
});


router.post('/', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});


router.put('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');

  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;

  res.json(usuario);
});


router.delete('/:id', (req, res) => {
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.json(usuarioEliminado);
});

module.exports = router;