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
        document.getElementById("playerInfo1").innerHTML = myn + "<br>$100"
        document.getElementById("playerInfo2").innerHTML = enemyn + "<br>$100"
        document.getElementById("p2bet").disabled = true;
        document.getElementById("p2bet").type = "text";
        document.getElementById("p2bet").value = "?";
        document.getElementById("placeBet2").style.visibility = "hidden";
        document.getElementById("cards2").style.visibility = "hidden";
    }
    else {
        document.getElementById("playerInfo1").innerHTML = enemyn + "<br>$100"
        document.getElementById("playerInfo2").innerHTML = myn + "<br>$100"
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
    this.enemyType = "O";
    this.enemyMoney = 100;
    this.myMoney = 100;
    this.myNumber;
    this.enemyNumber;
    this.turns = 0;
    this.animating = false;
    
    (amX)? (this.myType = "X", this.myNumber = 1, this.enemyType = "O", this.enemyNumber = 2) : (this.myType = "O", this.enemyType = "X", this.myNumber = 2, this.enemyNumber = 1)
    
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
            game.checkWinCondition()
        }
        /*else if(game.grid[y][x].visible != undefined && game.grid[y][x].type != game.myType){
            var piece = new createPiece(this.selectedPiece, y, x)
            this.pieces.push(piece)
            game.draw(0)
            game.grid[y][x].activate(piece)
        }*/
    }
}

Game.prototype.add = function(piece){
    this.grid[piece.r][piece.c] = piece;
    this.pieces.push(piece);
}

//Calls draw on all game pieces. Draws where the cursor is as well.
Game.prototype.draw = function(showCursor){
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
        this.grid[r][c] = null
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
    document.getElementById("placeBet" + game.myNumber).style.visibility = "hidden";
    this.haveRecievedEnemyBet = false
    this.havePlacedBet = false
    if(Number(this.myBet) > Number(this.enemyBet)){
        game.changeMyMoney(-1 * game.myBet)
        if($("#cards" + this.myNumber).children().length >= 3){
             document.getElementById("currentinfo").innerHTML = "You've won this bid but run out of space."
             this.currentAction = "placingPiece"
             this.selectedPiece = "unknown"
             document.getElementById("endTurn").style.visibility = "visible";
             this.currentWinner = "me"
        }
        else {
            this.currentWinner = "me"
            document.getElementById("currentinfo").innerHTML = "You won this bid. Please play a piece."
            this.currentAction = "placingPiece"
            this.selectedPiece = "unknown"
            this.addCards()    
            document.getElementById("endTurn").style.visibility = "visible";
        }
    }
    else if(Number(this.myBet) === Number(this.enemyBet)){
        document.getElementById("currentinfo").innerHTML = "This bid was a tie."
        game.currentAction = "tied"
        window.setTimeout(function(){endTurn()},1000)
    }
    else {
        game.changeEnemyMoney(-1 * game.enemyBet)
        document.getElementById("currentinfo").innerHTML = "You lost this bid. Waiting for other player to place his piece."
        this.currentAction = "waitingForPlacement"    
        this.currentWinner = "enemy"
    }
    this.myBet = 0
    this.enemyBet = 0
    game.draw()
}


Game.prototype.placeBet = function(){
    if(this.currentAction === "betting"){
        var amount = Math.floor(document.getElementById("p" + this.myNumber + "bet").value)
        if(amount <= this.myMoney && amount >= 0){
            pubnubSendMove({type: "move", intype: "bet", amount: amount});
            document.getElementById("p" + this.myNumber + "info").innerHTML = "Bet confirmed."
            this.currentAction = "waiting"
            document.getElementById("p" + game.myNumber + "bet").disabled = true;
            document.getElementById("placeBet" + game.myNumber).style.visibility = "hidden";
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

Game.prototype.changeMyMoney = function(val){
    var org = game.myMoney
    game.myMoney += val
    function iterate(){
        if(game.myMoney != org){
            document.getElementById("playerInfo" + game.myNumber).innerHTML = myName + "<br>$" + org
            document.getElementById("playerInfo" + game.myNumber).style.fontSize = "35px"
            if(org < game.myMoney){
                org += 1
            }
            if(org > game.myMoney){
                org -= 1
            }
            window.setTimeout(function(){iterate()},100)
        }
        else {
             document.getElementById("playerInfo" + game.myNumber).innerHTML = myName + "<br>$" + game.myMoney
             document.getElementById("playerInfo" + game.myNumber).style.fontSize = "25px"
        }
    }
    iterate()
}

Game.prototype.changeEnemyMoney = function(val){
    var org = game.enemyMoney
    game.enemyMoney += val
    function iterate(){
        if(game.enemyMoney != org){
            document.getElementById("playerInfo" + game.enemyNumber).innerHTML = enemyName + "<br>$" + org
            document.getElementById("playerInfo" + game.enemyNumber).style.fontSize = "35px"
            if(org < game.enemyMoney){
                org++
            }
            if(org > game.enemyMoney){
                org--
            }
            window.setTimeout(function(){iterate()},100)
        }
        else {
             document.getElementById("playerInfo" + game.enemyNumber).innerHTML = enemyName + "<br>$" + game.enemyMoney
             document.getElementById("playerInfo" + game.enemyNumber).style.fontSize = "25px"
        }
    }
    iterate()
}

var moveReceived = function(move){
    if(move.intype == "bet"){
        document.getElementById("p" + game.enemyNumber + "info").innerHTML = "Bid confirmed."
        document.getElementById("placeBet" + game.myNumber).style.visibility = "visible";
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
        game.checkWinCondition()
    }
    if(move.intype == "endTurn"){
        game.currentAction = "betting"
        game.currentWinner = "none"
        document.getElementById("endTurn").style.visibility = "hidden";
        document.getElementById("placeBet" + game.myNumber).style.visibility = "visible";
        document.getElementById("p" + game.myNumber + "bet").value = "0"
        document.getElementById("p" + game.enemyNumber + "bet").value = "?"
        if((game.turns - 1) % 3 != 0 || game.turns === 0){
            document.getElementById("currentinfo").innerHTML = "Bidding Stage (Normal Piece)"
        }
        else {
            document.getElementById("currentinfo").innerHTML = "Bidding Stage (BONUS PIECE)"
        }
        document.getElementById("p1info").innerHTML = "Waiting for bid..."
        document.getElementById("p2info").innerHTML = "Waiting for bid..."
        document.getElementById("p" + game.myNumber + "bet").disabled = false;
        game.changeMyMoney(5)
        game.changeEnemyMoney(5)
        game.update()
        game.turns--
    }
}

function endTurn(){
    if(game.currentAction == "placingPiece" || game.currentAction == "tied"){
        pubnubSendMove({type: "move", intype: "endTurn"})
        game.currentAction = "betting"
        game.currentWinner = "none"
        document.getElementById("endTurn").style.visibility = "hidden";
        document.getElementById("placeBet" + game.myNumber).style.visibility = "visible";
        document.getElementById("p" + game.myNumber + "bet").value = "0"
        document.getElementById("p" + game.enemyNumber + "bet").value = "?"
        if((game.turns - 1) % 3 != 0 || game.turns === 0){
            document.getElementById("currentinfo").innerHTML = "Bidding Stage (Normal Piece)"
        }
        else {
            document.getElementById("currentinfo").innerHTML = "Bidding Stage (BONUS PIECE)"
        }
        document.getElementById("p1info").innerHTML = "Waiting for bid..."
        document.getElementById("p2info").innerHTML = "Waiting for bid..."
        document.getElementById("p" + game.myNumber + "bet").disabled = false;
        game.changeMyMoney(5)
        game.changeEnemyMoney(5)
        game.update()
        window.setTimeout(function(){game.draw()},500)
        game.turns--
    }
}

Game.prototype.checkWinCondition = function(){
    if(checkWin(game.grid, game.myType)){
        document.getElementById("gameLobby").style.zIndex = 10;
        document.getElementById("loading").innerHTML = "You win!"
        document.getElementById("game").style.zIndex = 0;
    }
    if(checkWin(game.grid, game.enemyType)){
        document.getElementById("gameLobby").style.zIndex = 10;
        document.getElementById("loading").innerHTML = enemyName + " Wins!"
        document.getElementById("game").style.zIndex = 0;
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