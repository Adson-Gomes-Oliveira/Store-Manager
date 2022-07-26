const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const status = require('../../../helpers/httpStatus');

describe('User Service Test', () => {
  describe('01. Getting all products from database', () => {
    describe('When the request is successfully completed', () => {
      before(async () => {
        const result = [{ id: 1 }];
        sinon.stub(productModel, 'getAll').resolves(result);
      });

      after(async () => {
        productModel.getAll.restore();
      });

      it('returns an object', async () => {
        const response = await productService.getAll();
        expect(response).to.be.an('object');
      });
      it('inside the object exists a code 200 OK status', async () => {
        const response = await productService.getAll();
        expect(response).to.have.property('status');
        expect(response.status).to.be.equal(status.OK);
      });
      it('inside this object exists the data returned', async () => {
        const response = await productService.getAll();
        expect(response).to.have.property('data');
        expect(response.data).to.be.an('array');
        expect(response.data[0]).to.have.property('id');
      });
    });
    describe('When the data returned is invalid', () => {
      const ERR_MESSSAGE = 'No data avaliable';

      before(async () => {
        const result = [];
        sinon.stub(productModel, 'getAll').resolves(result);
      });

      after(async () => {
        productModel.getAll.restore();
      });

      it('returns an object', async () => {
        const response = await productService.getAll();
        expect(response).to.be.an('object');
      });
      it('inside the object exists a code 404 OK status', async () => {
        const response = await productService.getAll();
        expect(response).to.have.property('status');
        expect(response.status).to.be.equal(status.NO_CONTENT);
      });
      it('inside this object exists a message of error', async () => {
        const response = await productService.getAll();
        expect(response).to.have.property('message');
        expect(response.message).to.be.a('string');
        expect(response.message).to.be.equal(ERR_MESSSAGE);
      });
    });
  });
  describe('02. Getting products by ID', () => {
    describe('When the request is successfully completed', () => {
      const MOCK_ID = 1;

      before(async () => {
        const result = [[{ id: 1 }]];
        sinon.stub(productModel, 'getByID').resolves(result);
      });

      after(async () => {
        productModel.getByID.restore();
      });

      it('returns an object', async () => {
        const response = await productService.getByID(MOCK_ID);
        expect(response).to.be.an('object');
      });
      it('inside the object exists a status 200 OK', async () => {
        const response = await productService.getByID(MOCK_ID);
        expect(response).to.have.a.property('status');
        expect(response.status).to.be.equal(status.OK);
      });
      it('inside this object exists the only data returned', async () => {
        const response = await productService.getByID(MOCK_ID);
        expect(response).to.have.a.property('data');
        expect(response.data).to.be.an('array');
        expect(response.data[0]).to.have.a.property('id');
      });
    });
    describe('When the ID is invalid', () => {
      const MOCK_INVALID_ID = "";
      const ERR_MESSSAGE = "Invalid ID";

      before(async () => {
        const result = [];
        sinon.stub(productModel, 'getByID').resolves(result);
      });

      after(async () => {
        productModel.getByID.restore();
      });

      it('returns an object', async () => {
        const response = await productService.getByID(MOCK_INVALID_ID);
        expect(response).to.be.an('object');
      });
      it('inside the object exists a code 400 BAD REQUEST status', async () => {
        const response = await productService.getByID(MOCK_INVALID_ID);
        expect(response).to.have.property('status');
        expect(response.status).to.be.equal(status.BAD_REQUEST);
      });
      it('inside this object exists a message of error', async () => {
        const response = await productService.getByID(MOCK_INVALID_ID);
        expect(response).to.have.property('message');
        expect(response.message).to.be.a('string');
        expect(response.message).to.be.equal(ERR_MESSSAGE);
      });
    });
  });
  describe('03. Creating new products', () => {
    describe('When the service is successfully completed', () => {
      const MOCK_NAME = 'Steve Rogers';

      before(async () => {
        const result = [{ id: 1, name: MOCK_NAME }];
        sinon.stub(productModel, 'create').resolves(result);
      });
      after(async () => {
        productModel.create.restore();
      });
      
      it('returns an object', async () => {
        const result = await productService.create(MOCK_NAME);
        expect(result).to.be.an('object');
      });
      it('inside this object exists data key', async () => {
        const result = await productService.create(MOCK_NAME);
        expect(result).to.have.property('data');
      });
      it('and exists status key also', async () => {
        const result = await productService.create(MOCK_NAME);
        expect(result).to.have.property('status');
      });
    });
    describe('When the payload is invalid', () => {
      const MOCK_PAYLOAD = {};

      before(async () => {
        const result = [{}];
        sinon.stub(productModel, "create").resolves(result);
      });
      after(async () => {
        productModel.create.restore();
      });

      it('returns an object', async () => {
        const result = await productService.create(MOCK_PAYLOAD);
        expect(result).to.be.an('object');
      });
      it('inside this object exists message key', async () => {
        const result = await productService.create(MOCK_PAYLOAD);
        expect(result).to.have.property('message');
      });
      it('and exists status key also', async () => {
        const result = await productService.create(MOCK_PAYLOAD);
        expect(result).to.have.property('status');
      });
    });
  });
});
