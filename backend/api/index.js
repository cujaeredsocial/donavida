//Imports
const config = require('../../config');
const cookieParser = require('cookie-parser');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');



//Init5
const app = express();
// app.set("view engine", "ejs");
// app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

/*//Permitir usar el la direccion de interfaz de cliente
app.use(cors({
  origin: config.URLCLIENT,
  optionsSuccessStatus: 200
}));*/

//Permitir usar el la direccion de interfaz del dss
/*app.use(cors({
  origin: config.URLDSS,
  optionsSuccessStatus: 200
}));*/


//Routes
app.use(require("./routes/users"));
app.use(require("./routes/rol"));
app.use(require("./routes/meta"));
app.use(require("./routes/components"));
// raiz
app.get('/', (req, res) => {
  res.json("Api DonaVida");
})

mongoose
  .connect(config.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected in ${config.MONGODB}`))
  .catch(err => console.log(err));

//setting of express
app.set("port", config.PORT);

//Middlewares

app.listen(3000/*config.PORT, config.HOST*/, () => {
  console.log(`Server mode ${config.NODE_ENV} in http://${config.HOST}:${config.PORT}`);
});
