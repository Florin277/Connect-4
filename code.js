const matrix = document.getElementById("matrix");
const columnNo = 7;
const lineNo = 6;
const lastPos = 67;
const startCheck = 7; 
const TEN = 10;
const player1 = "red";
const player2 = "blue";
const colorGameBoard = "rgb(185, 255, 127)";

let haveWinner;
let numberOfClicks;
createGameBoard();

function createGameBoard() {
    numberOfClicks = 1;
    haveWinner = 0;
    while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild);
    }
    matrix.appendChild(document.createElement("br"));
    for (let i = 1; i <= lineNo; ++i) {
        for (let j = 1; j <= columnNo; ++j) {
            let currCell = matrix.appendChild(document.createElement("button"));
            currCell.id = i * TEN + j;
            currCell.style.backgroundColor = colorGameBoard;
            document.getElementById(currCell.id).setAttribute("onclick", "cellColorSetting(id)");
        }
        matrix.appendChild(document.createElement("br"));
    }  
    matrix.appendChild(document.createElement("br"));
    let message = matrix.appendChild(document.createElement("p"));
    message.id = "Message";
    matrix.appendChild(document.createElement("br"));
    let button = matrix.appendChild(document.createElement("button"));
    button.id = "Reset";
    button.className = "reset";
    document.getElementById("Reset").setAttribute("onclick", "createGameBoard()");
    document.getElementById("Reset").innerHTML = "Reset";
}
let cellColor;

function cellColorSetting(pressPos) {
    if (haveWinner === 0) {
        if (numberOfClicks % 2) {
            cellColor = player1;
        } else {
            cellColor = player2;
        }
        colorCellsColumn(pressPos, cellColor);
        if (numberOfClicks >= startCheck) {
            checkWinner();
        }
        ++numberOfClicks;
    }
}

function checkWinner() { 
    if (checkingColorsConsecutiveCells(0, 1) ||
        checkingColorsConsecutiveCells(1, 0) ||
        checkingColorsConsecutiveCells(1, 1) ||
        checkingColorsConsecutiveCells(1, -1)) {
        displayWinningMessage(cellColor);
        haveWinner = 1;
    }
}

function isInside(line, column) {
    return line <= lineNo && line >= 1 && column <= columnNo && column >= 1;
}

function checkingColorsConsecutiveCells(incrementLine, incrementColumn) {
    for (let i = 1; i <= lineNo; ++i) {
        for (let j = 1; j <= columnNo; ++j) {
            if (isInside(i + incrementLine * 3, j + incrementColumn * 3)) {
                let currCellColor = document.getElementById(i * TEN + j).style.backgroundColor;
                let next1CellColor = document.getElementById((i + incrementLine) * TEN + (j + incrementColumn)).style.backgroundColor;
                let next2CellColor = document.getElementById((i + incrementLine * 2) * TEN + (j + incrementColumn * 2)).style.backgroundColor;
                let next3CellColor = document.getElementById((i + incrementLine * 3) * TEN + (j + incrementColumn * 3)).style.backgroundColor;
                if (currCellColor !== colorGameBoard && currCellColor === next1CellColor &&
                    currCellColor === next2CellColor && currCellColor === next3CellColor) {
                    return 1;
                }
            }    
        }
    }    
    return 0;
}

function colorCellsColumn (pressPos, cellColor) {
    let cellId = parseInt(pressPos);
    let nextCellId = cellId + TEN;
    if (document.getElementById(nextCellId).style.backgroundColor !== colorGameBoard) {
        document.getElementById(cellId).style.backgroundColor = cellColor;
    }
    while(nextCellId <= lastPos && document.getElementById(nextCellId).style.backgroundColor === colorGameBoard) {
        document.getElementById(nextCellId).style.backgroundColor = cellColor;
        document.getElementById(cellId).style.backgroundColor = colorGameBoard;
        nextCellId += TEN;
        cellId += TEN;
    }    
}     

function displayWinningMessage(cellColor) {
    document.getElementById("Message").style.color = cellColor;
    document.getElementById("Message").innerHTML = "Winner color " + cellColor;
}