<template>
  <v-sheet border="lg opacity-12" class="text-body-2 mx-auto" max-width="550">
    <v-container fluid>
      <v-card style="padding: 3px">
      
        <v-card-title class="justify-center"
              ><h3 style=" color: red;">
                 Solicitud {{ metaUser.rol }}
              </h3></v-card-title>
        <v-card-text>
          <div class="content">
            <h3 class="statusTitle">Estado:</h3>
            <p>{{ metaUser.status }}</p>

          </div>
            <div v-for="item in metaUser.components" :key="item.id" class="content" >
              <h3 >{{ item.title +": "}}</h3>
              <p >{{ item.data }}</p>
            </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>
  
  <script>
export default {
  props: {
    metaUser: {
      type: Object,
      required: true,
    },
  },
};
</script>
  
<style>
h3{
  display: inline;
}
.content{
  display: flex;
}
</style>
  