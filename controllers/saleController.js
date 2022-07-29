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
const edit = async (req, res, next) => {
  try {
    const sales = req.body;
    const { id } = req.params;
    const idParam = Number(id);
    const payload = { idParam, sales };

    const response = await saleService.edit(payload);

    if (response.message) {
      const err = customError(response);
      throw err;
    }

    const { data } = response;

    res.status(response.status).send(data);
  } catch (error) {
    next(error);
  }
};
const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await saleService.exclude(Number(id));

    if (response.message) {
      const err = customError(response);
      throw err;
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getByID,
  create,
  edit,
  exclude,
};
