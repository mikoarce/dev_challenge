const getPrimes = (max) => {
  const upperLimit = Math.sqrt(max);
  const sieve = new Array(max).fill(true);

  for (let i = 2; i < upperLimit; i++) {
    if (sieve[i]) {
      for (let j = i ** 2; j < max; j += i) {
        sieve[j] = false;
      }
    }
  }
  const primes = sieve.reduce((acc, isPrime, idx) => {
    if (isPrime && idx > 1) {
      acc.push(idx);
    }
    return acc;
  }, []);
  const midIdx = Math.floor(primes.length / 2);
  const isEven = primes.length % 2 === 0;

  return isEven ? primes.slice(midIdx - 1, midIdx + 1) : [primes[midIdx]];
};

exports.getMedianPrimes = async (req, res) => {
  const { max } = req.query;
  if (max === undefined) {
    res.status(400).json({ message: "'max' is required" });
  } else if (Number.isNaN(Number(max))) {
    res.status(400).json({ message: `'${max}' is not a number` });
  } else {
    const maxAsNum = Number(max);
    if (maxAsNum % 1 !== 0) {
      res.status(400).json({ message: "'max' must be an integer" });
    } else if (maxAsNum <= 0) {
      res.status(400).json({ message: "'max' must be greater than 0" });
    } else {
      res.json({ data: getPrimes(Number(max)) });
    }
  }
};
