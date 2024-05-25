require("dotenv").config();
const xss = require("xss-clean");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(xss())

const userRoute = require('./routes/user.routes')

app.use('/user',userRoute);

module.exports = app;