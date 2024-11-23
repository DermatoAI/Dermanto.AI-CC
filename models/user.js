const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-config");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { 
        msg: "Email tidak valid",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: "Password harus lebih dari 6 karakter",
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
});

User.prototype.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
