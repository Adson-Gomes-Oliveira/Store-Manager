const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const status = require('../../../helpers/httpStatus');

describe('User Controller Test', () => {
  describe('01. Getting all products from database', () => {
    describe('When the request is successfully completed', () => {
      const request = {};
      const response = {};
      const result = { data: [{ id: 1 }], status: status.OK }

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'getAll').resolves(result);
      });

      after(async () => {
        productService.getAll.restore();
      });

      it('a code 200 OK status is called', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(status.OK)).to.equal(true);
      });
      it('the right data is called', async () => {
        await productController.getAll(request, response);
        expect(response.json.calledWith(result.data)).to.equal(true);
      });
    });
    describe('When the request fails', () => {
      const request = {};
      const response = {};
      const next = () => {};
      const result = { message: 'No data avaliable', status: status.NO_CONTENT };

      before(async () => {
        sinon.stub(productService, 'getAll').resolves(result);
      });

      after(async () => {
        productService.getAll.restore();
      });

      it('an error is throwed', async () => {
        try {
          await productController.getAll(request, response, next);
        } catch (error) {
          expect(error.message).to.equal(result.message);
          expect(error.status).to.equal(result.status);
        }
      });
    });
  });
});