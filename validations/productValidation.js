const JOI = require('joi');
const status = require('../helpers/httpStatus');

const getAll = ({ result }) => {
  const verifyData = JOI.object({ result: JOI.array().min(1).required() });

  const dataVerified = verifyData.validate({ result });

  if (dataVerified.error) return { message: 'No data avaliable', status: status.NO_CONTENT };

  return {};
};
const getByID = ({ id, result }) => {
  const verifyID = JOI.object({ id: JOI.number().required() });
  const verifyData = JOI.object({ result: JOI.array().min(1).required() });

  const IDVerified = verifyID.validate({ id });
  const dataVerified = verifyData.validate({ result });

  if (IDVerified.error) return { message: 'Invalid ID', status: status.BAD_REQUEST };
  if (dataVerified.error) return { message: 'Product not found', status: status.NO_CONTENT };

  return {};
};

const verifyData = (result) => {
  const verifyResult = JOI.object({ result: JOI.array().max(1).min(1).required() });

  const resultVerified = verifyResult.validate({ result });
  
  if (resultVerified.error) {
    return { message: 'Product not added', status: status.INTERNAL };
  }

  return {};
};
const verifyName = (name) => {
  if (!name) {
    return { message: '"name" is required', status: status.BAD_REQUEST };
  }
  const verifyNameType = JOI.object({ name: JOI.string().required() });
  const verifyLengthName = JOI.object({ name: JOI.string().min(5) });

  const nameTypeVerified = verifyNameType.validate({ name });
  const nameLengthVerified = verifyLengthName.validate({ name });

  if (nameTypeVerified.error) {
    return { message: '"name" is required', status: status.BAD_REQUEST };
  }
  if (nameLengthVerified.error) {
    return {
      message: '"name" length must be at least 5 characters long',
      status: 422,
    };
  }

  return {};
};
const create = {
  verifyData,
  verifyName,
};

module.exports = {
  getAll,
  getByID,
  create,
};
