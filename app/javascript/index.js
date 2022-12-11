
//vitesse des personnages
let vitesse = 5 / 60

let listRestos = [
    {name: "McDO", x: 48.8588, y: 2.3490},
    {name: "KFC", x: 48.8558, y: 2.3470},
    {name: "Chinois", x: 48.8568, y: 2.3390},
    {name: "BK", x: 48.8608, y: 2.3570},
    {name: "5 Guys", x: 48.8628, y: 2.3550}
];
let array = []


//document.querySelector('#listResto p').innerHTML = array[0] + array[1] + array[2]+ array[3]

let persos = [
    {resto: listRestos[1], heure: '', color: 'blue', name: 'Armand', x: 48.8588, y: 2.3570},
    {resto: listRestos[2], heure: '', color: 'green', name: 'Canberra', x: 48.8638, y: 2.3500},
    {resto: listRestos[4], heure: '', color: 'yellow', name: 'Mathieu', x: 48.8618, y: 2.3410},
    {resto: listRestos[3], heure: '', color: 'brown', name: 'Lucas', x: 48.8605, y: 2.3410},
];

listRestos.forEach((x) => {
    document.querySelector('#listResto').appendChild(document.createElement("p")).innerText = x.name;
});
persos.forEach((x) => {
    let divFlex = document.createElement("div")
    divFlex.style.display = "flex"

    let pastille = document.createElement("div");
    pastille.className += "circle"
    pastille.style.backgroundColor = x.color;

    let name = document.createElement("p");
    name.innerText = x.name

    let room = document.querySelector('#room')

    room.appendChild(divFlex)
    divFlex.appendChild(pastille);
    divFlex.appendChild(name)
})

//afficher le perso et son resto
let persoChosen
function clickP(p){
    persos.forEach(x=>{
        if(x.name === p.innerText){
            persoChosen = x
            document.querySelectorAll('#room p').forEach(x=>{
                x.style.background = 'gray'
                x.classList.remove('selected')
            })
            p.className += 'selected'
            p.style.background = x.color
        }
    })

    listRestos.forEach(x=>{
        if(x.name === persoChosen.resto.name){
            document.querySelectorAll('#listResto p').forEach(x=>x.style.background = 'gray')
            document.querySelectorAll('#listResto p').forEach(x=>{
                if(x.innerText === persoChosen.resto.name){
                    x.style.background = 'red'
                }
            })
        }
    })
}

//change le resto du personnage
let okChangeResto = false
let persoToChange
let restoToChange
function changeResto(r){
    document.querySelectorAll('#room p').forEach(x=>{
        if(x.className === 'selected'){
            okChangeResto = true
            persoToChange = x.innerText
        }
    })
    persos.forEach(x=>{
        if(x.name === persoToChange){
            persoToChange = x
        }
    })
    if(okChangeResto){
        listRestos.forEach(x=>{
            if(x.name === r.innerText){
                restoToChange = x
            }
        })
        console.log(persoToChange)
        persoToChange.resto = restoToChange
        console.log(restoToChange)
        document.querySelectorAll('#listResto p').forEach(x=>x.style.background = 'gray')
        r.style.background = 'red'
        map.removeLayer(layerGroup)
        displayPersoWalk(persos, listRestos)
    }

}

document.querySelectorAll('#room p').forEach(x=>x.setAttribute("onclick", "clickP(this)"))
document.querySelectorAll('#listResto p').forEach(x=>x.setAttribute("onclick", "changeResto(this)"))
//Lieu de rencontre
let lieuRencontre = {x: 48.8605, y: 2.3525}
let hRencontre = 13
let mRencontre = 30
//on travail en minute donc transformation de l'heure
let heureRencontre

function newHour() {
    heureRencontre = hRencontre * 60 + mRencontre
}


//TABLEAUX contenant les informations finaux
//tableau pour le déplacement en temps réel minute par minute
let results = []
//tableau pour avoir une estimation
let estimation = []

//Init des var
let distanceAB
let distanceBC
let vecteur
let temps = 1
let tempsTotal = 1

//fonction principal pour l'estimation du temps
function position(A, B) {
    tempsTotal = 1
    temps = 1 //commenter la ligne si action est call
    distanceAB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
    distanceBC = Math.sqrt(Math.pow(lieuRencontre.x - B.x, 2) + Math.pow(lieuRencontre.y - B.y, 2))
    vecteur = {x: B.x - A.x, y: B.y - A.y}
    if (temps === 1) {
        temps = distanceAB / vitesse * 100
        tempsTotal = temps + distanceBC / vitesse * 100
        estimation.push([A.name, temps, tempsTotal])
        /*console.log(distanceAB * 100)*/
    } else {
        temps = distanceAB / vitesse
    }
}

/*
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

 */


// RENDU DE LA PAGE

function positione() {
    for (let perso = 0; perso < persos.length; perso++) {
        position(persos[perso], persos[perso].resto)
    }
}
//Action pour lancer les fonctions
//results.forEach(x=> console.log(x))
//console.log du rendu de l'estimation
let heureEstimation
let firsttry

function estimate() {
    newHour()
    estimation.length === 0 ? firsttry = true : firsttry = false
    estimation = []
    positione()

    document.querySelectorAll("#alerte h2").forEach(x => x.remove())
    document.querySelectorAll("#alerte p").forEach(x => x.remove())
    document.querySelector('#alerte').appendChild(document.createElement("h2")).innerText = 'RDV : ' + hRencontre + 'h' + (mRencontre < 10 ? '0' + mRencontre : mRencontre);
    estimation.forEach(x => {
        heureEstimation = heureRencontre - x[2]
        heureEstimation = Math.trunc(heureEstimation / 60) + "h" + (Math.trunc(heureEstimation % 60) < 10 ? "0" + Math.trunc(heureEstimation % 60) : Math.trunc(heureEstimation % 60))
        document.getElementById("alerte").appendChild(document.createElement('p')).innerText = x[0] + " doit partir a " + heureEstimation;
        persos.forEach(y=>{
            if(y.name === x[0]){
                y.heure = heureEstimation
            }
        })
    })
    firsttry ? document.querySelector('#modal').style.opacity = 0 : document.querySelector('#modal').style.opacity = 1
    setTimeout(function () {
        document.querySelector('#modal').style.opacity = 0;
    }, 1000);
    firsttry = false
}

estimate()

