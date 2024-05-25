const userServices = require("../services/userServices");
const jwt = require("jsonwebtoken");

async function getAll(req, res) {
  try {
    const users = await userServices.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  try {
    const user = req.body;
    const newUser = await userServices.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await userServices.updateUserById(id, user);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    await userServices.deleteUserById(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchUser(req, res) {
  try {
    const { query } = req.query;
    const users = await userServices.searchUser(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function authUser(req, res) {
  console.log("hit");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  try {
    const user = await userServices.authUser(username, password);
    if (!user) {
      return res.status(404).json({ error: "Authentication Failed" });
    }
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ token: accessToken });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAll: getAll,
  createUser: createUser,
  getUserById: getUserById,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  searchUser: searchUser,
  authUser: authUser,
};
