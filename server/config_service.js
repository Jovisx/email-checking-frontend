const axios = require('axios');

axios.defaults.baseURL = process.env.API_ENDPOINT;

class ConfigService {
  constructor() {
    this.initialized = false;
    this.timer = null;
  }

  async init() {
    this.initialized = false;
    this.initialized = true;
  }
}

const configService = new ConfigService();

module.exports = configService;
