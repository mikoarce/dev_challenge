const primeController = require('./controller');
const router = require('express').Router();

router.get('/get_median_primes', primeController.getMedianPrimes);

module.exports = router;
