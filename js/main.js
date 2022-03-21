

let players = (function(){
    document.querySelector('.start-btn').addEventListener('click',storePlayerNames);
    document.querySelector('.start-btn').addEventListener('click',setPlayerNames);
    let playerXName;
    let playerOName;
    
    function storePlayerNames(){
        if(document.getElementById('player-one-name').value==""){
            playerXName = "Player X";
        }
        else{
            playerXName = document.getElementById('player-one-name').value;
        }   
        if(document.getElementById('com-check').checked){
            playerOName = "Computer";
        }
        else if(document.getElementById('player-two-name').value==""){
            playerOName = "Player O"
        }
        else{
            playerOName = document.getElementById('player-two-name').value;
        }
    }

    function setPlayerNames(){
        document.querySelector('.player-info.player-x h3').textContent = playerXName;
        document.querySelector('.player-info.player-o h3').textContent = playerOName;
    }
    
    function getPlayerNames(){
        return{playerXName,playerOName};
    }

    return(getPlayerNames);
})();

let displayController = (function(){
    document.querySelectorAll('.board div').forEach(function(spot){
        spot.addEventListener('click',addGreenBorder);
        spot.addEventListener('click',showMsg);
    })
    
    document.querySelector('.start-btn').addEventListener('click',function(){
        toggleVisivility(document.querySelector('.start-section'));
        toggleDimming(document.querySelector('.game-area'));
    });

    document.querySelector('.reset-btn').addEventListener('click',function(){
        toggleDimming(document.querySelector('.game-area'));
        toggleVisivility(document.querySelector('.start-section'));
        toggleVisivility(document.querySelector('.reset-btn'));
    });

    document.getElementById('com-check').addEventListener('change',function(){toggleVisivility(document.querySelector('.name-input-2'))});
    

    function showMsg(){

    }

    function addGreenBorder(e){
        console.log('hi')
        document.querySelectorAll('.player-info').forEach(function(thisNode){
            if(thisNode.classList.contains('green-border')){
                thisNode.classList.remove('green-border');
            }
            else{
                thisNode.classList.add('green-border');
            }
        })
        e.target.removeEventListener('click',addGreenBorder);
    }

    function toggleVisivility(section){
        section.classList.toggle('hidden');
    }

    function toggleDimming(section){
        section.classList.toggle('dim');
    }
})();


const gameBoard = (function(){
    let currentMarker = 'X';
    let board;
    document.querySelector('.start-btn').addEventListener('click',initializeBoard);

    function initializeBoard(){
        board = [[" "," "," "],[" "," "," "],[" "," "," "]];
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.textContent="";
            spot.addEventListener('click',mark);
            spot.addEventListener('click',game.evaluateGame);
        })
    }

    function changeMarker(){
        if(currentMarker==='X'){
            currentMarker = "O";
        }
        else{
            currentMarker = "X";
        }       
    }

    //Marks "X" or "O" on the dom and the board, and only if it hasn't been marked before
    function mark(e){
        e.target.textContent=currentMarker;
        board[e.target.dataset.row][e.target.dataset.col] = currentMarker;
        e.target.removeEventListener('click',gameBoard.mark);
        changeMarker();
    }

    function getBoard(){
        return board;
    }

    //gameBoard public functions. mark() must be returned in order to remove the event listner, as done in endGame()
    return{mark,getBoard};
})();

const game = (function(){

    function checkGame(){
        let board = gameBoard.getBoard();

        if(board[0].toString()==[board[0][0],board[0][0],board[0][0]].toString() && board[0].indexOf(" ")==-1){
            return board[0][0];
        }
        
        if(board[1].toString()==[board[1][0],board[1][0],board[1][0]].toString() && board[1].indexOf(" ")==-1){
            return board[1][0];
        }

        if(board[2].toString()==[board[2][0],board[2][0],board[2][0]].toString() && board[2].indexOf(" ")==-1){
            return board[2][0];
        }

        if([board[0][0],board[1][0],board[2][0]].toString()==[board[0][0],board[0][0],board[0][0]].toString() && [board[0][0],board[1][0],board[2][0]].indexOf(" ")==-1){
            return board[0][0];
        }

        if([board[0][1],board[1][1],board[2][1]].toString()==[board[0][1],board[0][1],board[0][1]].toString() && [board[0][1],board[1][1],board[2][1]].indexOf(" ")==-1){
            return board[0][1];
        }

        if([board[0][2],board[1][2],board[2][2]].toString()==[board[0][2],board[0][2],board[0][2]].toString() && [board[0][2],board[1][2],board[2][2]].indexOf(" ")==-1){
            return board[0][2];
        }

        if([board[0][0],board[1][1],board[2][2]].toString()==[board[1][1],board[1][1],board[1][1]].toString() && [board[0][0],board[1][1],board[2][2]].indexOf(" ")==-1){
            
            return board[1][1];
        }

        if([board[0][2],board[1][1],board[2][0]].toString()==[board[1][1],board[1][1],board[1][1]].toString() && [board[0][2],board[1][1],board[2][0]].indexOf(" ")==-1){
            return board[1][1];
        }
        
        if(board[0].indexOf(" ")==-1 && board[1].indexOf(" ")==-1 && board[2].indexOf(" ")==-1){
            return "Draw";    
        }

        return "no winner yet";
    }

    function evaluateGame(){
        let result = checkGame();
        if(result=="X" || result=="O"){
            console.log(result+" is the Winner!")
            endGame();
            return result;
        }
        else if(result=="Draw"){
            console.log("Game has ended in a draw")
            endGame();
            return result;
        }
        else{
            console.log("Game is not yet finished")
            return "Game is not yet finished";
        } 
    }

    function endGame(){
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.removeEventListener('click',gameBoard.mark);
            spot.removeEventListener('click',evaluateGame);
            document.querySelector('.reset-btn').classList.toggle('hidden');
        })
    }

    return{evaluateGame};
})();





