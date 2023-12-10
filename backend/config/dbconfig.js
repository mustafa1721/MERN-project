const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  connectionString: process.env.CONN_STRING,
};