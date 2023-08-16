/* eslint-disable no-unused-vars */
/*const listaComponents = async () => {
  const response = await fetch("http://");
  const components = await response.json();
};*/
export default {
  data() {
    return {
      width: "800",
      height: "550",
      n: 0,
      component: {
        title: "",
        type: "",
        value: "",
        regex: "",
      },
      componentsNuevos: [],
      camposArray: [
        {
          title: "Nombre de Usuario",
          type: "String",
          value: "-",
          regex: "-",
        },
        {
          title: "Carnet de Identidad",
          type: "String",
          value: "-",
          regex: "-",
        },
        {
          title: "Telefono",
          type: "String",
          value: "-",
          regex: "-",
        },
      ],
    };
  },
};
