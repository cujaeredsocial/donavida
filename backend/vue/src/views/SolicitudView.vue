<template>
  <div>
    <v-row no-gutters>
      <div>
        <v-card class="pa-2" width="300" height="600" offset-md="3" tile>
          <v-card-title>Solicitudes</v-card-title>
          <v-list dense>
            <v-subheader>Solicitudes</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
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
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Solicitud 1" },
      { text: "Solicitud 2" },
      { text: "Solicitud 3" },
      { text: "Solicitud 4" },
      { text: "Solicitud 5" },
    ],
    donantes: [],
  }),
};
</script>
