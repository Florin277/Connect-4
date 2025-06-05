const matrix = document.getElementById("matrix");
const noCells = 42;
const columnNo = 7;
const lineComb = 24;
const columnComb = 21;
const startCheck = 7; 
const winnerCombiDiag = 24;
const winnerPosDiag = [
                    [22, 16, 10, 4], [29, 23, 17, 11], [23, 17, 11, 5], 
                    [36, 30, 24, 18,], [30, 24, 18, 12], [24, 18, 12, 6],
                    [37, 31, 25, 19], [31, 25, 19, 13], [25, 19, 13, 7],
                    [38, 32, 26, 20], [32, 26, 20, 14], [39, 33, 27, 21],
                    [4, 12, 20, 28], [3, 11, 19, 27], [11, 19, 27, 35],
                    [2, 10, 18, 26], [10, 18, 26, 34], [18, 26, 34, 42],
                    [1, 9, 17, 25], [9, 17, 25, 33], [17, 25, 33, 41],
                    [8, 16, 24, 32], [16, 24, 32, 40], [15, 23, 31, 39]
                ]
const playerRed = "red";
const playerBlue = "blue";

let numberOfClicks;
let haveWinne;
creatingGameBoard();

function creatingGameBoard() {
    numberOfClicks = 1;
    haveWinner = 0;
    while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild);
    }
    for (let i = 1; i <= noCells; ++i) {
        let currCell = matrix.appendChild(document.createElement("button"));
        currCell.style.backgroundColor = "white";
        currCell.id = i;
        document.getElementById(currCell.id).setAttribute("onclick", "cellReceivesColor(id)");
        document.getElementById(currCell.id).innerHTML = "*";
        if (i % columnNo === 0) {
            matrix.appendChild(document.createElement("br"));
        }    
    }   
    let button = matrix.appendChild(document.createElement("button"));
    button.id = "Reset";
    document.getElementById("Reset").setAttribute("onclick", "creatingGameBoard()");
    document.getElementById("Reset").innerHTML = "Reset";
    let message = matrix.appendChild(document.createElement("p"));
    message.id = "Message";
}
let cellColor;

function cellReceivesColor(pressCell) {
    if (numberOfClicks % 2) {
        cellColor = playerRed;
    } else {
        cellColor = playerBlue;
    }
    cellStaining(pressCell, cellColor);
    if (numberOfClicks >= startCheck) {
        checkWinner(cellColor);
    }
    ++numberOfClicks;
}

function cellStaining (pressCell, cellColor) {
    let cellId = parseInt(pressCell);
    let nextPosId = cellId + columnNo;
    if (document.getElementById(nextPosId).style.backgroundColor !== "white") {
        document.getElementById(nextPosId - columnNo).style.backgroundColor = cellColor;
    }
    while (nextPosId <= noCells && document.getElementById(nextPosId).style.backgroundColor === "white") {
        document.getElementById(nextPosId).style.backgroundColor = cellColor;
        document.getElementById(nextPosId - columnNo).style.backgroundColor = "white";
        nextPosId += columnNo;
    }  
}     

function checkWinner(cellColor) {
    let firstPos = 1;
    for (let i = 1; i <= lineComb && haveWinner === 0; ++i) {
        let colorFirstCell = document.getElementById(i + firstPos - 1).style.backgroundColor;
        let colorSecondCell = document.getElementById(i + firstPos).style.backgroundColor;
        let colorThirdCell = document.getElementById(i + firstPos + 1).style.backgroundColor;
        let colorFourthCell = document.getElementById(i + firstPos + 2).style.backgroundColor;
        if (colorFirstCell !== "white") {
            if ((colorFirstCell === colorSecondCell) && (colorFirstCell === colorThirdCell) &&
                (colorFirstCell === colorFourthCell)) {
                haveWinner = 1;
            }
        }
        if (i % 4 === 0) {
            firstPos += 3;
        }
    }   
    for (let i = 1; i <= columnComb && haveWinner === 0; ++i) {
        let colorFirstCell = document.getElementById(i).style.backgroundColor;
        let colorSecondCell = document.getElementById(i + columnNo).style.backgroundColor;
        let colorThirdCell = document.getElementById(i + columnNo * 2).style.backgroundColor;
        let colorFourthCell = document.getElementById(i + columnNo * 3).style.backgroundColor;
        if (colorFirstCell !== "white") {
            if ((colorFirstCell === colorSecondCell) && (colorFirstCell === colorThirdCell) &&
                (colorFirstCell === colorFourthCell)) {
                haveWinner = 1;
            }
        }
    } 
    for (let i = 0; i < winnerCombiDiag && haveWinner === 0; ++i) {
        let colorFirstCell = document.getElementById(winnerPosDiag[i][0]).style.backgroundColor;
        let colorSecondCell = document.getElementById(winnerPosDiag[i][1]).style.backgroundColor;
        let colorThirdCell = document.getElementById(winnerPosDiag[i][2]).style.backgroundColor;
        let colorFourthCell = document.getElementById(winnerPosDiag[i][3]).style.backgroundColor;
        if (colorFirstCell !== "white") {
            if ((colorFirstCell === colorSecondCell) && (colorFirstCell === colorThirdCell) &&
                (colorFirstCell === colorFourthCell)) {
                haveWinner = 1;
            }
        }
    } 
    if (haveWinner > 0) {
        printMessage(cellColor);
    }
}

function printMessage(cellColor) {
    document.getElementById("Message").innerHTML = "Winner player color " + cellColor;
}
    