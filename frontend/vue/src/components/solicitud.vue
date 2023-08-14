<template>
  <v-sheet border="lg opacity-12" class="text-body-2 mx-auto" max-width="550">
    <v-container fluid>
      <v-card style="padding: 3px">
      
        <v-card-title class="justify-center"
              ><h3 style=" color: red;">
                 Solicitud {{ metaUser.rol }}
              </h3></v-card-title>
        <v-card-text>
          {{ metaUser.state }}
            <div v-for="item in metaUser.components" :key="item.id" style="display: flex;" >
              <h3 style="display: inline;">{{ item.label +": "}}</h3>
              <p style="display: inline;">{{ item.value_Introducido_por_el_usuario }}</p>
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
  
  <style scoped>
</style>
  