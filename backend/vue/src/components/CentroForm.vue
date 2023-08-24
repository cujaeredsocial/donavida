<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto pt-1" width="900" min-height="330">
      <!--logo de donavida-->
      <v-img
        :src="require('../assets/DonaVida-removebg.png')"
        class="my-3"
        contain
        height="60"
      />
      <v-row>
        <v-col class="ml-9" cols="12" md="3">
          <v-text-field
            label="Nombre del Centro"
            placeholder="Introduzca el nombre del Centro"
            v-model="centro.nombre"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Ubicación"
            placeholder="Introduzca la ubicación"
            v-model="centro.ubicacion"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-combobox
            label="Categoria"
            :items="categ"
            placeholder="Seleccione una categoria"
            v-model="centro.categoria"
          ></v-combobox>
        </v-col>
        <v-col class="mx-auto mt-n9" cols="12" md="11">
          <v-textarea
            label="Descripcion"
            placeholder="Introduzca una descripción"
            v-model="centro.descripcion"
            auto-grow
            rows="1"
            row-height="15"
          ></v-textarea>
        </v-col>
        <v-col>
          <v-card
            class="overflow-auto mx-auto mb-5"
            height="320"
            width="850"
            outlined
          >
            <v-card-title>Imagenes del Centro</v-card-title>
            <v-row>
              <v-col
                v-for="(foto, n) in centro.foto"
                :key="n"
                class="d-flex child-flex"
                cols="4"
              >
                <v-img
                  :src="centro.foto[n]"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                </v-img>
              </v-col>
            </v-row>

            <v-file-input
              v-model="centro.foto"
              hide-input
              multiple
              truncate-length="10"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="areFieldsEmpty()" color="red" text>Añadir Centro</v-btn>
        <v-btn v-else color="red" text>Eliminar Centro</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      centro: {
        nombre: "fbds",
        descripcion: "",
        foto: [
          /*"https://picsum.photos/id/11/500/300",
          "https://picsum.photos/id/1/500/300",
          "https://picsum.photos/id/2/500/300",
          "https://picsum.photos/id/12/500/300",
          "https://picsum.photos/id/14/500/300",
          "https://picsum.photos/id/21/500/300",
          "https://picsum.photos/id/5/500/300",
          "https://picsum.photos/id/3/500/300",*/
        ],
        ubicacion: "",
        conexionMapa: "",
        categoria: "",
      },
      categ: ["Hospital", "Banco de donación", "Policlínico", "Deambulante"],
    };
  },
  methods: {
    areFieldsEmpty() {
      let ok = true;
      let i = 0;
      const array = Object.values(this.centro);
      console.log(array);
      while (i < array.length) {
        if (array[i].length != 0) {
          ok = false;
        }
        i++;
      }
      return ok;
    },
  },
};
</script>
