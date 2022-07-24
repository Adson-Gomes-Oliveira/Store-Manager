const productModel = require('../models/productModel');
const status = require('../helpers/httpStatus');
const valid = require('../validations/productValidation');

const getAll = async () => {
  const result = await productModel.getAll();

  const verify = valid.getAll({ result });
  if (verify.message) return verify;

  return { data: result, status: status.OK };
};
const getByID = async (id) => {
  const result = await productModel.getByID(id);

  const verify = valid.getByID({ id, result });
  if (verify.message) return verify;

  return { data: result[0], status: status.OK };
};
const create = async ({ name }) => {
  const result = await productModel.create({ name });

  const verify = valid.create({ name, result });
  if (verify.message) return verify;
  
  return { data: result[0], status: status.CREATED };
};

module.exports = {
  getAll,
  getByID,
  create,
};
