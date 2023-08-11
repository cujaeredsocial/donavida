//Imports
const config = require('../../config');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const cookie = require('cookie-parser');
const socketIO = require('socket.io');



//Init5
const app = express();
// app.set("view engine", "ejs");
// app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookie());


//Permitir usar el la direccion de interfaz de cliente
app.use(cors({
  origin: config.URLCLIENT,
  optionsSuccessStatus: 200
}));

//Permitir usar el la direccion de interfaz del dss
app.use(cors({
  origin: config.URLDSS,
  optionsSuccessStatus: 200
}));


//Routes
app.use(require("./routes/users"));
app.use('/rol',require("./routes/rol"));
app.use('/meta',require("./routes/meta"));
//app.use('/metauser',require("./routes/metauser"));
// app.use('/component',require("./routes/components"));
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

const server = app.listen(config.PORT, config.HOST, () => {
  console.log(`Server mode ${config.NODE_ENV} in http://${config.HOST}:${config.PORT}`);
});


//websocket socket.io
//1-inicia;izar la web socket
const io = socketIO(server);
io.on('connection',_ => {
  console.log('Gracias por utilizar nuestra red');
})