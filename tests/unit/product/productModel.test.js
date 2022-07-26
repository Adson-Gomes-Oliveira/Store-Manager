const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../helpers/connection');
const productModel = require('../../../models/productModel');

describe('User Model Test', () => {
  describe('01. Getting all products from database', () => {
    describe('When the request is successfully completed', () => {

      before(async () => {
        const result = [[{ id: 1 }]];
        sinon.stub(connection, 'execute').resolves(result);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('returns an array', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.an('array');
      });
      it('inside the array exists at least one object', async () => {
        const response = await productModel.getAll();
        expect(response[0]).to.be.an('object');
      });
      it('inside this object exists a property ID', async () => {
        const response = await productModel.getAll();
        expect(response[0]).to.have.property('id');
      });
    });
  });
  describe('02. Getting products by ID', () => {
    const MOCK_ID = 1;

    before(async () => {
      const result = [[{ id: 1 }]];
      sinon.stub(connection, "execute").resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('When the request is successfully completed', () => {
      it('returns an array', async () => {
        const response = await productModel.getByID(MOCK_ID);
        expect(response).to.be.an('array');
      });
      it('inside the array exists one object', async () => {
        const response = await productModel.getByID(MOCK_ID);
        expect(response[0]).to.be.an('object');
        expect(response.length).to.be.equal(1);
      });
      it('inside this object exists a property ID', async () => {
        const response = await productModel.getByID(MOCK_ID);
        expect(response[0]).to.have.property('id');
      });
    });
  });
  describe('03. Creating new products', () => {
    describe('When the POST is successfully completed', () => {
      const MOCK_NAME = 'Steve Rogers'
      const MOCK_ID = 1

      before(async () => {
        const result = [{ insertId: MOCK_ID }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns an array', async () => {
        const response = await productModel.create(MOCK_NAME);
        expect(response).to.be.an('array');
      });
      it('inside the array exist an object', async () => {
        const response = await productModel.create(MOCK_NAME);
        expect(response[0]).to.be.an('object');
      });
      it('the object contain the correct ID', async () => {
        const response = await productModel.create(MOCK_NAME);
        expect(response[0]).to.have.property('id');
        expect(response[0].id).to.be.equal(MOCK_ID);
      });
      it("the object contain the product name", async () => {
        const response = await productModel.create(MOCK_NAME);
        expect(response[0]).to.have.property('name');
        expect(response[0].name).to.be.equal(MOCK_NAME);
      });
    });
  });
});
