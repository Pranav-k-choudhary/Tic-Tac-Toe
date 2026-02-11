//Select all boxes
let boxes = document.querySelectorAll(".box");

//Select buttons
let resetBtn = document.querySelector("#Reset-btn");
let newGameBtn = document.querySelector("#new-btn");

//Select winner message container & text
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//Select game board container (to hide/show board)
let gameContainer = document.querySelector(".container");

//Select undo button
let undoBtn = document.querySelector("#undo-btn");

let moveHistory = [];   //stores last move

//Variable to track turn
//true = O turn
//false = X turn
let turnO = true; //playerX, playerO

//2D array
//Winning combinations (idx positions)
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

//Add click event on every box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        console.log("box was clocked");
        if(turnO === true){
            //playerO, If O's turn
            box.innerText = "O";
            moveHistory.push({index: index, player: "O"}); //push O in moveHistory
            turnO = false;  //switch turn
        }
        else{
            //playerX
            box.innerText = "X";
            moveHistory.push({index: index, player: "X"});  //push X in moveHistory
            turnO = true;  //switch turn
        }
        box.disabled = true;  //Disable clicked box

        checkWinner();  //function call, Check winner after every move
    })
})

//functio for undo button --> back move last activity
const undoMove = () => {
    if(moveHistory.length === 0){
        return;   //if not any move
    }
    let lastMove = moveHistory.pop();   //pop last move from moveHistory
    let box = boxes[lastMove.index];  //store idx of present symbole who poped

    box.innerText = "";    //remove symbol
    box.disabled = false;  //box enable

    // turn change again
    turnO = (lastMove.player === "O");  //if player is "O" --> result = true , if player is "X" --> result = false
};


//Enable all boxes (used in reset) click on reset then all boxes are again active
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//Reset game function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); //hide winner message

    gameContainer.classList.remove("hide");   //show board
    resetBtn.classList.remove("hide");        //show reset button
    undoBtn.classList.remove("hide");         //show undo button
}

//Disable all boxes after winner, while we does not click reset
const disbleBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

//Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations!, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    gameContainer.classList.add("hide");   //hide board
    resetBtn.classList.add("hide");        //hide reset button
    undoBtn.classList.add("hide");         //hide undo button

    disbleBoxes();
}

//Check winner logic
const checkWinner = () => {
    for(pattern of winPatterns){
        console.log(         //line 82 - 91 -> only for understand logic on console, it's not affect any activity in our projects
            pattern[0], 
            pattern[1], 
            pattern[2]
        );
        console.log(
            boxes[pattern[0]].innerText, 
            boxes[pattern[1]].innerText, 
            boxes[pattern[2]].innerText
        );

        let position1val = boxes[pattern[0]].innerText;
        let position2val = boxes[pattern[1]].innerText;
        let position3val = boxes[pattern[2]].innerText;

        //Check if boxes are not empty
        if(position1val != "" && position2val != "" &&  position3val != ""){
            //If all three match → winner
            if(position1val === position2val &&    position2val === position3val){
            console.log("Winner", position1val);  //line helps us to understand logic on console
            showWinner(position1val);  //function call
            };
        };
    };
};

//New Game button call
newGameBtn.addEventListener("click", resetGame);

//Reset button call
resetBtn.addEventListener("click", resetGame);

//Undo btn call
undoBtn.addEventListener("click", undoMove);




