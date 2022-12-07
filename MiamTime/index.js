//vitesse des personnages
let vitesse = 5 / 60

//Liste des restos
let listRestos = {
    resto1: {x: 20, y: 20},
    resto2: {x: 6, y: 29},
    resto3: {x: 14, y: 2},
    resto4: {x: 30, y: 10},
    resto5: {x: 1, y: 3}
}
// Liste des perso
let persos = [
    {resto: listRestos.resto2, color: 'blue', name: 'A', x: 20, y: 13},
    {resto: listRestos.resto3, color: 'green', name: 'B',x: 2, y: 9},
    {resto: listRestos.resto5, color: 'yellow', name: 'C',x: 4, y: 32},
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
        temps = distanceAB / vitesse
        estimation.push([A.name, temps ])
        console.log(temps)
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
