let grille = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "1", "2", " ", "3", "4", "5", "6", "7"],
  [" ", "3", "4", "5", " ", "6", "1", "8", "2"],
  [" ", " ", "1", " ", "5", "8", "2", " ", "6"],
  [" ", " ", "8", "6", " ", " ", " ", " ", "1"],
  [" ", "2", " ", " ", " ", "7", " ", "5", " "],
  [" ", " ", "3", "7", " ", "5", " ", "2", "8"],
  [" ", "8", " ", " ", "6", " ", "7", " ", " "],
  ["2", " ", "7", " ", "8", "3", "6", "1", "5"],
];

function draw(grilleToDraw) {
  for (let i = 0; i < grilleToDraw.length; i++) {
    process.stdout.write("- - - - - - - - - - - - - - - - - - -");
    console.log();
    for (let j = 0; j < grilleToDraw[i].length; j++) {
      if (j === 8) {
        process.stdout.write(" | " + grilleToDraw[i][j] + " |");
        console.log();
      } else {
        process.stdout.write(" | " + grilleToDraw[i][j]);
      }
    }
  }
  process.stdout.write(" - - - - - - - - - - - - - - - - - - -");
}

function grillFiller(grilleToFill) {
  draw(grilleToFill);
  let interval = 0;
  for (let i = 0; i < grilleToFill.length; i++) {
    if (i <= 3) {
      interval = [0, 1, 2];
    }
    if (i > 3 && i <= 6) {
      interval = [3, 4, 5];
    }
    if (i > 6) {
      interval = [6, 7, 8];
    }
    grilleToFill[i].forEach((element) => {
      if (grilleToFill[i][element] === " ") {
        // 1. Case 1 à 9
        for (let chiffre = 1; chiffre <= 9; chiffre++) {
          // 2. Vérif si pas présent sur la Ligne
          let ligneOK = verifLigne(chiffre, grilleToFill, interval);
          console.log(chiffre + " - ligne : " + ligneOK);
          //   console.log(ligneOK);
          // 3. Vérif si pas présent sur la Colonne
          let colonneOK = verifColonne(chiffre, grilleToFill, interval);
          console.log(chiffre + " - Colonne : " + colonneOK);
          //   console.log(colonneOK);
          // 4. Vérif si pas présent dans le carré
          if (ligneOK && colonneOK) {
            grilleToFill[i][element] = chiffre.toString();
          }
          //   let carreOK = verifCarre(chiffre);
        }
      }
    });
  }
  draw(grilleToFill);
}

function verifLigne(chiffre, grille, interval) {
  let verif = true;
  interval.forEach((element) => {
    if (grille[element].includes(chiffre.toString())) {
      verif = false;
    }
  });
  return verif;
}

function verifColonne(chiffre, grille, interval) {
  //   console.log("---------------------------------");
  let verif = true;
  interval.forEach((element) => {
    for (let i = 0; i < grille[element].length; i++) {
      //   console.log("element : " + grille[i][element]);
      //   console.log("chiffre : " + chiffre);
      //   console.log(grille[i][element] === chiffre.toString());
      //   console.log(chiffre);
      //   console.log(grille[i][element]);
      if (grille[i][element] === chiffre.toString()) {
        verif = false;
      }
    }
    // console.log("----------");
  });
  return verif;
}

function verifCarre(params) {}

grillFiller(grille);
