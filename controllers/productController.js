const productService = require('../services/productService');
const customError = require('../helpers/customError');

const getAll = async (_req, res, next) => {
  try {
    const response = await productService.getAll();

    if (response.message) {
      const err = customError(response);
      throw err;
    }

    res.status(response.status).json(response.data); 
  } catch (error) {
    next(error);
  }
};
const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productService.getByID(Number(id));

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
    const { name } = req.body;
    const response = await productService.create(name);

    if (response.message) {
      const err = customError(response);
      throw err;
    }
  
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
const edit = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const payload = { id, name };

    const response = await productService.edit(payload);

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
  edit,
};
