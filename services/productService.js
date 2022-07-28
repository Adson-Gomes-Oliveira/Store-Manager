const productModel = require('../models/productModel');
const status = require('../helpers/httpStatus');
const valid = require('../validations/productValidation');

const getAll = async () => {
  const result = await productModel.getAll();

  const verify = valid.getAll({ result });
  if (verify.message) return verify;

  return { data: result, status: status.OK };
};
const search = async (query) => {
  if (query.length < 1) {
    const newResult = await getAll();
    return newResult;
  }

  const verifyQuery = valid.search.verifyQuery(query);
  if (verifyQuery.message) return verifyQuery;

  const result = await productModel.search(query);
  console.log(result);
  const verifyResult = valid.search.verifyResult(result);
  if (verifyResult.message) return verifyResult;

  return { data: result, status: status.OK };
};
const getByID = async (id) => {
  const result = await productModel.getByID(id);

  const verify = valid.getByID({ id, result });
  if (verify.message) return verify;

  return { data: result[0], status: status.OK };
};
const create = async (name) => {
  const verifyName = valid.create.verifyName(name);
  if (verifyName.message) return verifyName;

  const result = await productModel.create(name);

  const verify = valid.create.verifyData(result);
  if (verify.message) return verify;
  
  return { data: result[0], status: status.CREATED };
};
const edit = async (payload) => {
  const { name } = payload;

  const verifyName = valid.create.verifyName(name);
  if (verifyName.message) return verifyName;

  const result = await productModel.edit(payload);
  
  if (result.message) return result;

  return { data: result, status: status.OK };
};
const exclude = async (id) => {
  const result = await productModel.exclude(id);
  if (result.message) return result;

  return {};
};

module.exports = {
  getAll,
  getByID,
  create,
  edit,
  exclude,
  search,
};
