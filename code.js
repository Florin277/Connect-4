const matrix = document.getElementById("matrix");
const columnNo = 7;
const lineNo = 6;
const startCheck = 7; 
const TEN = 10;
const lastPos = 67;
const PosLineAndColumns = 35;
const PosDiagonals = 24;
const player1 = "red";
const player2 = "blue";

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
            currCell.style.backgroundColor = "rgb(185, 255, 127)";
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
    if (checkWinningRowsColumnsDiagonals(1, 1, 0, 1) ||
        checkWinningRowsColumnsDiagonals(1, 1, 1, 0) ||
        checkWinningRowsColumnsDiagonals(1, 4, 1, 1) ||
        checkWinningRowsColumnsDiagonals(1, 4, 1, -1)) {
        displayWinningMessage(cellColor);
    }
}

function checkWinningRowsColumnsDiagonals(currLine, currColumn, incrementLine, incrementColumn) {
    let idemColorCell = 1;
    let nextLine = 1;
    let nextColumn = 1;
    let copyCurrColumn = currColumn;
    let realPosLineAndColumn = PosLineAndColumns + incrementColumn;
    if (currColumn > 1) {
        realPosLineAndColumn = PosDiagonals;
    }
    for (let i = 1; i <= realPosLineAndColumn; ++i) {
        let currCellColor = document.getElementById(currLine * TEN + currColumn).style.backgroundColor;
        let nextCellColor = document.getElementById((currLine + incrementLine) * TEN + currColumn + incrementColumn).style.backgroundColor;
        if(currCellColor !== "rgb(185, 255, 127)") {
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
        if (copyCurrColumn === 1) {
            if (currColumn > columnNo - incrementColumn) {
                ++nextLine;
                currLine = nextLine;
                currColumn = 1;
                idemColorCell = 1;
            } else if (currLine > lineNo - incrementLine) {
                ++nextColumn;
                currLine = 1;
                currColumn = nextColumn;
                idemColorCell = 1;
            }
        } else {
            if (incrementColumn > 0) {
                if (currColumn > columnNo - 1) {
                    currLine = 1;
                    currColumn = 4 - nextColumn;
                    ++nextColumn;
                    idemColorCell = 1;
                } else if (currLine < 1 || currLine > lineNo - 1) {
                    ++nextLine;
                    currLine = nextLine;
                    currColumn = 1;
                    idemColorCell = 1;
                }    
            } else {
                if (currColumn < 2) {
                    currLine = 1;
                    currColumn = 4 + nextColumn;
                    ++nextColumn;
                    idemColorCell = 1;
                } else if (currLine > lineNo - 1) {
                    ++nextLine;
                    currLine = nextLine;
                    currColumn = columnNo;
                    idemColorCell = 1;
                }
            }
        }   
    }
    return haveWinner;
}

function colorCellsColumn (pressPos, cellColor) {
    let cellId = parseInt(pressPos);
    let nextCellId = cellId + TEN;
    if (document.getElementById(nextCellId).style.backgroundColor !== "rgb(185, 255, 127)") {
        document.getElementById(cellId).style.backgroundColor = cellColor;
    }
    while(nextCellId <= lastPos && document.getElementById(nextCellId).style.backgroundColor === "rgb(185, 255, 127)") {
        document.getElementById(nextCellId).style.backgroundColor = cellColor;
        document.getElementById(cellId).style.backgroundColor = "rgb(185, 255, 127)";
        nextCellId += TEN;
        cellId += TEN;
    }    
}     

function displayWinningMessage(cellColor) {
    document.getElementById("Message").style.color = cellColor;
    document.getElementById("Message").innerHTML = "Winner color " + cellColor;
}