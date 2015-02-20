(function(){
	  Board = S.Board = function(width, height) {
    this.grid = [];
    for(var i = 0; i < height; i++) {
      this.grid.push([]);
      for(var j = 0; j < width; j++) {
        this.grid[i].push(null);
      }
    }

    var posArr = [];
    var pos1 = new Coords(Math.floor(height/2), Math.floor(width/2));
    var pos2 = pos1.plus(new Coords(1,0));
    var pos3 = pos2.plus(new Coords(1,0));
    posArr = [pos1, pos2, pos3];

    this.numApples = 0;

    this.snake = new S.Snake("N", posArr);

    this.growthFactor = 2;
    this.apple = new S.Apple(this.randomPos(), this.growthFactor);
  };

  Board.prototype.randomPos = function(){
    var row = Math.floor(Math.random() * this.grid.length);
    var col = Math.floor(Math.random() * this.grid[0].length);
    return new S.Coords(row, col);
  };

  Board.prototype.checkCollisions = function(){
    if (this.snake.isAt(this.apple.pos)){
      this.snake.growthCounter = this.apple.growthFactor;
      this.apple.growthFactor = Math.floor(1.3 * this.apple.growthFactor);
      this.apple.pos = this.randomPos();
      this.numApples += 1;
    }

    // check if self collided
    var head = this.snake.segments[0];
    if (this.snake.bodyIsAt(head)){
      return false;
    }

    // out of bounds?
    if (this.outOfBounds(head)){
      return false;
    }

    return true;
  }

  Board.prototype.outOfBounds = function(pos){
    if (pos.row < 0 ||
        pos.row > this.grid.length - 1 ||
        pos.col < 0 ||
        pos.col > this.grid[0].length - 1 )
        {
          return true;
        }

    return false;
  };
})();