const primeController = require('./controller');
const router = require('express').Router();

router.route('/get_median_primes')
    .get(primeController.getMedianPrimes);

module.exports = router;
