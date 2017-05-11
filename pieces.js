function Piece(r, c, drawSpecs){
    this.r = r || 0;
    this.c = c || 0;
    this.x = c || 0;
    this.y = r || 0;
    this.drawSpecs = drawSpecs;
    this.visible = true;
}

Piece.prototype.draw = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, specs.sx * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
}

Piece.prototype.animate = function(){
    return true;
}

Piece.prototype.update = function(){
    
}

function StandardPieceX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

StandardPieceX.prototype = new Piece();


function StandardPieceO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

StandardPieceO.prototype = new Piece();

//------------------

function BombPieceO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.frame = 0;
}


BombPieceO.prototype = new Piece();

BombPieceO.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.frame++;
    if(this.frame > 130){
        game.deletePiece(this.r, this.c)
        game.deletePiece(this.r + 1, this.c)
        game.deletePiece(this.r - 1, this.c)
        game.deletePiece(this.r, this.c + 1)
        game.deletePiece(this.r, this.c - 1)
        return true
    }
    else if(this.frame > 120){
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 110){
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 100){
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 90){
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 80){
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 70){
         ctx.drawImage(specs.img, (specs.sx + 5) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 60){
         ctx.drawImage(specs.img, (specs.sx + 6) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 50){
         ctx.drawImage(specs.img, (specs.sx + 5) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 40){
         ctx.drawImage(specs.img, (specs.sx + 4) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 30){
         ctx.drawImage(specs.img, (specs.sx + 3) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 20){
         ctx.drawImage(specs.img, (specs.sx + 2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 10){
         ctx.drawImage(specs.img, (specs.sx + 1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false
    
}

function BombPieceX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.frame = 0;
}

BombPieceX.prototype = new Piece()

BombPieceX.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.frame++;
    if(this.frame > 130){
        game.deletePiece(this.r, this.c)
        game.deletePiece(this.r + 1, this.c)
        game.deletePiece(this.r - 1, this.c)
        game.deletePiece(this.r, this.c + 1)
        game.deletePiece(this.r, this.c - 1)
        return true
    }
    else if(this.frame > 120){
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 31 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 110){
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 30 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 100){
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 29 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 90){
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 28 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 80){
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, (this.x + 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, (this.x - 1) * 100, this.y * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y + 1) * 100, specs.dw, specs.dh);
         ctx.drawImage(specs.img, 27 * specs.scale, 0, specs.scale, specs.scale, this.x * 100, (this.y - 1) * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 70){
         ctx.drawImage(specs.img, (specs.sx + 5) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 60){
         ctx.drawImage(specs.img, (specs.sx + 6) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 50){
         ctx.drawImage(specs.img, (specs.sx + 5) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 40){
         ctx.drawImage(specs.img, (specs.sx + 4) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 30){
         ctx.drawImage(specs.img, (specs.sx + 3) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 20){
         ctx.drawImage(specs.img, (specs.sx + 2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.frame > 10){
         ctx.drawImage(specs.img, (specs.sx + 1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false
    
    
}

//------------------

function MoneySmallPieceO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

MoneySmallPieceO.prototype = new Piece();

MoneySmallPieceO.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "O"){
        game.myMoney += 2
    }
    else {
        game.enemyMoney += 2
    }
    setTimeout(function(){game.draw()},200)
}

function MoneySmallPieceX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

MoneySmallPieceX.prototype = new Piece();

MoneySmallPieceX.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "X"){
        game.myMoney += 2
    }
    else {
        game.enemyMoney += 2
    }
    setTimeout(function(){game.draw()},200)
}



//------------------

function MoneyMediumPieceO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

MoneyMediumPieceO.prototype = new Piece();

MoneyMediumPieceO.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "O"){
        game.myMoney += 5
    }
    else {
        game.enemyMoney += 5
    }
    setTimeout(function(){game.draw()},200)
}


function MoneyMediumPieceX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

MoneyMediumPieceX.prototype = new Piece()

MoneyMediumPieceX.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "X"){
        game.myMoney += 5
    }
    else {
        game.enemyMoney += 5
    }
    setTimeout(function(){game.draw()},200)
}


//------------------

function MoneyLargePieceO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}


MoneyLargePieceO.prototype = new Piece();

MoneyLargePieceO.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "O"){
        game.myMoney += 10
    }
    else {
        game.enemyMoney += 10
    }
    setTimeout(function(){game.draw()},200)
}

function MoneyLargePieceX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

MoneyLargePieceX.prototype = new Piece()

MoneyLargePieceX.prototype.update = function(){
    var specs = this.drawSpecs;
    ctx.drawImage(specs.img, 24 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    if(game.myType == "X"){
        game.myMoney += 10
    }
    else {
        game.enemyMoney += 10
    }
    setTimeout(function(){game.draw()},200)
}


//------------------

function DoubleO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.hasAlreadyGiven = false;
    this.tick = 0;
}

DoubleO.prototype = new Piece();

DoubleO.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(!this.hasAlreadyGiven && this.tick > 20){
        ctx.drawImage(specs.img, 26 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
        var rid = uuidGen()
        this.selectedPieceId = rid;
        if(game.myType = "O"){
            $("#cards" + game.myNumber).append('<div class="card' + (game.myType).toUpperCase()+ ' card" onclick="game.selectedPiece = \'' + (game.myType).toUpperCase() + '\'; game.selectedPieceId=\'' + rid + '\'" id="card' + rid + '"></div>')
        }
        this.hasAlreadyGiven = true;    
    }
    if(this.tick > 35){
        ctx.drawImage(specs.img, 25 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
        return true
    }
    return false
}

DoubleO.prototype.update = function(){
    this.tick = 0;
    this.hasAlreadyGiven = false;
}

function DoubleX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
}

DoubleX.prototype = new Piece()

DoubleX.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(!this.hasAlreadyGiven && this.tick > 20){
        ctx.drawImage(specs.img, 26 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
        var rid = uuidGen()
        this.selectedPieceId = rid;
        if(game.myType = "X"){
            $("#cards" + game.myNumber).append('<div class="card' + (game.myType).toUpperCase()+ ' card" onclick="game.selectedPiece = \'' + (game.myType).toUpperCase() + '\'; game.selectedPieceId=\'' + rid + '\'" id="card' + rid + '"></div>')
        }
        this.hasAlreadyGiven = true;    
    }
    if(this.tick > 35){
        ctx.drawImage(specs.img, 25 * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
        return true
    }
    return false
}

DoubleX.prototype.update = function(){
    this.tick = 0;
    this.hasAlreadyGiven = false;
}

//------------------

function VerticalO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.tick = 0;
}

VerticalO.prototype = new Piece();

VerticalO.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(this.tick > 100){
        for(var i = 0; i < 5; i++){
            game.deletePiece(i,this.c)
        }
        return true;
    }
    else if(this.tick > 90){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 31 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 80){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 30 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 60){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 29 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 40){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 28 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 30){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 27 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 20){
        ctx.drawImage(specs.img, (specs.sx+2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.tick > 10){
        ctx.drawImage(specs.img, (specs.sx+1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false;
}

function VerticalX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.tick = 0
}

VerticalX.prototype = new Piece()

VerticalX.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(this.tick > 100){
        for(var i = 0; i < 5; i++){
            game.deletePiece(i,this.c)
        }
        return true;
    }
    else if(this.tick > 90){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 31 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 80){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 30 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 60){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 29 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 40){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 28 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 30){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 27 * specs.scale, 2 * specs.scale, specs.scale, specs.scale, this.x * 100, i * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 20){
        ctx.drawImage(specs.img, (specs.sx+2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.tick > 10){
        ctx.drawImage(specs.img, (specs.sx+1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false;
}

//------------------

function HorizontalO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.tick = 0
}

HorizontalO.prototype = new Piece();

HorizontalO.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(this.tick > 100){
        for(var i = 0; i < 5; i++){
            game.deletePiece(this.r,i)
        }
        return true;
    }
    else if(this.tick > 90){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 31 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 80){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 30 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 60){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 29 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 40){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 28 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 30){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 27 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 20){
        ctx.drawImage(specs.img, (specs.sx+2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.tick > 10){
        ctx.drawImage(specs.img, (specs.sx+1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false;
}


function HorizontalX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.tick = 0
}

HorizontalX.prototype = new Piece()

HorizontalX.prototype.animate = function(){
    var specs = this.drawSpecs;
    this.tick++;
    if(this.tick > 100){
        for(var i = 0; i < 5; i++){
            game.deletePiece(this.r,i)
        }
        return true;
    }
    else if(this.tick > 90){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 31 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 80){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 30 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 60){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 29 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 40){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 28 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 30){
        for(var i = 0; i < 5; i++){
            ctx.drawImage(specs.img, 27 * specs.scale, 1 * specs.scale, specs.scale, specs.scale, i * 100, this.y * 100, specs.dw, specs.dh);
        }
    }
    else if(this.tick > 20){
        ctx.drawImage(specs.img, (specs.sx+2) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    else if(this.tick > 10){
        ctx.drawImage(specs.img, (specs.sx+1) * specs.scale, specs.sy * specs.scale, specs.scale, specs.scale, this.x * 100, this.y * 100, specs.dw, specs.dh);
    }
    return false;
}

//------------------

function GrabO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.visible = false;
}

GrabO.prototype = new Piece();

function GrabX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.visible = false;
}

GrabX.prototype = new Piece()

//------------------

function NetO(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.visible = false;
}

NetO.prototype = new Piece();

function NetX(r, c, drawSpecs){
    Piece.call(this, r, c, drawSpecs);
    this.visible = false;
}

NetX.prototype = new Piece()




var allPieces = ["BOMB","DOUB","HOR","MONL","MONM","MONS","VERT"]
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}