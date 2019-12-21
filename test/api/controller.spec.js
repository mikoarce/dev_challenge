import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('getMedianPrimes', function () {
    it('returns an error if no params are given');
    it('returns an error if max is not a number');
    it('returns an empty list when max is less than 2');
    it('returns 1 value as the median when there is an odd amount of primes');
    it('returns 2 values as the median when there is an even amount of primes');
    it('returns a value before the time limit');
});
