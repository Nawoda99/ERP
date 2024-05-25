const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { type: DataTypes.STRING, unique: true, allowNull: false},
  email: { type: DataTypes.STRING , allowNull: false},
  mobile:{ type: DataTypes.STRING , allowNull: false},
  type: { type: DataTypes.INTEGER , allowNull: false},
  password: { type: DataTypes.STRING , allowNull: false},
  permissions: {
    type: DataTypes.JSON, allowNull: false, defaultValue: [1]
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("User table synchronized.");
  })
  .catch((err) => {
    console.error("Unable to synchronized User table:", err);
  });

module.exports=User;