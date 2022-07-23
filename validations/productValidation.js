const JOI = require('joi');
const code = require('../helpers/httpStatus');

const getAll = (result) => {
  const verifyData = JOI.object({ result: JOI.array().min(1).required() });

  const dataVerified = verifyData.validate({ result });

  if (dataVerified.error) return { message: 'No data avaliable', status: code.NO_CONTENT };

  return {};
};
const getByID = ({ id, result }) => {
  const verifyID = JOI.object({ id: JOI.number().required() });
  const verifyData = JOI.object({ result: JOI.array().min(1).required() });

  const IDVerified = verifyID.validate({ id });
  const dataVerified = verifyData.validate({ result });

  if (IDVerified.error) return { message: 'Invalid ID', status: code.BAD_REQUEST };
  if (dataVerified.error) return { message: 'Product not found', status: code.NO_CONTENT };

  return {};
};

module.exports = {
  getAll,
  getByID,
};
