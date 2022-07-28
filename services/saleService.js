const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');
const valid = require('../validations/saleValidation');
const status = require('../helpers/httpStatus');

const getAll = async () => {
  const result = await saleModel.getAll();
  return { data: result, status: status.OK };
};
const getByID = async (id) => {
  const result = await saleModel.getByID(id);

  const verify = valid.getByID(result);
  if (verify.message) return verify;

  return { data: result, status: status.OK };
};
const create = async (payload) => {
  const getAllProductIDs = await productModel.getAllProductIDs();

  const verifyPayload = valid.create.verifyPayload(payload);
  if (verifyPayload.message) return verifyPayload;

  const verifyPayloadIDs = valid.create.verifyID(getAllProductIDs, payload);
  if (verifyPayloadIDs.message) return verifyPayloadIDs;
  
  const result = await saleModel.create(payload);
  return { data: result, status: status.CREATED };
};
const edit = async (payload) => {
  const result = await saleModel.edit(payload);
  return { data: result, status: status.CREATED };
};
const exclude = async (id) => {
  const result = await saleModel.exclude(id);

  if (result.message) return result;

  return {};
};

module.exports = {
  getAll,
  getByID,
  create,
  edit,
  exclude,
};
