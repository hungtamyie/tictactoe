var myName = "unnamed"
var myUUID = uuidGen()
var inGame = false;
function promptEntered(){
    document.getElementById("promptText").innerHTML = "Uh oh! This game is broken. Please reload the page."
    myName = document.getElementById("promptInput").value;
    document.getElementById("promptInput").value = "";
    document.getElementById("prompt").style.zIndex = -1;
}

function createGame(){
    if(!inGame){
        var name;
        document.getElementById("promptText").innerHTML = "Enter game name."
        document.getElementById("promptInput").value = myName + "'s Game"
        $("#promptInput").click()
        document.getElementById("prompt").style.zIndex = 100;
        promptEntered = function(){
            document.getElementById("promptText").innerHTML = "Uh oh! This game is broken. Please reload the page."
            name = document.getElementById("promptInput").value;
            document.getElementById("promptInput").value = "";
            document.getElementById("prompt").style.zIndex = -1;
            
            pubnubCreateLobby(myUUID, name, myName)
            document.getElementById("loading").style.zIndex = 10;
            document.getElementById("lobby").style.zIndex = 0;
        }
        inGame = true;
    }
}

function joinGame(id){
    pubnubJoinGame(id);
    delete openGames[id];
    showGames();
}

function placeBet(){
    game.placeBet()
}

function checkWin(board, player){
    var win;
    for(var r = 0; r < 5; r++){
        win = true;
        for(var c = 0; c < 5; c++){
            if(board[r][c] == null || (board[r][c].win != true || board[r][c].player != player)){
                win = false;
            }
        }
        if(win == true){
            return true;
        }
    }
    for(var c = 0; c < 5; c++){
        win = true;
        for(var r = 0; r < 5; r++){
            if(board[r][c] == null || (board[r][c].win != true || board[r][c].player != player)){
                win = false;
            }
        }
        if(win == true){
            return true;
        }
    }
    win = true;
    for(var i = 0; i < 5; i++){
        if(board[i][i] == null || (board[i][i].win != true || board[i][i].player != player)){
            win = false;
        }
    }
    if(win == true){
        return true;
    }
    
    win = true;
    for(var i = 0; i < 5; i++){
        if(board[4-i][i] == null || (board[4-i][i].win != true || board[4-i][i].player != player)){
            win = false;
        }
    }
    if(win == true){
        return true;
    }
}