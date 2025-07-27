const express = require('express');
const router = express.Router();

let libros = [
  { id: 1, titulo: 'Como hacer Reviro (como un experto)', autor: 'pepe', existencia: 5 },
  { id: 2, titulo: 'Escondiendose de la AFIP', autor: 'luciano', existencia: 3 }
];


router.get('/', (req, res) => {
  res.json(libros);
});


router.get('/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado');
  res.json(libro);
});


router.post('/', (req, res) => {
  const nuevoLibro = {
    id: libros.length + 1,
    titulo: req.body.titulo,
    autor: req.body.autor,
    existencia: req.body.existencia || 0
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});


router.put('/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontado');

  libro.titulo = req.body.titulo || libro.titulo;
  libro.autor = req.body.autor || libro.autor;
  libro.existencia = req.body.existencia || libro.existencia;

  res.json(libro);
});


router.put('/:id/existencia', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('libro no encontrado');

  libro.existencia = req.body.existencia;
  res.json(libro);
});


router.delete('/:id', (req, res) => {
  const libroIndex = libros.findIndex(l => l.id === parseInt(req.params.id));
  if (libroIndex === -1) return res.status(404).send('Libro no encontrado');

  const libroEliminado = libros.splice(libroIndex, 1);
  res.json(libroEliminado);
});


router.get('/disponibles', (req, res) => {
  const librosDisponibles = libros.filter(l => l.existencia > 0);
  res.json(librosDisponibles);
});

module.exports = router;