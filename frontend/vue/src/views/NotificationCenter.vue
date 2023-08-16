<template>
    <div >
    <v-container fluid class="background-container fill-container">
        <h1 style="text-align: center">Centro de Notificaciones</h1>
        <br>
        <v-row justify="center">
            <v-col cols="12" sm="7"  v-for="Notifacion in Notifications" :key="Notifacion.id"  class="mb-4">
                <Notificacion :Notification="Notifacion" />
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import Notificacion from '@/components/Notificacion.vue';

export default{
    data(){
       return{
         Notifications:[
            {title:"Ha sido Aprobado como donante", informacion:"blabla",route:"main",fecha:"  2/2/12",type:"green",icon:"mdi-checkbox-marked-circle"},
            {title:"Ha sido Aprobado como donante", informacion:"blabla",route:"main",fecha:"  2/2/12",type:"red",icon: "mdi-cancel"},
            {title:"Ha sido Aprobado como donante", informacion:"blabla",route:"main",fecha:"  2/2/12",type:"gray",icon: "mdi-minus-circle"}
         ]
       }
    },
    components:{
        Notificacion,
    }
}
</script>

<style scoped> 
.background-container {
    background-image: url('../assets/back1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }  

  .fill-container {
    height: 100%;
    min-height: calc(100vh - 64px); /* Ajusta la altura según tus necesidades */
  }
</style>