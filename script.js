// A FAIRE :
// Version 2 : refacto --> partir d'un seul objet, faire tout le gamePlay à partir de cet objet et implémenter dans HTML

// Tableau principal gamePlay
let gridValue = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""]
]

// Création de la grille dans le DOM
const createGrid = (array) => {
    const gameBoard = document.getElementById("gameBoard")
    // Création des 9 grandes grilles
    for (let i = 0; i < array.length; i++) {
        const bigGridElement = document.createElement("div")
        bigGridElement.dataset.grid = i
        bigGridElement.className = "bigGrid"
        gameBoard.appendChild(bigGridElement)

        // Création des 81 petites grilles (dans les grandes grilles)
        for (let j = 0; j < array[i].length; j++) {
            const littleGridElement = document.createElement("div")
            littleGridElement.dataset.x = i
            littleGridElement.dataset.y = j
            littleGridElement.className = "littleGrid"
            bigGridElement.appendChild(littleGridElement)
        }
    }
}
createGrid(gridValue)

const gameBoard = document.getElementById("gameBoard")
let gameBoardBigGrid = document.querySelectorAll(".bigGrid")
let gameBoardlittleGrid = document.querySelectorAll(".littleGrid")
const instructionForPlayer = document.getElementById("instructionForPlayer")
const scorePlayerX = document.getElementById("scorePlayerX")
const scorePlayerO = document.getElementById("scorePlayerO")

// Tableau qui sert au gamePlay sur les 9 grandes grilles
let bigGridValue = ["", "", "", "", "", "", "", "", ""]

let player = "X"
let score = { "X": 0, "O": 0 }

// oldY contient les coordonnées de la case précédentes, afin de déterminer où doit jouer le joueur suivant. 
// Est utilisée également lors du resetGrid pour que le joueur puisse jouer n'importe où (remise en undefined)
let oldY

instructionForPlayer.textContent = `Player ${player} c'est à toi de jouer`
scorePlayerX.textContent = `Player X : ${score.X}`
scorePlayerO.textContent = `Player O : ${score.O}`

// Fonction principale des conditions de win des grilles (horizontal, vertical, diagonal)
const winIsValid = (array, player) => {
    return (array[0] === player && array[1] === player && array[2] === player) ||
        (array[3] === player && array[4] === player && array[5] === player) ||
        (array[6] === player && array[7] === player && array[8] === player) ||
        (array[0] === player && array[4] === player && array[8] === player) ||
        (array[2] === player && array[4] === player && array[6] === player) ||
        (array[0] === player && array[3] === player && array[6] === player) ||
        (array[1] === player && array[4] === player && array[7] === player) ||
        (array[2] === player && array[5] === player && array[8] === player)
}

const restartGame = () => {
    resetGrid()
    instructionForPlayer.textContent = `Player ${player} c'est à toi de jouer`
    score.X = 0
    score.O = 0
    scorePlayerX.textContent = `Player X : ${score.X}`
    scorePlayerO.textContent = `Player O : ${score.O}`
}

// Génère une nouvelle grille
const resetGrid = () => {
    // Vide les deux tableaux (gridValue et bigGridValue) + reset oldY (pour que le joueur puisse jouer n'importe où).
    for (let i = 0; i < gridValue.length; i++) {
        for (let j = 0; j < gridValue[i].length; j++) {
            gridValue[i][j] = ""
        }
    }
    bigGridValue = ["", "", "", "", "", "", "", "", ""]
    oldY = undefined

    // Supprime tous les éléments HTML, pour ensuite toute recréer avec la fonction createGrid. 
    // Nécessité ensuite de récupérer de nouveau les éléments du DOM (querySelectorAll) + remettre le addEventListener. Sans ça, le addEventListener ne fonctionne plus.
    for (const littleGrid of gameBoardlittleGrid) {
        littleGrid.remove()
    }
    for (const bigGrid of gameBoardBigGrid) {
        bigGrid.remove()
    }
    createGrid(gridValue)

    gameBoardBigGrid = document.querySelectorAll(".bigGrid")
    gameBoardlittleGrid = document.querySelectorAll(".littleGrid")

    for (let i = 0; i < gameBoardlittleGrid.length; i++) {
        gameBoardlittleGrid[i].addEventListener("click", gamePlay)
    }
}

// Affichage / MàJ du score
const scoreDisplay = (player) => {
    if (player === "X") {
        score.X += 1
        scorePlayerX.textContent = `Player X : ${score.X}`
    } else {
        score.O += 1
        scorePlayerO.textContent = `Player O : ${score.O}`
    }
}

const removeLittleGridAndDisplayLetter = (x, player) => {
    // Lorsque qu'un joueur gagne une grande grille, les petites grilles sont supprimées de la page HTML
    for (const littleGrid of gameBoardlittleGrid) {
        if (littleGrid.dataset.x === x.toString()) {
            littleGrid.remove()
        }
    }
    gameBoardBigGrid[x].textContent = player
    gameBoardBigGrid[x].dataset.win = player
    bigGridValue[x] = player
    gameBoardBigGrid[x].className = "winBigGrid"
}

// Applique du CSS (shadow) sur la grille qui doit être jouée par le joueur suivant
const boxShadowForNextPlayer = (y) => {
    gameBoard.style.boxShadow = '';
    for (const grid of gameBoardBigGrid) {
        grid.style.boxShadow = '';
    }

    if (gameBoardBigGrid[y].dataset.win !== undefined) {
        gameBoard.style.boxShadow = '#7BC6CC 0px 0px 5px 8px';
    } else {
        gameBoardBigGrid[y].style.boxShadow = '#7BC6CC 0px 0px 5px 8px';
    }
}

//Game Play global : conditions de win, instructions for next player, etc.
const gamePlay = (event) => {
    let x = parseInt(event.target.dataset.x)
    let y = parseInt(event.target.dataset.y)

    if (event.target.textContent !== "") {
        alert("Cette case a déjà été joué, recommencez !")
    } else if (x !== oldY && oldY !== undefined && gameBoardBigGrid[oldY].dataset.win == undefined) {
        alert(`Vous devez jouer dans la case n°${oldY + 1}`)
    } else {
        event.target.textContent = player
        gridValue[x][y] = player

        // Win petites grilles
        if (winIsValid(gridValue[x], player) === true) {
            alert(`Player ${player} remporte la case n°${x + 1} !`)
            removeLittleGridAndDisplayLetter(x, player)
        }

        // Win grande grille
        if (winIsValid(bigGridValue, player) === true) {
            alert(`Player ${player} a gagné !`)
            scoreDisplay(player)
            resetGrid()
            player == "X" ? player = "O" : player = "X";
            instructionForPlayer.textContent = `Player ${player} c'est à toi de jouer, tu joues où tu veux !`
            return
        }

        player == "X" ? player = "O" : player = "X";
        oldY = y
        boxShadowForNextPlayer(y)

        // Instructions for next player
        if (gameBoardBigGrid[y].dataset.win !== undefined) {
            instructionForPlayer.textContent = `Player ${player}, la case n°${y + 1} est déjà gagnée, tu joues où tu veux !`
        } else {
            instructionForPlayer.textContent = `Player ${player}, c'est à toi de jouer dans la case n°${y + 1}`
        }
    }
}

// Add Event Listener pour lancer le gamePlay à chaque click
for (let i = 0; i < gameBoardlittleGrid.length; i++) {
    gameBoardlittleGrid[i].addEventListener("click", gamePlay)
}



