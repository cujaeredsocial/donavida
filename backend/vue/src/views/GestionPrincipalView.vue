<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <v-row no-gutters>
      <div>
        <v-card class="pa-2" width="300" height="550" offset-md="3" tile>
          <v-list nav dense flat>
            <v-list-item-group>
              <v-list-item style="height:60px;">
                <v-list-item-content>
                  <v-list-item-title class="ma-2 red--text"><h3>Mostrar Usuarios</h3></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="height:60px;">
                <v-list-item-content>
                  <v-list-item-title class="ma-2 red--text"><h3>Crear Usuarios</h3></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>

    </v-row>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>

</style>