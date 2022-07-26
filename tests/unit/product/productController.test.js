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
  describe('02. Getting products by ID', () => {
    describe("When the request is successfully completed", () => {
      const request = {};
      const response = {};
      const result = { data: [{ id: 1 }], status: status.OK };
      const paramID = 1;

      before(async () => {
        request.params = sinon.stub().returns(paramID);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, "getByID").resolves(result);
      });

      after(async () => {
        productService.getByID.restore();
      });

      it("a code 200 OK status is called", async () => {
        await productController.getByID(request, response);
        expect(response.status.calledWith(status.OK)).to.equal(true);
      });
      it("the right data is called", async () => {
        await productController.getByID(request, response);
        expect(response.json.calledWith(result.data)).to.equal(true);
      });
    });
    describe("When the request fails", () => {
      const request = {};
      const response = {};
      const next = () => {};
      const result = {
        message: "No data avaliable",
        status: status.NO_CONTENT,
      };
      const paramID = 5;

      before(async () => {
        request.params = sinon.stub().returns(paramID);
        sinon.stub(productService, "getByID").resolves(result);
      });

      after(async () => {
        productService.getByID.restore();
      });

      it("an error is throwed", async () => {
        try {
          await productController.getByID(request, response, next);
        } catch (error) {
          expect(error.message).to.equal(result.message);
          expect(error.status).to.equal(result.status);
        }
      });
    });
  });
  describe('03. Creating new products', () => {
    describe("When the request is successfully completed", () => {
      const request = {};
      const response = {};
      const result = { data: { id: 1, name: 'Steve' }, status: status.OK };
      const MOCK_NAME = 'Steve';

      before(async () => {
        request.body = sinon.stub().returns(MOCK_NAME);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'create').resolves(result);
      });

      after(async () => {
        productService.create.restore();
      });

      it("a code 200 OK status is called", async () => {
        await productController.create(request, response);
        expect(response.status.calledWith(status.OK)).to.equal(true);
      });
      it("the right data is called", async () => {
        await productController.create(request, response);
        expect(response.json.calledWith(result.data)).to.equal(true);
      });
    });
    describe("When the request fails", () => {
      const request = {};
      const response = {};
      const next = () => {};
      const result = {
        message: '"name" is required',
        status: status.BAD_REQUEST,
      };
      const MOCK_NAME = '';

      before(async () => {
        request.body = sinon.stub().returns(MOCK_NAME);
        sinon.stub(productService, "getByID").resolves(result);
      });

      after(async () => {
        productService.getByID.restore();
      });

      it("an error is throwed", async () => {
        try {
          await productController.getByID(request, response, next);
        } catch (error) {
          expect(error.message).to.equal(result.message);
          expect(error.status).to.equal(result.status);
        }
      });
    });
  });
});
