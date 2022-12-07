//vitesse des personnages
let vitesse = 5 / 60

let listRestos = [
    {name: "restoA", x: 48.8588, y: 2.3490},
    {name: "restoB", x: 48.8558, y: 2.3470},
    {name: "restoC", x: 48.8568, y: 2.3390},
    {name: "restoD", x: 48.8608, y: 2.3570},
    {name: "restoE", x: 48.8628, y: 2.3550}
];

let persos = [
    {resto: listRestos[1], color: 'blue', name: 'A', x: 48.8588, y: 2.3570},
    {resto: listRestos[2], color: 'green', name: 'B', x: 48.8638, y: 2.3500},
    {resto: listRestos[4], color: 'yellow', name: 'C', x: 48.8618, y: 2.3410},
];

//Lieu de rencontre
let lieuRencontre = {x: 30, y: 29}
let hRencontre = 13
let mRencontre = 30
//on travail en minute donc transformation de l'heure
let heureRencontre = hRencontre*60 + mRencontre

//TABLEAUX contenant les informations finaux
//tableau pour le déplacement en temps réel minute par minute
let results = []
//tableau pour avoir une estimation
let estimation = []

//Init des var
let distanceAB
let vecteur
let temps = 1
//fonction principal pour l'estimation du temps
function position(A, B) {
    temps = 1 //commenter la ligne si action est call
    distanceAB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
    vecteur = {x: B.x - A.x, y: B.y - A.y}
    if(temps === 1){
        temps = distanceAB / vitesse *100
        estimation.push([A.name, temps ])
        /*console.log(distanceAB * 100)*/
    } else{
        temps = distanceAB / vitesse
    }
}


//TRAVAIL SUR LE DEPLACEMENT EN TEMPS REEL
let i = 1
let boucle = 1

// A personne; B lieu
function action(A, resto) {
    console.log(A)
    temps = 1
    let B = {x: resto.x, y: resto.y}
    i = 1
    boucle = 1 // départ
    while (temps >= vitesse && boucle < 3) {
        position(A, B)
        //console.log(temps)
        //console.log(i + " min");
        A.x = A.x + (vecteur.x / temps * 1)
        A.y = A.y + (vecteur.y / temps * 1)
        //console.log(A)
        i++
        if (Math.round(A.x * 10) / 10 === B.x && Math.round(A.y * 10) / 10 === B.y) {
            boucle++ // arrivé au resto puis 3 et on stop
            if (boucle === 2) {
                //arrivé au resto et calcul du nouveau itinéraire vers le lieu de rencontre
                A.x = B.x
                A.y = B.y
                B.x = lieuRencontre.x
                B.y = lieuRencontre.y
                //console.log(A.name + ' est arrivé au resto')
                results.push(A.name + ' est arrivé au resto en ' + i + 'min')
            }

        }
    }
    //console.log(A.name + ' est arrivé avec ses amis')
    results.push(A.name + ' est arrivé au lieu de rendez vous en ' + Math.trunc(i/60) + 'heure et ' + i%60  + 'min')
}


// RENDU DE LA PAGE
//Action pour lancer les fonctions
for(let perso = 0; perso < persos.length; perso++){
    position(persos[perso], persos[perso].resto)
}

//results.forEach(x=> console.log(x))
//console.log du rendu de l'estimation
let heureEstimation
estimation.forEach(x=> {
    heureEstimation = heureRencontre - x[1]
    heureEstimation = Math.trunc(heureEstimation/60) + "h" + Math.trunc(heureEstimation%60)
    console.log("Pour arrivé à " + hRencontre + "h" +mRencontre + " il faudra que " + x[0] + " parte à " + heureEstimation)
})


// ------------------- Travail map front -----------------------

let map = L.map('map').setView([48.8588, 2.3470], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function displayPersoWalk(personnages, restaurants) {
    for (let i = 0; i<personnages.length; i++){
        let p = L.circle([personnages[i].x, personnages[i].y], {
            color: personnages[i].color,
            fillColor: personnages[i].color,
            fillOpacity: 0.6,
            radius: 35
        }).addTo(map);
        p.bindPopup("<b>Salut !</b><br>Je suis " + personnages[i].name);

        let persoToRestaurant = L.polygon([
            [personnages[i].x, personnages[i].y],
            [personnages[i].resto.x, personnages[i].resto.y]
        ], {
            color: 'black'
        }).addTo(map);
    }

    for (let i = 0; i<restaurants.length; i++){
        let r = L.rectangle([
            [restaurants[i].x + 0.00015, restaurants[i].y + 0.00015],
            [restaurants[i].x - 0.00015, restaurants[i].y - 0.00015]], {
            color: "#E643C8",
            fillOpacity: 0.6,
            weight: 3
        }).addTo(map);
        r.bindPopup(restaurants[i].name);
    }
}

displayPersoWalk(persos, listRestos)
