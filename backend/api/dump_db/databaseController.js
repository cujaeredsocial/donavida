const User = require("../models/user");
const Meta = require("../models/Meta");
const MetaUser = require("../models/MetaUser");

exports.LoadDatabase=(req, res, next) => {
    console.log("Insertando datos...");
    const users = [
      {
        userName: "JohnDoe",
        email: "johndoe@example.com",
        password: "Doe123!Afro",
      },
      {
        userName: "JaneSmith",
        email: "janesmith@example.com",
        password: "Smith987#Afro",
      },
      {
        userName: "MarkJohnson",
        email: "markjohnson@example.com",
        password: "Joh3nsonAfro",
      },
      {
        userName: "EmilyBrown",
        email: "emilybrown@example.com",
        password: "Brownie456Afro",
      },
      {
        userName: "MichaelDavis",
        email: "michaeldavis@example.com",
        password: "Davis12@Afro",
      },
      {
        userName: "SarahMiller",
        email: "sarahmiller@example.com",
        password: "M!llerAfro",
      },
      {
        userName: "DavidWilson",
        email: "davidwilson@example.com",
        password: "Wilson1234$Afro",
      },
      {
        userName: "OliviaTaylor",
        email: "oliviataylor@example.com",
        password: "Taylor2019Afro",
      },
      {
        userName: "DanielAnderson",
        email: "danielanderson@example.com",
        password: "And3r$onAfro",
      },
      {
        userName: "EmmaJohnson",
        email: "emmajohnson@example.com",
        password: "J0hnson@2021Afro",
      },
    ];
    const metas = [
      {
        rol: "donante",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
      {
        rol: "gestor",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
      {
        rol: "solicitante",
        components: [
          {
            title: "Nombre",
            dataType: "String",
            regex: "^[A-Za-zs]{1,50}$",
            message: "El nombre insertado no es valido",
          },
          {
            title: "Edad",
            dataType: "int",
            regex: "^(1[89]|[2-5]d|6[0-4])$",
            message: "La edad debe ser mayor que 18 y menor que 65",
          },
        ],
      },
    ];
   
  
    //Insertar metas
    MetaUser.deleteMany({})
      .then(() => {
        console.log("MetaUsers eliminados para crearlos de nuevo");
      })
      .catch(err => {
        console.log(err);
      });
    for (const meta of metas) {
      Meta.exists({ rol: meta.rol })
        .then(exist => {
          if (!exist) {
            Meta.create(meta)
              .then(metaA => {
                console.log(
                  "Meta insertado: rol: " + meta.rol + " componentes = 2:"
                );
                console.log(
                  "1. title: Nombre, dataType: String, regex: ^[A-Za-zs]{1,50}$, message:El nombre insertado no es valido "
                );
                console.log(
                  "2. title: Edad, dataType: int, regex: ^(1[89]|[2-5]d|6[0-4])$, message:La edad debe ser mayor que 18 y menor que 65"
                );
              })
              .catch(err => console.log(err));
          } else {
            console.log("Meta del rol " + meta.rol + " encontrado");
          }
        })
        .catch(err => console.log(err));
    }
    const status = ["aceptado", "en proceso", "en proceso"];
    //Insertar usuarios
    for (const user of users) {
      User.findOne({ userName: user.userName })
        .then(userFound => {
          const rolNumber = Math.floor(Math.random() * 3);
          const edadRandom = Math.floor(Math.random() * (18 - 65 + 1)) + 18;
          if (!userFound) {
            usersInserted++;
            User.create(user)
              .then(userA => {
                metaUNew = new MetaUser({
                  user: userA,
                  rol: metas[rolNumber].rol,
                  meta: metas[rolNumber],
                  components: [
                    {
                      title: "Nombre",
                      dataType: "String",
                      data: userA.userName,
                      regex: "^[A-Za-zs]{1,50}$",
                      message: "El nombre insertado no es valido",
                    },
                    {
                      title: "Edad",
                      dataType: "int",
                      data: edadRandom,
                      regex: "^(1[89]|[2-5]d|6[0-4])$",
                      message: "La edad debe ser mayor que 18 y menor que 65",
                    },
                  ],
                  status: status[rolNumber],
                  updated: true,
                  last: true,
                });
                console.log(
                  "Usuario insertado: userName: " +
                    userA.userName +
                    "-- email" +
                    userA.email +
                    "-- password: " +
                    userA.password +
                    "-- rol: " +
                    metas[rolNumber].rol
                );
                return metaUNew.save();
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("Usuario " + userFound.userName + " encontrado");
            metaUNew = new MetaUser({
              user: userFound,
              rol: metas[rolNumber].rol,
              meta: metas[rolNumber],
              components: [
                {
                  title: "Nombre",
                  dataType: "String",
                  data: userFound.userName,
                  regex: "^[A-Za-zs]{1,50}$",
                  message: "El nombre insertado no es valido",
                },
                {
                  title: "Edad",
                  dataType: "int",
                  data: edadRandom,
                  regex: "^(1[89]|[2-5]d|6[0-4])$",
                  message: "La edad debe ser mayor que 18 y menor que 65",
                },
              ],
              status: status[rolNumber],
              updated: true,
              last: true,
            });
            metaUNew.save();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  
    res.json({
      message: "Users Succesfully inserted",
      success: true,
    });
  
    next();
  };