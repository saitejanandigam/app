dbURL="mongodb+srv://saiteja:123@abcd@cluster0.2oj3acb.mongodb.net/?retryWrites=true&w=majority";


require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

app.use(express.json());
const userRoutes = require('./server/routes/user');

console.log(process.env.dbURL)
mongoose.connect(process.env.dbURL)
  .then(console.log("DB Connected!!"))
  .catch(error => console.log(error));

app.use(express.json());


app.use(express.static(__dirname + "/public"));
app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/public','index.html')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization")
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
    next();

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port ",PORT));
