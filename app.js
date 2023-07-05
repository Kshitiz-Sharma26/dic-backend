const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");


const connect = require("./database");
connect();

const User = require("./models/userData.js");

app.use(express.json());
app.use(cookieParser());
app.use(cors);
const route = require('./routes.js');
app.use('/', route);


app.listen(8000, () => {
    console.log("listening")
})