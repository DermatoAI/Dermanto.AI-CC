const sequelize = require("../config/db-config");
const User = require("./user");

const initModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Model berhasil disinkronkan ke database.");
  } catch (error) {
    console.error("Gagal menyinkronkan model:", error.message);
  }
};

module.exports = { sequelize, initModels, User };
