// Update with your config settings.

// module.exports = {
//   client: 'postgresql',
//   connection: {
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     user:  process.env.DB_USER,
//     password: process.env.DB_PASS
//   },
//   pool: {
//     min: 2,
//     max: 10
//   }
// };
module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user:  process.env.DB_USER,
    password: process.env.DB_PASS
  },
  pool: {
    min: 2,
    max: 10
  }
};