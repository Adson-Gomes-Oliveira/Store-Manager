const saleService = require('../services/saleService');
const customError = require('../helpers/customError');

const getAll = async (_req, res, next) => {
  try {
    const response = await saleService.getAll();
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await saleService.getByID(Number(id));

    if (response.message) {
      const err = customError(response);
      throw err;
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
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
  getAll,
  getByID,
  create,
};
