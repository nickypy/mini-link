const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.minilink_url
});

module.exports = pool;