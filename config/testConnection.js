const sequelize = require("./db-config.js");

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil!");
  } catch (error) {
    console.error("Koneksi ke database gagal:", error.message);
  } finally {
    await sequelize.close();
  }
};

testConnection();
