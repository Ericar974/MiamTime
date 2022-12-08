// ------------------- Travail map front -----------------------

let map = L.map('map').setView([48.8588, 2.3470], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let newMarker
let p
let persoToRestaurant
let restaurantToMeet
let r
let lieu
let newMarker2
let layerGroup

function displayPersoWalk(personnages, restaurants) {
    layerGroup = L.layerGroup().addTo(map)

    for (let i = 0; i < personnages.length; i++) {

        newMarker = new L.marker([personnages[i].x, personnages[i].y], {
            draggable: true,
            autoPan: true,
            shadowSize: [0, 0]
        });
        layerGroup.addLayer(newMarker);
        newMarker.bindPopup("<b>Salut !</b><br>Moi c'est " + personnages[i].name);

        newMarker.on('dragend', function (event) {
            map.removeLayer(layerGroup)
            let marker = event.target;
            let position = marker.getLatLng();
            personnages[i].x = position.lat;
            personnages[i].y = position.lng;
            displayPersoWalk(personnages, restaurants)
            estimate()
        });

        p = L.circle([personnages[i].x, personnages[i].y], {
            color: personnages[i].color,
            fillColor: personnages[i].color,
            fillOpacity: 0.6,
            radius: 20,
        });
        layerGroup.addLayer(p);

        persoToRestaurant = L.polygon([
            [personnages[i].x, personnages[i].y],
            [personnages[i].resto.x, personnages[i].resto.y]
        ], {
            color: 'black'
        });
        layerGroup.addLayer(persoToRestaurant);

        restaurantToMeet = L.polygon([
            [personnages[i].resto.x, personnages[i].resto.y],
            [lieuRencontre.x, lieuRencontre.y]
        ], {
            color: 'red',
            opacity: 1
        }).addTo(map);
        layerGroup.addLayer(restaurantToMeet);
    }

    for (let i = 0; i < restaurants.length; i++) {
        r = L.rectangle([
            [restaurants[i].x + 0.00015, restaurants[i].y + 0.00015],
            [restaurants[i].x - 0.00015, restaurants[i].y - 0.00015]], {
            color: "#E643C8",
            fillOpacity: 0.8,
            weight: 3
        }).addTo(map);
        r.bindPopup(restaurants[i].name);
    }
    const myIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Carr%C3%A9_rouge.svg/1024px-Carr%C3%A9_rouge.svg.png',
        iconSize: [28, 28],
    });

    let newMarker2 = new L.marker([lieuRencontre.x, lieuRencontre.y], {
        icon: myIcon,
        draggable: true,
        autoPan: true,
    });
    layerGroup.addLayer(newMarker2);

    newMarker2.on('dragend', function (event) {
        map.removeLayer(layerGroup)
        let marker = event.target;
        let position = marker.getLatLng();
        lieuRencontre.x = position.lat;
        lieuRencontre.y = position.lng;
        displayPersoWalk(personnages, restaurants)
        estimate()
    });
}

displayPersoWalk(persos, listRestos)
