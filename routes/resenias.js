const express = require('express');
const router = express.Router();

let resenias = [
  { id: 1, id_libro: 1, id_usuario: 1, calificacion: 2, comentario: 'Entretenido, interesante, impctante, todo eso le falto.' },
  { id: 2, id_libro: 2, id_usuario: 2, calificacion: 1, comentario: 'Av Libertad 1502 ahi lo compre, ya saben dendo NO ir. De nada' }
];


router.get('/', (req, res) => {
  res.json(resenias);
});


router.get('/:id', (req, res) => {
  const resenia = resenias.find(r => r.id === parseInt(req.params.id));
  if (!resenia) return res.status(404).send('Reseña no encontrada');
  res.json(resenia);
});


router.get('/libro/:id_libro', (req, res) => {
  const reseniasLibro = resenias.filter(r => r.id_libro === parseInt(req.params.id_libro));
  res.json(reseniasLibro);
});


router.post('/', (req, res) => {
  const nuevaResenia = {
    id: resenias.length + 1,
    id_libro: req.body.id_libro,
    id_usuario: req.body.id_usuario,
    calificacion: req.body.calificacion,
    comentario: req.body.comentario
  };
  resenias.push(nuevaResenia);
  res.status(201).json(nuevaResenia);
});


router.put('/:id', (req, res) => {
  const resenia = resenias.find(r => r.id === parseInt(req.params.id));
  if (!resenia) return res.status(404).send('Reseña no encontrada');

  resenia.calificacion = req.body.calificacion || resenia.calificacion;
  resenia.comentario = req.body.comentario || resenia.comentario;

  res.json(resenia);
});


router.delete('/:id', (req, res) => {
  const reseniaIndex = resenias.findIndex(r => r.id === parseInt(req.params.id));
  if (reseniaIndex === -1) return res.status(404).send('Reseña no encontrada');

  const reseniaEliminada = resenias.splice(reseniaIndex, 1);
  res.json(reseniaEliminada);
});

module.exports = router;