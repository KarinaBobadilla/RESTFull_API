const express = require('express');
const app = express();


app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


const usuariosRouter = require('./routes/usuarios');
const librosRouter = require('./routes/libros');
const prestamosRouter = require('./routes/prestamos');
const reseniasRouter = require('./routes/resenias');

app.use('/usuarios', usuariosRouter);
app.use('/libros', librosRouter);
app.use('/prestamos', prestamosRouter);
app.use('/resenias', reseniasRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});