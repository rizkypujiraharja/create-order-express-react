const { Sequelize } = require('sequelize');

const conn = new Sequelize('test_gits', 'rizky', 'secret', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = conn;