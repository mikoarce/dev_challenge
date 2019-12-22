import axios, { CancelToken } from 'axios';

const baseUrl = 'http://localhost:3000/api/'; // Must be in env;

class ApiService {
  /**
   * Static function that checks if the thrown error is due to a cancel.
   * @param thrown {Error} - Thrown error.
   * @returns {boolean} - True if the request was cancelled.
   */
  static isCancel(thrown) {
    return axios.isCancel(thrown);
  }

  constructor() {
    this.source = undefined;
    this.allowConcurrentRequests = false;

    this.getMedianPrimes = this.getMedianPrimes.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * Creates a new token and cancels existing one if it exists.
   * @returns {CancelToken|undefined} - Cancel token.
   */
  handleCancel() {
    if (!this.allowConcurrentRequests) {
      if (this.source) {
        this.source.cancel();
      }

      this.source = CancelToken.source();
      return this.source.token;
    }
    return undefined;
  }

  /**
   * Calls the get_median_primes endpoint.
   * @param max {number|string} - Required endpoint parameter.
   * @returns {Promise<Promise<AxiosResponse<T>>>} - Axios response.
   */
  async getMedianPrimes(max) {
    const cancelToken = this.handleCancel();
    return axios.get(`${baseUrl}get_median_primes`, { cancelToken, params: { max } });
  }
}

export default ApiService;
