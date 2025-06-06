const matrix = document.getElementById("matrix");
const noCells = 42;
const columnNo = 7;
const startCheck = 7; 
const winnerCombiDiag = 69;
const winnerPosDiag = [
                    [1, 2, 3 ,4], [2, 3, 4, 5], [3, 4, 5, 6],
                    [4, 5, 6, 7], [8, 9, 10, 11], [9, 10, 11, 12],
                    [10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18],
                    [16, 17, 18, 19], [17, 18, 19, 20], [18, 19, 20, 21],
                    [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
                    [25, 26, 27, 28], [29, 30, 31, 32], [30, 31, 32, 33],
                    [31, 32, 33, 34], [32, 33, 34, 35], [36, 37, 38, 39],
                    [37, 38, 39, 40], [38, 39, 40, 41], [39, 40, 41, 42],
                    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
                    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
                    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
                    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
                    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40], 
                    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41], 
                    [7, 14, 21, 28], [14, 21, 28, 35], [21, 28, 35, 42],
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
    matrix.appendChild(document.createElement("br"));
    for (let i = 1; i <= noCells; ++i) {
        let currCell = matrix.appendChild(document.createElement("button"));
        currCell.style.backgroundColor = "rgb(204, 222, 47)";
        currCell.id = i;
        document.getElementById(currCell.id).setAttribute("onclick", "cellReceivesColor(id)");
        if (i % columnNo === 0) {
            matrix.appendChild(document.createElement("br"));
        }    
    }   
    matrix.appendChild(document.createElement("br"));
    let message = matrix.appendChild(document.createElement("p"));
    message.id = "Message";
    let button = matrix.appendChild(document.createElement("button"));
    button.className = "reset";
    button.id = "Reset";
    document.getElementById("Reset").setAttribute("onclick", "creatingGameBoard()");
    document.getElementById("Reset").innerHTML = "Reset";
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
    if (document.getElementById(nextPosId).style.backgroundColor !== "rgb(204, 222, 47)") {
        document.getElementById(nextPosId - columnNo).style.backgroundColor = cellColor;
    }
    while (nextPosId <= noCells && document.getElementById(nextPosId).style.backgroundColor === "rgb(204, 222, 47)") {
        document.getElementById(nextPosId).style.backgroundColor = cellColor;
        document.getElementById(nextPosId - columnNo).style.backgroundColor = "rgb(204, 222, 47)";
        nextPosId += columnNo;
    }  
}     

function checkWinner(cellColor) {
    for (let i = 0; i < winnerCombiDiag && haveWinner === 0; ++i) {
        let colorFirstCell = document.getElementById(winnerPosDiag[i][0]).style.backgroundColor;
        let colorSecondCell = document.getElementById(winnerPosDiag[i][1]).style.backgroundColor;
        let colorThirdCell = document.getElementById(winnerPosDiag[i][2]).style.backgroundColor;
        let colorFourthCell = document.getElementById(winnerPosDiag[i][3]).style.backgroundColor;
        if (colorFirstCell !== "rgb(204, 222, 47)") {
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
    document.getElementById("Message").innerHTML = " " + cellColor;
}
    