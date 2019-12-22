import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import ApiService from '../../../client/utils/ApiService';

const baseUrl = 'http://localhost:3000/api/'; // Must be in env;

describe('ApiService', function() {
  let sandbox;
  let api;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
    api = new ApiService();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#getMedianPrimes', function() {
    let stub;

    beforeEach(function() {
      stub = sandbox.stub(axios, 'get');
    });

    it('creates a cancel token', function() {
      api.getMedianPrimes(50);
      const [, callArgs] = stub.getCall(0).args;
      const { cancelToken } = callArgs;
      expect(cancelToken).to.not.be.undefined;
    });

    it('formats url parameters correctly', function() {
      api.getMedianPrimes(50);
      const [actualUrl, callArgs] = stub.getCall(0).args;
      expect({ url: actualUrl, max: callArgs.params.max }).to.deep.equal({
        url: `${baseUrl}get_median_primes`,
        max: 50,
      });
    });
  });
});
