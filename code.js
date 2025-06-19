const matrix = document.getElementById("matrix");
const columnNo = 7;
const lineNo = 6;
const startCheck = 7; 
const TEN = 10;
const lastPos = 67;
const PosLineAndColumns = 35;
const PosDiagonals = 26;
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
    if (checkingColorsConsecutiveCells(1, 1, 0, 1) ||
        checkingColorsConsecutiveCells(1, 1, 1, 0) ||
        checkingColorsConsecutiveCells(1, 4, 1, 1) ||
        checkingColorsConsecutiveCells(1, 4, 1, -1)) {
        displayWinningMessage(cellColor);
    }
}

function isOutSide(line, column) {
    if (line > lineNo || line < 1 || column > columnNo || column < 1) {
        return 1;
    }
    return 0;
}

function checkingColorsConsecutiveCells(currLine, currColumn, incrementLine, incrementColumn) {
    let idemColorCell = 1;
    let copyCurrColumn = currColumn;
    let copyCurrLine = currLine;
    let realPosLineAndColumn = PosLineAndColumns + incrementColumn;
    if (currColumn > 1) {
        realPosLineAndColumn = PosDiagonals;
    }
    for (let i = 1; i <= realPosLineAndColumn; ++i) {
        let currCellColor = document.getElementById(currLine * TEN + currColumn).style.backgroundColor;
        let nextCellColor = document.getElementById((currLine + incrementLine) * TEN + currColumn + incrementColumn).style.backgroundColor;
        if(currCellColor !== colorGameBoard) {
            if (currCellColor === nextCellColor) {
                ++idemColorCell;
            } else {
                idemColorCell = 1;
            }
            if (idemColorCell === 4) {
                haveWinner = 1;
                break; 
            }
        }    
        currLine += incrementLine;
        currColumn += incrementColumn;
        if (isOutSide(currLine + incrementLine, currColumn + incrementColumn)) {
            if (incrementLine == 0 || incrementColumn == 0) {
                currLine = copyCurrLine + incrementColumn;
                currColumn = copyCurrColumn + incrementLine
                copyCurrLine = currLine;
                copyCurrColumn = currColumn;
            } else if (currColumn > columnNo - 1 || currColumn < 2) {
                currLine = 1;
                currColumn = copyCurrColumn - incrementColumn;
                copyCurrColumn = currColumn;
            } else if (currLine > lineNo - 1) {
                currLine = copyCurrLine + incrementLine;
                currColumn = copyCurrColumn;
                ++copyCurrLine;
            }
            idemColorCell = 1;
        }
    }
    return haveWinner;
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