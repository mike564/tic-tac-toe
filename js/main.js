

let players = (function(){
    document.querySelector('.start-btn').addEventListener('click',storePlayerNames);
    document.querySelector('.start-btn').addEventListener('click',displayPlayerNames);
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

    function displayPlayerNames(){
        document.querySelector('.player-info.player-x h3').textContent = playerXName;
        document.querySelector('.player-info.player-o h3').textContent = playerOName;
    }
    
    function getPlayerNames(){
        return{playerXName,playerOName};
    }

    return{getPlayerNames};
})();


let GUI = (function(){
    document.querySelector('.start-btn').addEventListener('click',function(){
        toggleVisivility(document.querySelector('.start-section'));
        toggleDimming(document.querySelector('.game-section'));
        resetGUI();
    });

    document.querySelector('.reset-btn').addEventListener('click',function(){
        toggleDimming(document.querySelector('.game-section'));
        toggleVisivility(document.querySelector('.start-section'));
    });

    document.getElementById('com-check').addEventListener('change',function(){toggleVisivility(document.querySelector('.name-input-2'))});
    
    function resetGUI(){
        document.querySelector('.player-info.player-x').classList.add('green-border');
        document.querySelector('.player-info.player-o').classList.remove('green-border');
        document.querySelector('.msg-section p').textContent = "Currently " + players.getPlayerNames().playerXName+"'s turn";
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.addEventListener('click',addGreenBorder);
            spot.addEventListener('click',updateMsg);
        })
    }

    function updateMsg(){
        if(game.evaluateGame()=="Game is not yet finished"){
            if(gameBoard.getCurrentMarker()=='O'){
                document.querySelector('.msg-section p').textContent = "Currently " + players.getPlayerNames().playerXName+"'s turn";
            }
            else{
                document.querySelector('.msg-section p').textContent = "Currently " + players.getPlayerNames().playerOName+"'s turn";
            }
            
        }

        else{
            document.querySelector('.msg-section p').textContent = game.evaluateGame();
        }
        
    }

    function addGreenBorder(e){
        document.querySelector('.player-info.player-x').classList.toggle('green-border');
        document.querySelector('.player-info.player-o').classList.toggle('green-border');

        e.target.removeEventListener('click',addGreenBorder);

        setTimeout(function(){
           if(game.evaluateGame() != "Game is not yet finished"){
            document.querySelectorAll('.board div').forEach(function(spot){
                spot.removeEventListener('click',addGreenBorder);
                spot.removeEventListener('click',updateMsg);
            })
        } 
        },1);
        
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
        currentMarker = 'X'
        board = [[" "," "," "],[" "," "," "],[" "," "," "]];
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.textContent="";
            spot.addEventListener('click',mark);
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
        if(game.evaluateGame() != "Game is not yet finished"){
            disableMarking();
        }
        changeMarker();
    }

    function getBoard(){
        return board;
    }

    function disableMarking(){
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.removeEventListener('click',mark);
        })
    }

    function getCurrentMarker(){
        return currentMarker;
    }
    //gameBoard public functions. mark() must be returned in order to remove the event listner, as done in endGame()
    return{getBoard,getCurrentMarker};
})();

const game = (function(){
    let result = "Game is not yet finished";

    function checkBoard(){
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
        let evaluation = checkBoard();
        if(evaluation=="X" || evaluation=="O"){
            console.log(evaluation + " is the Winner!")
            //endGame();
            result = evaluation + " is the Winner!";
            document.querySelector('.msg-section p').textContent=result;
            return evaluation + " is the Winner!"
        }
        else if(evaluation=="Draw"){
            console.log("Game has ended in a draw")
            //endGame();
            result = "Game has ended in a draw";
            document.querySelector('.msg-section p').textContent=result;
            return "Game has ended in a draw";
        }
        else{
            console.log("Game is not yet finished")
            result = "Game is not yet finished";
            return "Game is not yet finished";
        } 
    }

    function getResult(){
        return result;
    }

    return{evaluateGame,getResult};
})();





