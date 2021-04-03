const Sequelize = require('sequelize')

const DB_NAME = 'vuemastery'
const USER_NAME = 'root'
const PASSWORD = 'q1w2e3r4t5y6'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize