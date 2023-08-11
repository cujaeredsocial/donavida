<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-card>
    <v-navigation-drawer app permanent style="top: 65px; width: 350px">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Crear reporte </v-list-item-title>
          <v-list-item-subtitle>
            Seleccione una opción de reporte
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-treeview :items="items"></v-treeview>
      <v-list dense nav> </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: "Usuario :",
        children: [
          { id: 2, name: "Cantidad de Usuarios" },
          { id: 3, name: "Cantidad de registrados por hora" },
          { id: 4, name: "Cantidad de registros en el ultimo mes " },
          { id: 5, name: "Cantidad de registros en el ultimo año " },
        ],
      },
    ],
  }),
};
</script>
