let persoA = {name: 'A', x: 20, y: 13};
let persoB = {name: 'B',x: 2, y: 9};
let persoC = {name: 'C',x: 4, y: 32};

let vitesse = 5 / 60

let listRestos = {
    resto1: {x: 20, y: 20},
    resto2: {x: 6, y: 29},
    resto3: {x: 14, y: 2},
    resto4: {x: 30, y: 10},
    resto5: {x: 1, y: 3}
}

let lieuRencontre = {x: 30, y: 29}
let results = []

let distanceAB
let vecteur
let temps = 1

function position(A, B) {
    distanceAB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
    vecteur = {x: B.x - A.x, y: B.y - A.y}
    temps = distanceAB / vitesse
}

let i = 1
let boucle = 1

// A personne; B lieu
function action(A, resto) {
    let B = {x: resto.x, y: resto.y}
    i = 1
    boucle = 1 // départ
    while (temps >= vitesse && boucle < 3) {
        position(A, B)
        console.log(temps)
        console.log(i + " min");
        A.x = A.x + (vecteur.x / temps * 1)
        A.y = A.y + (vecteur.y / temps * 1)
        console.log(A)
        i++
        if (Math.round(A.x * 10) / 10 === B.x && Math.round(A.y * 10) / 10 === B.y) {
            boucle++ // arrivé au resto puis 3 et on stop
            if (boucle === 2) {
                //arrivé au resto et calcul du nouveau itinéraire vers le lieu de rencontre
                A.x = B.x
                A.y = B.y
                B.x = lieuRencontre.x
                B.y = lieuRencontre.y
                console.log(A.name + ' est arrivé au resto')
                results.push(A.name + ' est arrivé au resto en ' + i + 'min')
            }

        }
    }
    console.log(A.name + ' est arrivé avec ses amis')
    results.push(A.name + ' est arrivé au lieu de rendez vous en ' + Math.trunc(i/60) + 'heure et ' + i%60  + 'min')
}
// ACTION
action(persoA, listRestos.resto5)
action(persoB, listRestos.resto5)
action(persoC, listRestos.resto1)

// console.log(results)
results.forEach(x=> console.log(x))
