const productModel = require('../models/productModel');
const code = require('../helpers/httpStatus');
const valid = require('../validations/productValidation');

const getAll = async () => {
  const result = await productModel.getAll();
  const verify = valid.getAll(result);
  if (verify.message) return verify;

  return { data: result, status: code.OK };
};
const getByID = async (id) => {
  const result = await productModel.getByID(id);

  const verify = valid.getByID({ id, result });
  if (verify.message) return verify;

  return { data: result[0], status: code.OK };
};

module.exports = {
  getAll,
  getByID,
};
