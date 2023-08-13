<template>
    <v-app>
        <v-container fluid class="background-container fill-container">
            <h1 style="text-align: center; color: red;" v-if="!mostrarForm">Seleccione la opcion que desea realizar</h1>
            <v-row align="center" justify="center">
                <!-- Para obtenerlo segun el id de una tabla solo habria q  pasar el id del tipo de formulario q se debe en el parametro del metodo -->
                <div class="button-container" v-if="!mostrarForm">
        <v-btn color="red" dark @click="getFormTemplate('/plantilla/Gestor')" >Solicitud de Gestor</v-btn>
        <v-btn color="red" dark @click="getFormTemplate('/plantilla/Donante')">Solicitud de Donante</v-btn>
        <v-btn color="red" dark  @click="getFormTemplate('/plantilla/Solicitante')">Solicitud de Donación</v-btn>
        </div>

        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6">
              <v-btn 
              color="bar" 
              dark 
              @click="goBack" 
              v-if="mostrarForm"
              class="mr-12"
              >Atrás</v-btn>

              <v-btn
                 v-if="mostrarForm && !formsend"
                @click="comprobar" 
                color="red"
                dark
                >Siguiente</v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-card v-if="mostrarForm && !formsend" class="mx-auto my-12" width="600" max-height="900" >
            <v-col class="mx-auto" cols="12" md="10">
                <v-card-title><h3 style="text-align: center; color: red;">{{titulo}}</h3></v-card-title>
                <v-card-text>
                <v-form @submit.prevent="send" v-for="item in components" :key="item.etiqueta">
                    <div v-if="item.type==='String'">
                        <v-text-field
                        :rules="[item.regex]"
                        v-model="item.value_Introducido_por_el_usuario"
                        :label="item.label"
                        ></v-text-field>
                    </div>
                    <div v-if="item.type==='Text'">
                        <v-textarea
                        :rules="[item.regex]"
                        v-model="item.value_Introducido_por_el_usuario"
                        :label="item.label"
                        ></v-textarea>
                    </div>
                    <div v-else-if="item.type==='Boolean'">
                        <v-checkbox
                        :rules="[item.regex]"
                        v-model="item.value_Introducido_por_el_usuario"
                        :label="item.label"
                        ></v-checkbox>
                    </div>
                    <div v-else-if="typeof item.type==='Number'">
                        <v-text-field
                        :rules="[item.regex]"
                        v-model="item.value_Introducido_por_el_usuario"
                        type="number"
                        :label="item.label"
                        ></v-text-field>
                    </div>
                    <div v-else-if="item.type==='Select'">
                        <v-combobox
                        :rules="[item.regex]"
                        v-model="item.value_Introducido_por_el_usuario"
                        :items="item.value"
                        :label="item.label"
                        ></v-combobox>
                    </div>
                </v-form>
            </v-card-text>
            </v-col>
        </v-card>
        <v-card v-if="formsend" class="mx-auto my-12" width="400" max-height="900">
          <v-card-title><h2 style="text-align: center; color: red;">{{titulo}}</h2></v-card-title>
          <v-card-text v-for="item in components" :key="item.etiqueta">
           <h3 >{{ item.label}}</h3>{{ item.value_Introducido_por_el_usuario }}
          </v-card-text>
          <v-btn
           v-if="mostrarForm"
           @click="send" 
           color="red"
           dark
           >Enviar Solicitud</v-btn>
        </v-card>
    </v-row>
</v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data (){
       
        return{
            metaUser: {username:"",name_rol:"",componentes:[]},
            mostrarForm : false,
            formsend: false,
            titulo:"",
            components:[],
            campoNoVacioRule: v => !!v || 'Este campo es obligatorio',
        }
    },
    methods: {
      goBack(){
         if(this.formsend ){
          this.formsend=false;
          this.mostrarForm=true;
         }else if(this.mostrarForm){
          this.mostrarForm=false;
         }
      },
      getFormTemplate(rutaFormulario) {
        return this.$http.get(`http://127.0.0.1:27000/meta${rutaFormulario}`)
          .then(response => {
            this.mostrarForm=true;
            this.metaUser.name_rol=response.data.rol;
            this.components=response.data.components;
            if(rutaFormulario=='/plantilla/Gestor'){
              this.titulo="Solicitud de Gestor";
            }else if(rutaFormulario=='/plantilla/Donante'){
              this.titulo="Solicitud de Donante";
            }else if(rutaFormulario=='/plantilla/Solicitante'){
              this.titulo="Solicitud de Donación";
            }
            return response.data;
          })
          .catch(error => {
            console.error(error);
            return [];
          });
      },
      comprobar(){
        if(this.components.every(component => component.value_Introducido_por_el_usuario!="")){
        this.metaUser.componentes=this.components;
        this.metaUser.username=this.$store.getters.getUserData.userName;
        this.formsend=true;
      }else{
        confirm("Debe Rellenar Todos los campos de la solicitud");
      }
      },
      send(){
        this.$http.post("http://127.0.0.1:27000/metauser/create", this.metaUser).then(
        (response) => {
          if(response.status==200){
            this.$router.push({ name: "main" });
          }
          console.log(response);
        },
        (error) => {
          console.log(this.metaUser);
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

  .center-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>