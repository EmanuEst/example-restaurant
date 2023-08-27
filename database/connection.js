const Sequelize = require("sequelize");


  const connection = new Sequelize(
    'bdsupreme',
    'userrestaurante',
    'catitu141005',
    {
      host: 'db4free.net',
      dialect: 'mysql',
      timezone: '-03:00',
    }
  )
  module.exports = connection;


// const connection = new Sequelize("dbexample", "root", "work", {
//   host: "localhost",
//   dialect: "mysql",
//   timezone: "-03:00"
// });


module.exports = connection;
