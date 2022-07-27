const connection = require('../helpers/connection');

const getAll = async () => {
  const [response] = await connection.execute(`
    SELECT * FROM StoreManager.products
  `);
  console.log(response);
  return response;
};
const getAllProductIDs = async () => {
  const [response] = await connection.execute(`
    SELECT id FROM StoreManager.products
  `);

  const idsToReturn = response.map((id) => Object.values(id)[0]);
  return idsToReturn;
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
const edit = async (payload) => {
  const { id, name } = payload;
  const [response] = await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `, [name, id]);

  if (response.affectedRows === 0) return { message: 'Product not found', status: 404 };

  const newProduct = {
    id,
    name,
  };

  return newProduct;
};
const exclude = async (id) => {
  const [response] = await connection.execute(`
    DELETE FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  console.log(response);
  if (response.affectedRows === 0) return { message: 'Product not found', status: 404 };

  return {};
};

module.exports = {
  getAll,
  getAllProductIDs,
  getByID,
  create,
  edit,
  exclude,
};
