const makeCamel = (item) => {
  if (item.sale_id) {
    return {
      saleId: item.sale_id,
      date: item.date,
      productId: item.product_id,
      quantity: item.quantity,
    };
  }

  return {
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  };
};

module.exports = makeCamel;
