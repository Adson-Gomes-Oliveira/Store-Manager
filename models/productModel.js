const connection = require('../helpers/connection');

const getAll = async () => {
  const [response] = await connection.execute(`
    SELECT * FROM StoreManager.products
  `);

  return response;
};
const getByID = async (id) => {
  const [response] = await connection.execute(`
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  return response;
};

module.exports = {
  getAll,
  getByID,
};
