const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');
const valid = require('../validations/saleValidation');
const status = require('../helpers/httpStatus');

const create = async (payload) => {
  const getAllProductIDs = await productModel.getAllProductIDs();

  const verifyPayload = valid.create.verifyPayload(payload);
  if (verifyPayload.message) return verifyPayload;

  const verifyPayloadIDs = valid.create.verifyID(getAllProductIDs, payload);
  if (verifyPayloadIDs.message) return verifyPayloadIDs;
  
  const result = await saleModel.create(payload);
  return { data: result, status: status.CREATED };
};

module.exports = {
  create,
};
