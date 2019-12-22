import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api';

chai.use(chaiHttp);

describe('getMedianPrimes', function() {
  const url = '/api/get_median_primes';
  it('returns a status 400 if no params are given', function(done) {
    chai.request(app).get(url).end((_, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });

  it('returns an error if max is not a number', function(done) {
    chai.request(app).get(`${url}?max=123NaN123`).end((_, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });

  it('returns an empty list when max is 2 or less', function(done) {
    chai.request(app).get(`${url}?max=2`).end((_, res) => {
      expect(res.body).to.deep.equal({ data: [] });
      done();
    });
  });

  it('returns the median when there is an odd number of primes', function(done) {
    chai.request(app).get(`${url}?max=18`).end((_, res) => {
      expect(res.body).to.deep.equal({ data: [7] });
      done();
    });
  });

  it('returns a median pair when there is an even number of primes', function(done) {
    chai.request(app).get(`${url}?max=10`).end((_, res) => {
      expect(res.body).to.deep.equal({ data: [3, 5] });
      done();
    });
  });
});
