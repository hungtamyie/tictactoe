var canvas;
var ctx;
window.onload = loadAll;

var tileSheet;
function loadAll(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    tileSheet = new Image;
    tileSheet.onload = function(){
    }
    tileSheet.src = "tilesheet.png";
}

var game;
var amX = false;
var myName;
var enemyName;
function startGame(isX, myn, enemyn){
    document.getElementById("lobby").style.zIndex = 0;
    document.getElementById("gameLobby").style.zIndex = 0;
    document.getElementById("game").style.zIndex = 10;
    amX = isX;
    if(isX){
        document.getElementById("playerInfo1").innerHTML = myn + "<br>$1000"
        document.getElementById("playerInfo2").innerHTML = enemyn + "<br>$1000"
        document.getElementById("p2bet").disabled = true;
        document.getElementById("p2bet").type = "text";
        document.getElementById("p2bet").value = "?";
        document.getElementById("placeBet2").style.visibility = "hidden";
        document.getElementById("cards2").style.visibility = "hidden";
    }
    else {
        document.getElementById("playerInfo1").innerHTML = enemyn + "<br>$1000"
        document.getElementById("playerInfo2").innerHTML = myn + "<br>$1000"
        document.getElementById("p1bet").disabled = true;
        document.getElementById("p1bet").type = "text";
        document.getElementById("p1bet").value = "?";
        document.getElementById("placeBet1").style.visibility = "hidden";
        document.getElementById("cards1").style.visibility = "hidden";
    }
    
    myName = myn
    enemyName = enemyn
    game = new Game();
    game.draw(false);
}




function Game(){
    this.grid = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ];
    this.pieces = [];
    this.mouse = {x: 0, y: 0};
    this.myTurn = true;
    this.currentAction = "betting";
    this.haveRecievedEnemyBet = false;
    this.havePlacedBet = false
    this.myBet;
    this.enemyBet;
    this.myType = "X";
    this.enemyMoney = 100;
    this.myMoney = 100;
    this.myNumber;
    this.enemyNumber;
    this.turns = 0;
    this.animating = false;
    
    (amX)? (this.myType = "X", this.myNumber = 1, this.enemyNumber = 2) : (this.myType = "O", this.myNumber = 2, this.enemyNumber = 1)
    
    this.selectedPiece = "unknown";
    this.selectedPieceId = "unknown";
    
    canvas.addEventListener("mousemove", function(evt){
        game.mouseMoved(evt);
    });
    canvas.addEventListener("mousedown", function(evt){
        game.mouseClicked(evt);
    });
}

Game.prototype.mouseMoved = function(evt){
    if(this.currentAction === "placingPiece"){
        var rect = canvas.getBoundingClientRect();
        this.mouse.x = evt.clientX - rect.left,
        this.mouse.y = evt.clientY - rect.top
        if(this.mouse.x > 499){
            this.mouse.x = 499
        }
        if(this.mouse.y > 499){
            this.mouse.y = 499
        }
        if(!this.animating){
            this.draw(true);        
        }
    }
}

Game.prototype.mouseClicked = function(evt){
    if(this.currentAction === "placingPiece" && this.selectedPiece != "unknown" && !this.animating){
        var rect = canvas.getBoundingClientRect();
        this.mouse.x = evt.clientX - rect.left,
        this.mouse.y = evt.clientY - rect.top
        var x = (this.mouse.x - (this.mouse.x % 100)) / 100;
        var y = (this.mouse.y - (this.mouse.y % 100)) / 100;
        if(game.grid[y][x] == null){
            var piece = new createPiece(this.selectedPiece, y, x)
            this.add(piece)
            game.draw()
            $("#card"+this.selectedPieceId).remove()
            game.animate()
            
            pubnubSendMove({type:"move", intype:"place", str: this.selectedPiece, r: y, c: x})
            this.selectedPiece = "unknown"    
        }
    }
}

Game.prototype.add = function(piece){
    this.grid[piece.r][piece.c] = piece;
    this.pieces.push(piece);
}

//Calls draw on all game pieces. Draws where the cursor is as well.
Game.prototype.draw = function(showCursor){
    document.getElementById("playerInfo" + this.myNumber).innerHTML = myName + "<br>$" + this.myMoney 
    document.getElementById("playerInfo" + this.enemyNumber).innerHTML = enemyName + "<br>$" + this.enemyMoney 
    ctx.clearRect(0,0,500,500);
    for(var i = 0; i < this.pieces.length; i++){
        this.pieces[i].draw();
    }
    
    if(showCursor){
        ctx.fillStyle = "white";
        
        var x = this.mouse.x - (this.mouse.x % 100);
        var y = this.mouse.y - (this.mouse.y % 100);
        //draw vert lines
        ctx.fillRect(x,y-30,2,160);
        ctx.fillRect(x + 100,y-30,2,160);
        
        //draw horizontal
        ctx.fillRect(x-30,y,160,2);
        ctx.fillRect(x-30,y + 100, 160,2);
    }
}

//Repeatedly calls animate on all pieces until they return done.
Game.prototype.animate = function(){
    if(game.animating == false){
        this.draw()
        game.animating = true;
        function next(){
            var done = true;
            for(var i = 0; i < game.pieces.length; i++){
                if(game.pieces[i].animate() == false){
                    done = false;
                }
            }
            if(!done){
                window.requestAnimationFrame(next);
            }
            else {
                game.draw()
                game.animating = false;
            }
        }
        next()
    }
}

Game.prototype.update = function(){
    for(var i=0; i < game.pieces.length; i++){
        game.pieces[i].update()
    }
}

Game.prototype.deletePiece = function(r,c){
    if(this.grid[r] && this.grid[r][c]){
        this.grid[r][c] == null
        for(var i=0; i < this.pieces.length; i++){
            if(this.pieces[i].r == r && this.pieces[i].c == c){
                this.pieces.splice(i,1)
            }
        }
    }
}

Game.prototype.addCards = function(){
    if(game.turns % 3 != 0 || game.turns === 0){
        var rid = uuidGen()
        this.selectedPieceId = rid
        $("#cards" + this.myNumber).append('<div class="card' + (this.myType).toUpperCase()+ ' card" onclick="game.selectedPiece = \'' + (this.myType).toUpperCase() + '\'; game.selectedPieceId=\'' + rid + '\'" id="card' + rid + '"></div>')
    }
    else {
        var rand =  (this.myType).toUpperCase() + allPieces[getRandomInt(0,allPieces.length-1)]
        var rid = uuidGen()
        this.selectedPieceId = rid
        $("#cards" + this.myNumber).append('<div class="card' + rand + ' card" onclick="game.selectedPiece = \'' + rand + '\'; game.selectedPieceId=\'' + rid + '\'" id="card' + rid + '"></div>')
    }
}

Game.prototype.checkBetWinner = function(){
    document.getElementById("p" + this.myNumber + "bet").value = this.myBet
    document.getElementById("p" + this.enemyNumber + "bet").value = this.enemyBet
    this.haveRecievedEnemyBet = false
    this.havePlacedBet = false
    if(Number(this.myBet) > Number(this.enemyBet) || Number(this.myBet) === Number(this.enemyBet) && this.myType === "X"){
        this.myMoney -= this.myBet
        if($("#cards" + this.myNumber).children().length >= 3){
             document.getElementById("currentinfo").innerHTML = "You've run out of space. You have not been given a card. Sorry, it's your fault for hoarding."
             this.currentAction = "placingPiece"
            this.selectedPiece = "unknown"
        }
        else {
            document.getElementById("currentinfo").innerHTML = "You won this bet. Please play a piece."
            this.currentAction = "placingPiece"
            this.selectedPiece = "unknown"
            this.addCards()    
        }
    }
    else {
        this.enemyMoney -= this.enemyBet
        document.getElementById("currentinfo").innerHTML = "You lost this bet. Waiting for other player to place his piece."
        this.currentAction = "waitingForPlacement"    
    }
    this.myBet = 0
    this.enemyBet = 0
    game.draw()
}


Game.prototype.placeBet = function(){
    if(this.currentAction === "betting"){
        var amount = document.getElementById("p" + this.myNumber + "bet").value
        if(amount <= this.myMoney && amount >= 0){
            pubnubSendMove({type: "move", intype: "bet", amount: amount});
            document.getElementById("p" + this.myNumber + "info").innerHTML = "Bet confirmed."
            this.currentAction = "waiting"
            document.getElementById("p" + game.myNumber + "bet").disabled = true;
            this.havePlacedBet = true;
            this.myBet = Number(amount);
            if(this.havePlacedBet && this.haveRecievedEnemyBet){
                window.setTimeout(function(){game.checkBetWinner()},1000)
            }   
        }
        else {
            alert("Please enter a valid amount to bet.");
        }
    }
}

var moveReceived = function(move){
    if(move.intype == "bet"){
        document.getElementById("p" + game.enemyNumber + "info").innerHTML = "Bet confirmed."
         game.haveRecievedEnemyBet = true;
         game.enemyBet = Number(move.amount);
         if(game.havePlacedBet && game.haveRecievedEnemyBet){
               window.setTimeout(function(){game.checkBetWinner()},1000)
         }   
    }
    if(move.intype == "place"){
        var piece = new createPiece(move.str, move.r, move.c) 
        game.add(piece)
        game.draw()
        game.animate()
    }
    if(move.intype == "endTurn"){
        game.currentAction = "betting"
        document.getElementById("p" + game.myNumber + "bet").value = "0"
        document.getElementById("p" + game.enemyNumber + "bet").value = "?"
        document.getElementById("currentinfo").innerHTML = "Betting Stage (Normal Piece)"
        document.getElementById("p1info").innerHTML = "Waiting for bet..."
        document.getElementById("p2info").innerHTML = "Waiting for bet..."
        document.getElementById("p" + game.myNumber + "bet").disabled = false;
        game.update()
        game.turns--
    }
}

function endTurn(){
    if(game.currentAction == "placingPiece"){
        pubnubSendMove({type: "move", intype: "endTurn"})
        game.currentAction = "betting"
        document.getElementById("p" + game.myNumber + "bet").value = "0"
        document.getElementById("p" + game.enemyNumber + "bet").value = "?"
        document.getElementById("currentinfo").innerHTML = "Betting Stage (Normal Piece)"
        document.getElementById("p1info").innerHTML = "Waiting for bet..."
        document.getElementById("p2info").innerHTML = "Waiting for bet..."
        document.getElementById("p" + game.myNumber + "bet").disabled = false;
        game.update()
        game.turns--
    }
}



var createPiece = function(str, r, c){
    if(str === "X"){
        return new StandardPieceX(r, c, {img: tileSheet, sx: 0, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "O"){
        return new StandardPieceO(r, c,  {img: tileSheet, sx: 0, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XBOMB"){
        return new BombPieceX(r, c,  {img: tileSheet, sx: 2, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XDOUB"){
        return new DoubleX(r, c,  {img: tileSheet, sx: 25, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XGRAB"){
        return new GrabX(r, c,  {img: tileSheet, sx: 18, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XMONS"){
        return new MoneySmallPieceX(r, c,  {img: tileSheet, sx: 22, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XMONM"){
        return new MoneyMediumPieceX(r, c,  {img: tileSheet, sx: 21, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XMONL"){
        return new MoneyLargePieceX(r, c,  {img: tileSheet, sx: 23, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XNET"){
        return new NetX(r, c,  {img: tileSheet, sx: 15, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XHOR"){
        return new HorizontalX(r, c,  {img: tileSheet, sx: 9, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "XVERT"){
        return new VerticalX(r, c,  {img: tileSheet, sx: 12, sy: 1, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OBOMB"){
        return new BombPieceO(r, c,  {img: tileSheet, sx: 2, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "ODOUB"){
        return new DoubleO(r, c,  {img: tileSheet, sx: 25, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OGRAB"){
        return new GrabO(r, c,  {img: tileSheet, sx: 18, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OMONS"){
        return new MoneySmallPieceO(r, c,  {img: tileSheet, sx: 22, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OMONM"){
        return new MoneyMediumPieceO(r, c,  {img: tileSheet, sx: 21, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OMONL"){
        return new MoneyLargePieceO(r, c,  {img: tileSheet, sx: 23, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "ONET"){
        return new NetO(r, c,  {img: tileSheet, sx: 15, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OHOR"){
        return new HorizontalO(r, c,  {img: tileSheet, sx: 9, sy: 0, scale: 192, dw: 100, dh: 100})
    }
    if(str === "OVERT"){
        return new VerticalO(r, c,  {img: tileSheet, sx: 12, sy: 0, scale: 192, dw: 100, dh: 100})
    }
}

function selectPiece(type){
    
}