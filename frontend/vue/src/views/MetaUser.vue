<template>
    <v-app>
        <v-container fluid class="background-container fill-container">
            <h1 style="text-align: center; color: red;" v-if="!mostrarForm">Seleccione la opcion que desea realizar</h1>
            <v-row align="center" justify="center">
                <!-- Para obtenerlo segun el id de una tabla solo habria q  pasar el id del tipo de formulario q se debe en el parametro del metodo -->
                <div class="button-container" v-if="!mostrarForm">
        <v-btn color="red" dark @click="getFormTemplate('/plantilla:manager')">Solicitud de Gestor</v-btn>
        <v-btn color="red" dark @click="getFormTemplate('/plantilla:donante')">Solicitud de Donante</v-btn>
        <v-btn color="red" dark  @click="getFormTemplate('/plantilla:solicitud')">Solicitud de Donación</v-btn>
        </div>

        <v-card v-if="mostrarForm" class="mx-auto my-12" width="600" max-height="900" >
            <v-col class="mx-auto" cols="12" md="10">
                <v-card-title></v-card-title>
                <v-card-text>
                <v-form @submit.prevent="submit" v-for="item in formulario.components" :key="item.etiqueta">
                    <div v-if="item.type==='String'">
                        <v-text-field
                        :rules="[item.regex]"
                        :label="item.etiqueta"
                        ></v-text-field>
                    </div>
                    <div v-if="item.type==='Text'">
                        <v-textarea
                        :label="item.etiqueta"
                        ></v-textarea>
                    </div>
                    <div v-else-if="item.type==='Boolean'">
                        <v-checkbox
                        :label="item.etiqueta"
                        ></v-checkbox>
                    </div>
                    <div v-else-if="typeof item.type==='String'">
                        <v-text-field
                        :rules="item.regex"
                        type="number"
                        :label="item.etiqueta"
                        ></v-text-field>
                    </div>
                    <div v-else-if="item.type==='Select'">
                        <v-combobox
                        :items="item.value"
                        :label="item.etiqueta"
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
            mostrarForm : false,
            metaUser:{/* */}
        }
    },
    computed: {
      formulario() {
        // descomentar cuando se habiliten los metodos en la api
         return this.getFormTemplate(rutaFormulario);
        // return [
        //   {etiqueta:"Nombre",name:"textField",type:"String",value:"",regex:v => !!v||'Campo requerido' }
        // Agrega más elementos según tus necesidades
     // ]
      }
    },
    methods: {
      getFormTemplate(rutaFormulario) {
        return this.$http.get(`http://127.0.0.1:27000${rutaFormulario}`)
          .then(response => {
            this.mostrarForm=true;
            return response.body;
          })
          .catch(error => {
            console.error(error);
            return [];
          });
      },
      submit(){
        this.$http.post("", this.metaUser).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      }
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