const connection = require('../helpers/connection');
const makeCamel = require('../helpers/makeCamel');

const getAll = async () => {
  const [response] = await connection.execute(`
    SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    WHERE sp.sale_id = sa.id
    ORDER BY sp.sale_id ASC, sp.product_id ASC
  `);

  return response.map(makeCamel);
};
const getByID = async (id) => {
  const [response] = await connection.execute(`
    SELECT sa.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    WHERE sp.sale_id = sa.id
    AND sp.sale_id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC
  `, [id]);

  return response.map(makeCamel);
}; 
const addItemSold = async (insertId, productId, quantity) => {
  await connection.execute(`
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES
      (?, ?, ?)`, [insertId, productId, quantity]);
};
const create = async (payload) => {
  const [responseSales] = await connection.execute(`
    INSERT INTO StoreManager.sales (id, date) VALUES
      (DEFAULT, DEFAULT)`);

  const { insertId } = responseSales;

  const promises = [];

  for (let item = 0; item < payload.length; item += 1) {
    const { productId, quantity } = payload[item];
    promises.push(addItemSold(insertId, productId, quantity));
  }

  await Promise.all(promises);
    
  const newSale = {
    id: insertId,
    itemsSold: payload,
  };

  return newSale;
};

module.exports = {
  getAll,
  getByID,
  create,
};
