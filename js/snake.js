(function(){

  Snake = S.Snake = function(dir, posArr){

    this.dir = dir;
    this.segments = posArr; // coords
    this.growthCounter = 0;
  }

  Snake.prototype.turn = function(newDir) {
    var legalMoves = {
      'N': ["W", 'E'],
      'S': ["W", 'E'],
      'E': ["N", 'S'],
      'W': ["N", 'S']
    }

    if (legalMoves[this.dir].indexOf(newDir) >= 0){
      this.dir = newDir;
    }
  }

  Snake.prototype.move = function(){
    var delta;
    switch (this.dir) {
      case "N":
        delta = new S.Coords(-1, 0);
        break;
      case "E":
        delta = new S.Coords(0, 1);
        break;
      case "S":
        delta = new S.Coords(1, 0);
        break;
      case "W":
        delta = new S.Coords(0, -1);
        break;
    }

    var newHead = this.segments[0].plus(delta)
    if (this.growthCounter === 0) {
      this.segments.pop();
    } else {
      this.growthCounter--;
    }

    this.segments.unshift(newHead);
  }

  Snake.prototype.isAt = function(otherCoord){

    for( var i = 0; i < this.segments.length; i++){
      if ( this.segments[i].eq(otherCoord)){
        return true;
      }
    }
    return false;
  };

  Snake.prototype.bodyIsAt = function(otherCoord){

    var snakeBody = this.segments.slice(1);

    for( var i = 0; i < snakeBody.length; i++){
      if (snakeBody[i].eq(otherCoord)){
        return true;
      }
    }
    return false;
  };

})();