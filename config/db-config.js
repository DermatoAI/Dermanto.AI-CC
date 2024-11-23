require("dotenv").config(); 
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil!");
  } catch (error) {
    console.error("Koneksi ke database gagal:", error.message);
    process.exit(1); 
  }
};

testConnection();

module.exports = sequelize;
