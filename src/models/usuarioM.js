
const pool = require('../config/db');

const getAll = async () => {
  const { rows } = await pool.query('SELECT * FROM usuarios');
  return rows;
};

module.exports = {
  getAll,
  
};