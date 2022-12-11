let scare = [
    ['', '', '', '', 1, 2, '', 3, 4],
    ['', '', '', '', 3, 4, 5, '', 6],
    ['', '', '', 5, 6, 7, 1, 8, 2],
    ['', '', 1, '', '', 8, '', 2, ''],
    ['', 5, 8, 6, '', '', '', '', 7],
    [2, '', 6, '', '', 1, '', 5, ''],
    ['', '', 3, '', 8, '', 2, '', 7],
    [7, '', 5, '', 6, '', '', 8, 3],
    ['', 2, 8, 7, '', '', 6, 1, 5],
]
let row = [
    ['', '', '', '', '', '', '', '', ''],
    ['', 1, 2, '', 3, 4, 5, 6, 7],
    ['', 3, 4, 5, '', 6, 1, 8, 2],
    ['', '', 1, '', 5, 8, 2, '', 6],
    ['', '', 8, 6, '', '', '', '', 1],
    ['', 2, '', '', '', 7, '', 5, ''],
    ['', '', 3, 7, '', 5, '', 2, 8],
    ['', 8, '', '', 6, '', 7, '', ''],
    [2, '', 7, '', 8, 3, 6, 1, 5],
]
let col = [
    ['', '', '', '', '', '', '', '', 2],
    ['', 1, 3, '', '', 2, '', 8, ''],
    ['', 2, 4, 1, 8, '', 3, '', 7],
    ['', '', 5, '', 6, '', 7, '', ''],
    ['', 3, '', 5, '', '', '', 6, 8],
    ['', 4, 6, 8, '', 7, 5, '', 3],
    ['', 5, 1, 2, '', '', '', 7, 6],
    ['', 6, 8, '', '', 5, 2, '', 1],
    ['', 7, 2, 6, 1, '', 8, '', 5],
]

/*if(row[1] == [col[0][1], col[1][1], col[2][1], col[3][1], col[4][1], col[5][1], col[6][1], col[7][1], col[8][1]]){
    console.log("ok")
}else{
    console.log("pas ok")
    console.log(row[1])
    console.log([col[0][1], col[1][1], col[2][1], col[3][1], col[4][1], col[5][1], col[6][1], col[7][1], col[8][1]])
}*/
//grande boucle I
for (let i = 5; i < scare.length; i++) {

    //take the number that miss
    let x = 1
    let xElement = 1
    let scareElement = ''

    let rowChosen = ''
    let rowsTest = []
    let columnChosen = ''
    let columnsTest = []
    let rowToTest
    let columnToTest

    // find the number that miss
    function findX(x) {
        let scareBoucle = 1
        for (let y = 0; y < scare[i].length; y++) {
            if (x == scare[i][y]) {
                x++
                y=0
                scareBoucle = 1
            }
            if (scareBoucle != xElement && scare[i][y] == '') {
                scareBoucle ++
            }
            if(scareBoucle == xElement && scare[i][y] == ''){
                scareBoucle ++
                scareElement = y
            }
        }
        console.log('chiffre manquant en test: ' + x)
        console.log('carré: ' + i + " et son emplacement: " + scareElement)


        // select the row the test

        if (scareElement >= 0 && scareElement <= 2 && i >= 0 && i <= 2) {
            rowChosen = 1
            rowsTest.push(0, 2)
        } else if (scareElement >= 3 && scareElement <= 5 && i >= 0 && i <= 2) {
            rowChosen = 2
            rowsTest.push(0, 2)
        } else if (scareElement >= 6 && scareElement <= 8 && i >= 0 && i <= 2) {
            rowChosen = 3
            rowsTest.push(0, 2)
        } else if (scareElement >= 0 && scareElement <= 2 && i >= 3 && i <= 5) {
            rowChosen = 4
            rowsTest.push(3, 5)
        } else if (scareElement >= 3 && scareElement <= 5 && i >= 3 && i <= 5) {
            rowChosen = 5
            rowsTest.push(3, 5)
        } else if (scareElement >= 6 && scareElement <= 8 && i >= 3 && i <= 5) {
            rowChosen = 6
            rowsTest.push(3, 5)
        } else if (scareElement >= 0 && scareElement <= 2 && i >= 6 && i <= 8) {
            rowChosen = 7
            rowsTest.push(6, 8)
        } else if (scareElement >= 3 && scareElement <= 5 && i >= 6 && i <= 8) {
            rowChosen = 8
            rowsTest.push(6, 8)
        } else if (scareElement >= 6 && scareElement <= 8 && i >= 6 && i <= 8) {
            rowChosen = 9
            rowsTest.push(6, 8)
        }
        rowToTest = row[rowChosen - 1]
        console.log('ligne en test:')
        console.log(rowToTest)

        // select the column the test

        if ((i+1) % 3 == 1 && (scareElement+1) % 3 == 1) {
            columnChosen = 1
            columnsTest.push(0, 2)
        } else if ((i+1) % 3 == 1 && (scareElement+1) % 3 == 2) {
            columnChosen = 2
            columnsTest.push(0, 2)
        } else if ((i+1) % 3 == 1 && (scareElement+1) % 3 == 0) {
            columnChosen = 3
            columnsTest.push(0, 2)
        } else if ((i+1) % 3 == 2 && (scareElement+1) % 3 == 1) {
            columnChosen = 4
            columnsTest.push(3, 5)
        } else if ((i+1) % 3 == 2 && (scareElement+1) % 3 == 2) {
            columnChosen = 5
            columnsTest.push(3, 5)
        } else if ((i+1) % 3 == 2 && (scareElement+1) % 3 == 0) {
            columnChosen = 6
            columnsTest.push(3, 5)
        } else if ((i+1) % 3 == 0 && (scareElement+1) % 3 == 1) {
            columnChosen = 7
            columnsTest.push(6, 8)
        } else if ((i+1) % 3 == 0 && (scareElement+1) % 3 == 2) {
            columnChosen = 8
            columnsTest.push(6, 8)
        } else if ((i+1) % 3 == 0 && (scareElement+1) % 3 == 0) {
            columnChosen = 9
            columnsTest.push(6, 8)
        }
        columnToTest = col[columnChosen - 1]
        console.log('colone en test: ')
        console.log(columnToTest)

    }

    function tryRows() {
        let failed = false
        for (let y = rowsTest[0]; y <= rowsTest[1]; y++) {
            let elementOk = false
            for (let z = 0; z < row[y].length; z++) {
                console.log('chosen ' + rowChosen + ' y ' + y)
                if (row[y][z] == x && (rowChosen - 1) != y) {
                    elementOk = true
                }
                (rowChosen-1) == y ? elementOk = true : console.log("donothing")
            }
            if (elementOk == false) {
                failed = true
            }
        }
        if (failed == true) {
            return 'Rowsfailed'
        }else{
            return 'ok'
        }
    }

    function tryColumn(){

        let failed = false
        console.log(columnsTest[1])
        for (let y = columnsTest[0]; y <= columnsTest[1]; y++) {
            let elementOk = false

            for (let z = 0; z < col[y].length; z++) {
                if (col[y][z] == x && (columnChosen - 1) != y) {
                    elementOk = true
                }
            }
            if (elementOk == false) {
                failed = true
            }
        }
        if (failed == true) {
            return 'Columnsfailed'
        }else{
            return 'ok'
        }
    }

    function action(){
        findX(x)
        let result = [tryRows(), tryColumn()]
        console.log(result)
        if(result[0] == 'Rowsfailed' || result[1] == 'Columnsfailed' ){
            x++
            if(x >= 9 && xElement < 10){
                x = 1
                xElement++
            }
            return false
        }else{
            return true
        }
    }
    for(let y = 0; y < 20 ; y++){
        if(action() === false){
            action()
        }else{
            console.log("pret pour la suite")
            scare[i][scareElement] = x
            console.log(scare[i])
            console.log('---------------------------------')
        }
    }
    i = scare.length
}
console.log('hello')
console.log(scare[5])