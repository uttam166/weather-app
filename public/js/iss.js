const lat = document.getElementById('lat');
const long = document.getElementById('long');

const mymap = L.map('issMap').setView([0, 0], 1);

const mapboxAccessToken = "pk.eyJ1IjoidXR0YW0xNjYiLCJhIjoiY2tkZDE3NjNjMTNjajJybXpxNXdjeGZzbSJ9.GAuUH-nff7spTLs5U8OHHw";

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


const issIcon = L.icon({
    iconUrl: '/img/iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], {icon: issIcon} ).addTo(mymap);

getIssLocation = () => {
    fetch('/isslocation')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        return response.json();
    }).then( data => {
        // console.log(data)
        lat.textContent = data.lat.toFixed(3);
        long.textContent = data.long.toFixed(3);
        marker.setLatLng([data.lat, data.long])
        mymap.setView([data.lat, data.long], 3)
    
    }).catch((error) =>{
        console.error("There has been a problem with your fetch operation:" , error)
    })
}

setInterval(()=>{getIssLocation()}, 2000);
// getIssLocation();
