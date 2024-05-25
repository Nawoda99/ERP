const bcrypt = require("bcrypt");
const User = require("../models/user");

async function getAll() {
  return await User.findAll();
}

async function createUser(userData) {
  const user = userData;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return await User.create(user);
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function updateUserById(id, user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return await User.update(user, { where: { id: id } }, { new: true });
}

async function deleteUserById(id) {
  return await User.destroy({ where: { id: id } });
}

async function searchUser(query) {
  const regexQuery = new RegExp(query, "i");
  return await User.find({
    $or: [{ username: regexQuery }],
  });
}

async function authUser(username, password) {
  const user = await User.findOne({ username: username });
  if (!user) {
    return null;
  }
  if (await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUser,
  authUser,
};
