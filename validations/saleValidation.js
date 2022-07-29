const JOI = require('joi');
const status = require('../helpers/httpStatus');

const getByID = (result) => {
  const resultEmpty = JOI.object({ result: JOI.array().min(1).required() });

  const verifyResult = resultEmpty.validate({ result });

  if (verifyResult.error) return { message: 'Sale not found', status: status.NO_CONTENT };

  return {};
};

const payloadConditionals = (cond) => {
  if (cond.verifySID.error) {
    return { message: '"productId" is required', status: status.BAD_REQUEST };
  }
  if (cond.verifyQuantity.error) {
    return { message: '"quantity" is required', status: status.BAD_REQUEST };
  }
  if (cond.verifyZeroQuantity.error) {
    return {
      message: '"quantity" must be greater than or equal to 1',
      status: status.INVALID_ENTITY,
    };
  }

  return {};
};
const verifyPayload = (payload) => {
  const validation = payload.map((item) => {
    const { productId, quantity } = item;
    const idUndefined = JOI.object({ productId: JOI.number().required() });
    const quantityUndefined = JOI.object({ quantity: JOI.number().required() });
    const zeroQuantity = JOI.object({ quantity: JOI.number().min(1) });

    const verifySID = idUndefined.validate({ productId });
    const verifyQuantity = quantityUndefined.validate({ quantity });
    const verifyZeroQuantity = zeroQuantity.validate({ quantity });

    const conditionals = payloadConditionals({ verifySID, verifyQuantity, verifyZeroQuantity });
    
    if (conditionals.message) return conditionals;

    return {};
  });

  const catchError = validation.find((valid) => valid.message && valid);
  if (catchError) return catchError;
  return {};
};
const verifyID = (productIDs, payload) => {
  const payloadIDs = payload.map((item) => Object.values(item)[0]);
  const filter = payloadIDs.some((payloadID) => (!productIDs.includes(payloadID)));
  if (filter) return { message: 'Product not found', status: status.NO_CONTENT };

  return {};
};
const verifyPayloadEdit = (payload) => {
  console.log(payload);
  if (!payload.length) return { message: '"productId" is required', status: status.BAD_REQUEST };
  const validation = payload.map((item) => {
    const { productId, quantity } = item;
    const idNoExists = JOI.object({ productId: JOI.number().required() });
    const quantityUndefined = JOI.object({ quantity: JOI.number().required() });
    const zeroQuantity = JOI.object({ quantity: JOI.number().min(1) });

    const verifySID = idNoExists.validate({ productId });
    const verifyQuantity = quantityUndefined.validate({ quantity });
    const verifyZeroQuantity = zeroQuantity.validate({ quantity });

    const conditionals = payloadConditionals({ verifySID, verifyQuantity, verifyZeroQuantity });

    if (conditionals.message) return conditionals;

    return {};
  });

  const catchError = validation.find((valid) => valid.message && valid);
  if (catchError) return catchError;
  return {};
};

const create = {
  verifyPayload,
  verifyID,
};

const edit = {
  verifyPayloadEdit,
};

module.exports = {
  getByID,
  create,
  edit,
};
