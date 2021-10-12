const config = require('../config/config.json');

const DOMAIN = config[process.env.NODE_ENV || 'local']['domain'];
module.exports = DOMAIN;