<template>
    <v-card style="background-color:rgb(255, 0, 0, 0.3); color:white" outlined>
      <v-card-title class="white-text">Seleccione la Ubicacion de su donacion</v-card-title>
      <v-card-text>
        <l-map :zoom="zoom" :center="center" style="height: 500px; z-index: 0;" @click="addMarker">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker v-if="marker!=null" :lat-lng="marker.latLng" :key="marker.id" >
            <l-icon :icon-url="url" :icon-size="[32,32]"></l-icon>
          </l-marker>
        </l-map>
      </v-card-text>
    </v-card>
  </template>
  
<script>
import { LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Mapa',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data(){
    return{
      marker: null,
      url: "https://iconos8.es/icon/13800/marcador",
    }
  },
  methods: {
    showLatLng(e) {
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log("Has hecho clic en el mapa en la latitud: " + lat + " y longitud: " + lng);
   },
   addMarker(event) {
    const latLng = event.latlng;
    const marker = {
      id: Date.now(),
      latLng: [latLng.lat, latLng.lng],
    };
    this.marker=marker;
    console.log(this.marker)
  },
},
  props: {
    zoom: {
      type: Number,
      default: 13
    },
    center: {
      type: Array,
      default: () => [23.135402408869524, -82.35884249210359]
    },
    latLng: {
      type: Array,
      default: () => [23.135402408869524, -82.35884249210359]
    }
  }
}
</script>


<style scoped>
#mapContainer{
    width:300 ;
    height:300;
}
</style>