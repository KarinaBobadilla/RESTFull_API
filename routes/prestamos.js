const express = require('express');
const router = express.Router();

let prestamos = [
  { id: 1, id_usuario: 1, id_libro: 1, fecha_prestamo: '2023-01-01', fecha_devolucion: '2023-01-15' },
  { id: 2, id_usuario: 2, id_libro: 2, fecha_prestamo: '2023-01-02', fecha_devolucion: '2023-01-16' }
];


router.get('/', (req, res) => {
  res.json(prestamos);
});


router.get('/:id', (req, res) => {
  const prestamo = prestamos.find(p => p.id === parseInt(req.params.id));
  if (!prestamo) return res.status(404).send('Prestamo no encontrado');
  res.json(prestamo);
});


router.post('/', (req, res) => {
  const nuevoPrestamo = {
    id: prestamos.length + 1,
    id_usuario: req.body.id_usuario,
    id_libro: req.body.id_libro,
    fecha_prestamo: req.body.fecha_prestamo || new Date().toISOString().split('T')[0],
    fecha_devolucion: req.body.fecha_devolucion
  };
  prestamos.push(nuevoPrestamo);
  res.status(201).json(nuevoPrestamo);
});


router.put('/:id', (req, res) => {
  const prestamo = prestamos.find(p => p.id === parseInt(req.params.id));
  if (!prestamo) return res.status(404).send('Prestamo no encontrado');

  prestamo.id_usuario = req.body.id_usuario || prestamo.id_usuario;
  prestamo.id_libro = req.body.id_libro || prestamo.id_libro;
  prestamo.fecha_prestamo = req.body.fecha_prestamo || prestamo.fecha_prestamo;
  prestamo.fecha_devolucion = req.body.fecha_devolucion || prestamo.fecha_devolucion;

  res.json(prestamo);
});


router.delete('/:id', (req, res) => {
  const prestamoIndex = prestamos.findIndex(p => p.id === parseInt(req.params.id));
  if (prestamoIndex === -1) return res.status(404).send('Prstamo no encontrado');

  const prestamoEliminado = prestamos.splice(prestamoIndex, 1);
  res.json(prestamoEliminado);
});


router.get('/usuario/:id_usuario', (req, res) => {
  const prestamosUsuario = prestamos.filter(p => p.id_usuario === parseInt(req.params.id_usuario));
  res.json(prestamosUsuario);
});


router.get('/libro/:id_libro', (req, res) => {
  const prestamosLibro = prestamos.filter(p => p.id_libro === parseInt(req.params.id_libro));
  res.json(prestamosLibro);
});

module.exports = router;