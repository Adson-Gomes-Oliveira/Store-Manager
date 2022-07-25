const connection = require('../helpers/connection');

const getAll = async () => {
  const [response] = await connection.execute(`
    SELECT * FROM StoreManager.products
  `);
  console.log(response);
  return response;
};
const getByID = async (id) => {
  const [response] = await connection.execute(`
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  return response;
};
const create = async (name) => {
  const [response] = await connection.execute(`
    INSERT INTO StoreManager.products (name) VALUES
      (?)
  `, [name]);

  console.log(response);

  const newProduct = [{
    id: response.insertId,
    name,
  }];

  return newProduct;
};

module.exports = {
  getAll,
  getByID,
  create,
};
