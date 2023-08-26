<template>
  <v-app>
    <v-container fluid class="background-container fill-container">
      <h1 style="text-align: center; color: red" v-if="!mostrarForm">
        Seleccione la opcion que desea realizar
      </h1>
      <v-row align="center" justify="center">
        <!-- Para obtenerlo segun el id de una tabla solo habria q  pasar el id del tipo de formulario q se debe en el parametro del metodo -->
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6"> </v-col>
          </v-row>
        </v-container>
        <!--Formulario dinamico-->
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
               
                v-model="valid"
                >
                <div  v-for="item in components"
                :key="item.title">
                <!-- Para textos normales como nombres y eso -->
                  <div v-if="item.dataType === 'String'">
                    <v-text-field
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      :label="item.title"
                    ></v-text-field>
                  </div>
                  <!-- Para textos de presentacion en cualquier caso -->
                  <div v-if="item.dataType === 'Text'">
                    <v-textarea
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      :label="item.title"
                    ></v-textarea>
                  </div>
                  <!-- Para informacion q necesite ser marcada -->
                  <div v-else-if="item.dataType === 'Boolean'">
                    <v-checkbox
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      :label="item.title"
                    ></v-checkbox>
                  </div>
                  <!-- Para numeros -->
                  <div v-else-if="item.dataType === 'Number'">
                    <v-text-field
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      type="number"
                      :label="item.title"
                    ></v-text-field>
                  </div>
                  <!-- Para informacion predefinida que necesite ser seleccionada -->
                  <div v-else-if="item.dataType === 'Select'">
                    <v-combobox
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      :items="item.values"
                      :label="item.title"
                    ></v-combobox>
                  </div>
                  <!-- Para imagenes -->
                  <div v-else-if="item.dataType === 'Image'">
                    <v-file-input
                      v-model="fotos"
                      :label="item.title"
                    ></v-file-input>
                  </div>
                  <!-- Para localizaciones las cuales vendrian predefinidas -->
                  <div v-else-if="item.dataType === 'Localization'">
                    <v-combobox
                      :rules="[
                        (v) => new RegExp(item.regex).test(v) || item.message,
                      ]"
                      v-model="item.data"
                      :items="item.values"
                      :label="item.title"
                    ></v-combobox>
                    <v-btn icon small @click="showMap">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
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

        
      
      <!-- Mapa y nuevo Formulario -->
      <div v-if="mostrarMapa">
        <v-card>
        <v-layout>
          <v-flex xs8>
            <Mapa/>
          </v-flex>
          <v-flex xs4>
            <v-card
            class="mx-auto my-12"
          >
          <v-col class="mx-auto" cols="12" md="10">
            <v-card-title>
              <h2 style="text-align: center; color:red">Introduzca los datos de la nueva ubicacion</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="send">
                <v-text-field label="Nombre"></v-text-field>
                <v-text-field label=""></v-text-field>
                <v-text-field></v-text-field>
                <v-btn id="submit" @click="showForm"></v-btn>
              </v-form>
            </v-card-text>
          </v-col>
        </v-card>
        <p wrap>Aqui puedes introducir informacion que nos ayude a identificar la ubiacion que selecciones</p>
          </v-flex>

        </v-layout>
      </v-card>
      </div>

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
  import Mapa from '@/components/LMap.vue';
export default {
  components:{
    Mapa
  },
  data() {
    return {
      fotos:[],
      valid: false,
      metaUser: { userName: "", name_rol: "", componentes: [] },
      mostrarMapa:false,
      mostrarForm: true,
      formsend: false,
      titulo: "",
      components: [],
      campoNoVacioRule: (v) => !!v || ";Este campo es obligatorio",
      location:{},
    };
  },
  created(){
    const ruta = this.$route.params.ruta;
    this.getFormTemplate(ruta);
  },

  methods: {
    showForm(){
       this.mostrarForm=true,
       this.mostrarMapa=false
    },
    showMap(){
       this.mostrarForm=false,
       this.mostrarMapa=true
    },
    goBack() {
      if (this.formsend) {
        this.formsend = false;
        this.mostrarForm = true;
      } else if (this.mostrarForm) {
        this.$router.push({ name: "main" });
      }
    },
    getFormTemplate(rutaFormulario) {
      return this.$http
        .get(`http://127.0.0.1:27000/meta/plantilla${rutaFormulario}`)
        .then((response) => {
          console.log(response);
          this.mostrarForm = true;
          this.metaUser.name_rol = response.data.rol;
          this.components = response.data.components;
          //Aqui se llama al metodo de autocompletar pero todavia no existe el endpoint
          this.autocompletar(rutaFormulario);
          if (rutaFormulario == "/gestor") {
            this.titulo = "Solicitud de Gestor";
          } else if (rutaFormulario == "/donante") {
            this.titulo = "Solicitud de Donante";
          } else if (rutaFormulario == "/solicitante") {
            this.titulo = "Solicitud de Donación";
          }
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    },
    autocompletar(rutaFormulario) {
      this.$http
        .get(
          `http://127.0.0.1:27000/metauser/request/gestor/64d632eb587b4aa984367ef4`
        ) //esto habre q cambiarlo
        .then((response) => {
    //       //esto da un error leyendo una propiedad null arregla eso Cannot read properties of null (reading 'components')
    // at VueComponent.eval (MetaUser.vue:252:1)
          const componentsOld = response.data.components;
          for (let comp of this.components) {
            const found = componentsOld.find((element) => {
              return element.title === comp.title;
            });
            if (found) {
              comp.data = found.data;
            }
          }
        })
        .catch((error) => {
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
              if(this.metaUser.name_rol=="donante"){
                //emitir un mensaje al server para q envie una notificacion
              }
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