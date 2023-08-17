<template>
  <v-app>
    <v-container fluid class="background-container fill-container">
      <h1 style="text-align: center; color: red" v-if="!mostrarForm">
        Seleccione la opcion que desea realizar
      </h1>
      <v-row align="center" justify="center">
        <!-- Para obtenerlo segun el id de una tabla solo habria q  pasar el id del tipo de formulario q se debe en el parametro del metodo -->
        <div class="button-container" v-if="!mostrarForm">
          <v-btn color="red" dark @click="getFormTemplate('/plantilla/gestor')"
            >Solicitud de Gestor</v-btn
          >
          <v-btn color="red" dark @click="getFormTemplate('/plantilla/donante')"
            >Solicitud de Donante</v-btn
          >
          <v-btn
            color="red"
            dark
            @click="getFormTemplate('/plantilla/solicitante')"
            >Solicitud de Donación</v-btn
          >
        </div>

        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6"> </v-col>
          </v-row>
        </v-container>

        <v-card
          v-if="mostrarForm && !formsend"
          class="mx-auto my-12"
          width="600"
          max-height="900"
        >
          <v-col class="mx-auto" cols="12" md="10">
            <v-card-title
              ><h3 style="text-align: center; color: red">
                {{ titulo }}
              </h3></v-card-title
            >
            <v-card-text>
              <v-form
                @submit.prevent="send"
                v-for="item in components"
                :key="item.title"
                v-model="valid"
              >
                <div v-if="item.dataType === 'String'">
                  <v-text-field
                    :rules="[v => new RegExp(item.regex).test(v) || item.message]"
                    v-model="item.data"
                    :label="item.title"
                  ></v-text-field>
                </div>
                <div v-if="item.dataType === 'Text'">
                  <v-textarea
                    :rules="[item.regex || item.message]"
                    v-model="item.data"
                    :label="item.title"
                  ></v-textarea>
                </div>
                <div v-else-if="item.dataType === 'Boolean'">
                  <v-checkbox
                    :rules="[item.regex || item.message]"
                    v-model="item.data"
                    :label="item.title"
                  ></v-checkbox>
                </div>
                <div v-else-if="item.dataType === 'Number'">
                  <v-text-field
                    :rules="[v => new RegExp(item.regex).test(v) || item.message]"
                    v-model="item.data"
                    type="number"
                    :label="item.title"
                  ></v-text-field>
                </div>
                <div v-else-if="item.dataType === 'Select'">
                  <v-combobox
                    :rules="[item.regex || item.message]"
                    v-model="item.data"
                    :items="item.values"
                    :label="item.title"
                  ></v-combobox>
                </div>
              </v-form>
              <v-btn
                color="bar"
                dark
                @click="goBack"
                v-if="mostrarForm"
                class="mr-12"
                >Atrás</v-btn
              >

              <v-btn
                v-if="mostrarForm && !formsend"
                @click="comprobar"
                color="red"
                dark
                :disabled="!valid"
                >Siguiente</v-btn
              >
            </v-card-text>
          </v-col>
        </v-card>

        <!--Tarjeta de confirmacion de envio de la solicitud-->
        <v-card
          v-if="formsend"
          class="mx-auto my-12"
          width="600"
          max-height="900"
        >
          <v-col class="mx-auto" cols="12" md="10">
            <v-card-title
              ><h2 style="text-align: center; color: red">
                {{ titulo }}
              </h2></v-card-title
            >
            <h3>Revise si son correctos los datos introducidos</h3>
            <v-card-text v-for="item in components" :key="item.title">
              <h3 style="display: inline">{{ item.title + ": " }}</h3>
              {{ item.data }}
            </v-card-text>
            <div style="padding: 6px">
              <v-btn
                color="bar"
                dark
                @click="goBack"
                v-if="mostrarForm"
                class="mr-12"
                >Atrás</v-btn
              >

              <!--Enviar informacion de la solicitud-->
              <v-btn v-if="mostrarForm" @click="send" color="red" dark
                >Enviar Solicitud</v-btn
              >
            </div>
          </v-col>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>
  
  <script>
export default {
  data() {
    return {
      valid: false,
      metaUser: { userName: "", name_rol: "", componentes: [] },
      mostrarForm: false,
      formsend: false,
      titulo: "",
      components: [],
      campoNoVacioRule: (v) => !!v || "Este campo es obligatorio",
    };
  },
  methods: {
    goBack() {
      if (this.formsend) {
        this.formsend = false;
        this.mostrarForm = true;
      } else if (this.mostrarForm) {
        this.mostrarForm = false;
      }
    },
    getFormTemplate(rutaFormulario) {
      return this.$http
        .get(`http://127.0.0.1:27000/meta${rutaFormulario}`)
        .then((response) => {
          console.log(response);
          this.mostrarForm = true;
          this.metaUser.name_rol = response.data.rol;
          this.components = response.data.components;
          //Aqui se llama al metodo de autocompletar pero todavia no existe el endpoint
          //this.autocompletar(rutaFormulario);
          if (rutaFormulario == "/plantilla/gestor") {
            this.titulo = "Solicitud de Gestor";
          } else if (rutaFormulario == "/plantilla/donante") {
            this.titulo = "Solicitud de Donante";
          } else if (rutaFormulario == "/plantilla/solicitante") {
            this.titulo = "Solicitud de Donación";
          }
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    },
    autocompletar(rutaFormulario){
      this.$http.get(`http://127.0.0.1:27000/metauser/ultimoFormulario${rutaFormulario}`)//esto habre q cambiarlo
      .then((response) => {
        const componentsOld =response.data.components  //esto habra q cambiarlo
        for(let comp in this.components){
          const found= componentsOld.find((elemnt)=>{
            return elemnt.title === comp.title
          });
          if (found){
            comp.data = found.data;
          }
        }
      }).catch((error) => {
          console.error(error);
      });
    },
    comprobar() {
      if (this.components.every((component) => component.data != "")) {
        this.metaUser.componentes = this.components;
        this.metaUser.userName = this.$store.getters.getUserData.userName;
        this.formsend = true;
      } else {
        confirm("Debe Rellenar Todos los campos de la solicitud");
      }
    },
    send() {
      this.$http
        .post("http://127.0.0.1:27000/metauser/create", this.metaUser)
        .then(
          (response) => {
            if (response.status == 200) {
              //mensaje de felicitacion general y para la pantalla de inicio o de solicitudes
              this.$router.push({ name: "main" });
            }
            console.log(response);
          },
          (error) => {
            console.log(this.metaUser);
            console.log(error);
          }
        );
    },
  },
};
</script>
  
  <style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  gap: 20px;
}

.background-container {
  background-image: url("../assets/back1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
  height: 100%;
  min-height: calc(100vh - 64px);
}

.fill-container {
  height: 100%;
  min-height: calc(100vh - 64px);
  width: 100vw;
}

.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>