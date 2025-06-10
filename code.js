const matrix = document.getElementById("matrix");
const columnNo = 7;
const lineNo = 6;
const startCheck = 7; 
const TEN = 10;
const lastPos = 67;
const player1 = "red";
const player2 = "blue";

let haveWinner;
let numberOfClicks;
creatingGameBoard();

function creatingGameBoard() {
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
            document.getElementById(currCell.id).setAttribute("onclick", "cellReceivesColor(id)");
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
    document.getElementById("Reset").setAttribute("onclick", "creatingGameBoard()");
    document.getElementById("Reset").innerHTML = "Reset";
}
let cellColor;

function cellReceivesColor(pressPos) {
    if (haveWinner === 0) {
        if (numberOfClicks % 2) {
            cellColor = player1;
        } else {
            cellColor = player2;
        }
        cellStaining(pressPos, cellColor);
        if (numberOfClicks >= startCheck) {
            checkWinner();
        }
        ++numberOfClicks;
    }
}

function checkWinner() {
    if (checkRows() || checkColumns() || checkDiagonals()) {
        printMessage(cellColor);
    }
}

function checkRows() {
    let idemColorCell = 1;
    for (let i = lineNo; i > 0 && haveWinner === 0; --i) {
        for (let j = 1; j < columnNo; ++j) {
            let currCellColor = document.getElementById(i * TEN + j).style.backgroundColor;
            let nextCellColor = document.getElementById(i * TEN + j + 1).style.backgroundColor;
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
        }
        idemColorCell = 1;
    }
    return haveWinner;
}

function checkColumns() {
    let idemColorCell = 1;
    for (let j = 1; j <= columnNo && haveWinner === 0; ++j) {
        for (let i = lineNo; i > 1; --i) {
            let currCellColor = document.getElementById(i * TEN + j).style.backgroundColor;
            let nextCellColor = document.getElementById((i - 1) * TEN + j).style.backgroundColor;
            if(currCellColor !== "rgb(185, 255, 127)") {
                if (currCellColor === nextCellColor ) {
                    ++idemColorCell;
                } else {
                    idemColorCell = 1;
                }
                if (idemColorCell === 4) {
                    haveWinner = 1;
                    break;
                }
            }
        }
        idemColorCell = 1;
    }
    return haveWinner;
}

function checkDiagonals() {
    let idemColorCell = 1;
    let idemColorCell2 = 1;
    let firstColumn = 1;
    let lastColumn = columnNo;
    for (let i = 1; i <= lineNo && haveWinner === 0; ++i) {
        let line = 3 + i;
        if (line > lineNo) {
            line = lineNo;
            ++firstColumn;
            --lastColumn;
        }
        for (let j1 = firstColumn, j2 = lastColumn; j1 < columnNo && line > 1; ++j1, --j2, --line) {
            let currCellColor1 = document.getElementById(line * TEN + j1).style.backgroundColor;
            let nextCellColor1 = document.getElementById((line - 1) * TEN + j1 + 1).style.backgroundColor;
            let currCellColor2 = document.getElementById(line * TEN + j2).style.backgroundColor;
            let nextCellColor2 = document.getElementById((line - 1) * TEN + j2 - 1).style.backgroundColor;
            if (currCellColor1 !== "rgb(185, 255, 127)") {
                if(currCellColor1 === nextCellColor1) {
                    ++idemColorCell;
                } else {
                    idemColorCell = 1;
                }
            }    
            if (currCellColor2 !== "rgb(185, 255, 127)") {
                if(currCellColor2 === nextCellColor2) {
                    ++idemColorCell2;
                } else {
                    idemColorCell2 = 1;
                }
            } 
            if (idemColorCell === 4 || idemColorCell2 === 4) {
                haveWinner = 1;
                break;
            }
        }  
        idemColorCell = 1;  
        idemColorCell2 = 1;
    }
    return haveWinner;
}

function cellStaining (pressPos, cellColor) {
    let cellId = parseInt(pressPos);
    let nextPosId = cellId + TEN;
    if (document.getElementById(nextPosId).style.backgroundColor !== "rgb(185, 255, 127)") {
        document.getElementById(cellId).style.backgroundColor = cellColor;
    }
    while(nextPosId <= lastPos && document.getElementById(nextPosId).style.backgroundColor === "rgb(185, 255, 127)") {
        document.getElementById(nextPosId).style.backgroundColor = cellColor;
        document.getElementById(cellId).style.backgroundColor = "rgb(185, 255, 127)";
        nextPosId += TEN;
        cellId += TEN;
    }  
}     

function printMessage(cellColor) {
    document.getElementById("Message").style.color = cellColor;
    document.getElementById("Message").innerHTML = "Winner color " + cellColor;
}