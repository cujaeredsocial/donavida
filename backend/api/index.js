//Imports
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



//Init
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

//CSS 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use(require('./routes/login'));

mongoose
  .connect("mongodb://127.0.0.1:27017/donavidaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!!"))
  .catch(err => console.log(err));

//setting of express
app.set("port", 2000);





//Middlewares


app.listen(2000, () => {
  console.log("Server on port 5830");
});
