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