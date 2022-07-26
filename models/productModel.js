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

  const newProduct = [{
    id: response.insertId,
    name,
  }];

  return newProduct;
};
const getAllProductIDs = async () => {
  const [response] = await connection.execute(`
    SELECT id FROM StoreManager.products
  `);

  const idsToReturn = response.map((id) => Object.values(id)[0]);
  return idsToReturn;
};

module.exports = {
  getAll,
  getByID,
  create,
  getAllProductIDs,
};
