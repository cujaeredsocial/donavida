<template>
    <div>
        <div id="map" />
    </div>
</template>
<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
export default defineComponent({
    name: 'LMap',
    props:{
        markers:{
            type: Array,
            required: false,
            default: ()=>{}
        }
    },
    setup(props){
        let map = null
        
        onMounted(()=>{
            createMapLayer()
        })

        onBeforeMount(()=>{
            if(map){
                map.remove()
            }
        })

        const createMap=()=>{
            map = L.map('map')
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

            if(props.markers.length){
                setMarkers()
            }       
        
        }

        const setMarkers = ()=>{
            props.markers.map((marker)=>{
                return L.marker([mareker.latitude, marker.longitude]).addTo(map)
                .binPopup(marker.description)
            })
        }
    }
})
</script>