const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'Isaksystem',
    'postgres',
    'mahere13',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }

)