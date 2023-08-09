<template>
    <v-app>
        <v-container fluid class="background-container fill-container">
            <h1 style="text-align: center; color: red;" v-if="!mostrarForm">Seleccione la opcion que desea realizar</h1>
            <v-row align="center" justify="center">
                <!-- Para obtenerlo segun el id de una tabla solo habria q  pasar el id del tipo de formulario q se debe en el parametro del metodo -->
                <div class="button-container" v-if="!mostrarForm">
        <v-btn color="red" dark @click="getFormTemplate('/getFormManager')">Solicitud de Gestor</v-btn>
        <v-btn color="red" dark @click="getFormTemplate('/getFormDonante')">Solicitud de Donante</v-btn>
        <v-btn color="red" dark  @click="getFormTemplate('/getFormSolicitud')">Solicitud de Donación</v-btn>
        </div>

        <v-card v-if="mostrarForm" class="mx-auto my-12" width="600" max-height="900" >
            <v-col class="mx-auto" cols="12" md="10">
                <v-card-title></v-card-title>
                <v-card-text>
                <v-form @submit.prevent="submit" v-for="item in form" :key="item.id">
                    <div v-if="item.type==='String'">
                        <v-text-field
                        :rules="[item.regex]"
                        :label="item.title"
                        ></v-text-field>
                    </div>
                    <div v-if="item.type==='Text'">
                        <v-textarea
                        :label="item.title"
                        ></v-textarea>
                    </div>
                    <div v-else-if="item.type==='Boolean'">
                        <v-checkbox
                        :label="item.title"
                        ></v-checkbox>
                    </div>
                    <div v-else-if="item.type==='Number'">
                        <v-text-field
                        :rules="item.regex"
                        type="number"
                        :label="item.title"
                        ></v-text-field>
                    </div>
                    <div v-else-if="item.type==='Select'">
                        <v-combobox
                        :items="item.value"
                        :label="item.title"
                        ></v-combobox>
                    </div>
                </v-form>
                <v-btn
                block 
                class="mt-2" 
                color="red"
                dark
                >Submit</v-btn>
            </v-card-text>
            </v-col>
        </v-card>
    </v-row>
</v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data (){
       
        return{
            // cambia a true para visualizar el form y hacer pruebas
            mostrarForm : true,
        }
    },
    computed: {
      form() {
        // descomentar cuando se habiliten los metodos en la api
        // return this.getFormTemplate(rutaFormulario);
        return [
        { id: 1, type: 'String', title: "Nombre", value: "",regex: v => !!v },
        { id: 2, type: "Number", title: "Edad", value: 0 ,regex:[value => (value >= 18 && value <= 80) || 'La edad debe estar entre 18 y 80', v => !!v]},
        { id: 3, type: "Text", title: "Nombre", value: "" },
        { id: 4, type: "Text", title: "Nombre", value: "" },
        { id: 5, type: "Boolean", title: "Activo", value: false },
        { id: 6, type: "Select", title: "Tipo de Sangre", value: ['A','B','C'] },
        // Agrega más elementos según tus necesidades
      ]
      }
    },
    methods: {
      getFormTemplate(rutaFormulario) {
        return this.$http.get(`/ruta-al-endpoint-de-la-base-de-datos/${rutaFormulario}`)
          .then(response => {
            this.mostrarForm=true;
            return response.body;
          })
          .catch(error => {
            console.error(error);
            return [];
          });
      },
    }
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
    background-image: url('../assets/back1.png');
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
</style>