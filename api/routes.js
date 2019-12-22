const router = require('express').Router();
const primeController = require('./controller');

router.get('/get_median_primes', primeController.getMedianPrimes);

module.exports = router;
