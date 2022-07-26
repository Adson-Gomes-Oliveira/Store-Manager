const connection = require('../helpers/connection');

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
  console.log(payload);
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
  create,
};
