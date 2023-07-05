const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const connect = require("./database");
connect();

const User = require("./models/userData.js");

app.use(express.json());
app.use(cookieParser());
const route = require('./routes.js');
app.use('/', route);


app.listen(8000,()=>{
    console.log("listening")
})