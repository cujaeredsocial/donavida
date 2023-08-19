const map = L.map('map-template').setView([23.135402408869524, -82.35884249210359],13);

// const socket = io();

const tileURL='	https://tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileURL,{
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

if(!navigator.geolocation){
    console.log("Your browser dosen't support geolocation feature!");
}else{
    navigator.geolocation.getCurrentPosition(getPosition); 
}

function getPosition(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    const marker = L.marker([lat, long]).bindPopup('You are Here').addTo(map);
    // const circle = L.circle([lat,long],{radius: accuracy}).addTo(map);

    // const featureGroup = L.featureGroup([marker, circle]).addTo(map);

    console.log(lat,long,accuracy)

}

map.on('click', function(e){
    console.log(e)
    console.log(e.latlng.lat)
    console.log(e.latlng.lng)
    const secondMarker = L.marker([e.latlng.lat, e.latlng.lng]);
    secondMarker.bindPopup('Latitud:'+ e.latlng.lat + '\n'+'Longitud:'+ e.latlng.lng); 
    secondMarker.addTo(map);

    L.Routing.control({
       waypoint: [
         L.latLng(23.073898405368993, -82.38911390304567),
         L.latLng(e.latlng.lat, e.latlng.lng)
       ]
    }).on('routesfound', function(e){
        console.log(e)
        e.routes[0].coordinates.forEach(function(coord,index){
            setTimeout(()=>{
                marker.setLatLng([coord.lat,coord.lng])
            },100 * index);
        })
    }).addTo(map);
})

L.Control.geocoder().addTo(map);
L.control.locate().addTo(map);

// map.locate({enableHighAccuracy: true});
// map.on('locationfound', e=>{    
//     const coords = [e.latlng.lat, e.latlng.lng];
//     const marker = L.marker(coords);
//     marker.bindPopup('Hello there!');
//     marker.addTo(map);   
//     socket.emit('userCoordenates', e.latlng);
// });

// socket.on('newUserCoordinates', (coords) =>{
//     const marker = L.marker([coords.lat, coords.lng]);
//     marker.bindPopup('You are Here');
//     marker.addTo(map);    
// });

