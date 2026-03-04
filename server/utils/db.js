import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  define: {
    schema: process.env.DB_SCHEMA || 'dev'
  },
  dialectOptions: {
    ssl: true
  }
})

export default sequelize


