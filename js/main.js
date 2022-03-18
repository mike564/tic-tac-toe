




function createPlayer(){
    document.getElementById('player-one-name');
    document.getElementById('player-two-name');
    return{playerName,playerSymbol};
}



const gameBoard = (function(){

    let currentMarker = 'X';
    let board = [[" "," "," "],[" "," "," "],[" "," "," "]];
    document.querySelector('.start-btn').addEventListener('click',initializeBoard);
    
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

    function initializeBoard(){

        board = [[" "," "," "],[" "," "," "],[" "," "," "]];
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.textContent="";
        })
    }

    return{mark,getBoard};
})();

const game = (function(){
    document.querySelector('.start-btn').addEventListener('click',initializeGame);

    function initializeGame(){
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.addEventListener('click',gameBoard.mark);
            spot.addEventListener('click',declareWinner);
        })
    }

    
    function endGame(){
        document.querySelectorAll('.board div').forEach(function(spot){
            spot.removeEventListener('click',gameBoard.mark);
            spot.removeEventListener('click',declareWinner);
        })
    }

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

    function declareWinner(){
        let result = checkGame();
        if(result=="X" || result=="O"){
            console.log(result+" is the Winner!")
            endGame();
        }
        else if(result=="Draw"){
            console.log("Game has ended in a draw.")
            endGame();
        }
        else{
            console.log("Game is not finished.")
        } 
    }

})();





