let persoA = { x: 20, y: 13};
let persoB = {x: 2, y: 9};
let persoC = {x: 4, y: 32};

let vitesse = 5/60

let listRestos = {
    resto1 : { x: 20, y: 20},
    resto2 : { x: 6, y: 29},
    resto3 : { x: 14, y: 2},
    resto4 : { x: 30, y: 10},
    resto5 : { x: 1, y: 3}
}

let lieuRencontre = {x: 30, y: 29}

let distanceAB
let vecteur
let temps = 1
function position(A, B){
    distanceAB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
    vecteur = { x : B.x - A.x , y : B.y - A.y}
    temps = distanceAB / vitesse
}

// A personne; B lieu
function action(A, B){
    let i = 1
    let boucle = 1
    while(temps >= vitesse && boucle <3){
        position(A, B)
        console.log(temps)
        console.log(i + " min");
        A.x = A.x + ( vecteur.x/temps * 1)
        A.y  = A.y + (vecteur.y/temps * 1)
        console.log(A)
        i++
        if(Math.round(A.x * 10)/10 === B.x && Math.round(A.y * 10)/10 === B.y){
            boucle++
            if(boucle === 2){
                A = B
                B = lieuRencontre
                console.log(' est arrivé au resto')
            }else{
                console.log(' est arrivé avec ses amis')
                return(' est arrivé en ' + i + 'min')
            }

        }
    }


}




// ACTION
//action(persoA, listRestos.resto5)
console.log(action(persoB, listRestos.resto5))
/*action(persoC, listRestos.resto3)*/




/*
V = D/T
D = VT
T = D/V
*/
