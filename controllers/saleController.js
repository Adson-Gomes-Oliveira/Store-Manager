const saleService = require('../services/saleService');
const customError = require('../helpers/customError');

const create = async (req, res, next) => {
  try {
    const payload = req.body;
    const response = await saleService.create(payload);
  
    if (response.message) {
      const err = customError(response);
      throw err;
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
