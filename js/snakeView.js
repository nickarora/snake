(function(){

  var View = S.View = function(width, height, $el){
    var that = this;

    this.width = width;
    this.height = height;

    this.$el = $el;
    this.board = new S.Board(width, height);
    this.snake = this.board.snake;
    this.apple = this.board.apple;
    this.turnFlag = false;
    this.paused = false;
    this.initBoard();

    this.bindListeners();    
    this.gameLoop = setInterval(function(){
      that.step();
    }, 100);

  };

  View.prototype.initBoard = function(){
    for(var row = 0; row < this.height; row++) {
      for(var col = 0; col < this.width; col++) {
        var $cell = $('<div class="cell" >');
        $cell.addClass('row-' + row);
        $cell.addClass('col-' + col);
        this.$el.append($cell);
      }
    }
  };

  View.prototype.drawBoard = function(){
    
    var $cell = $('.cell')

    if (this.paused) {
      var $pause = $('<div class=layer></div>')
      $cell.append($pause)
    } else {
      $cell.find('div').remove();
    }

    $cell.css('background-color', '#DFD3B6');
    $cell.css('background-image', 'none');
    
    var segments = this.snake.segments.length;
    for(var i = 0; i < segments; i++){
      var pos = this.snake.segments[i];
      if (i == 0){
        var snakeHead = '';
        switch(this.snake.dir){
          case "N":
            snakeHead = 'url(./img/snake-up.gif)';
            break;
          case "E":
            snakeHead = 'url(./img/snake-right.gif)';
            break;
          case "S":
            snakeHead = 'url(./img/snake-down.gif)';
            break;
          case "W":
            snakeHead = 'url(./img/snake-left.gif)';
            break;  
        }
        $('.row-' + pos.row + '.col-' + pos.col).css('background-image', snakeHead);
      } else if (i == segments - 1) {
        var tail = '';
        switch(pos.dirTo(this.snake.segments[i-1])){
          case "N":
            tail = 'url(./img/tail-down.gif)';
            break;
          case "E":
            tail = 'url(./img/tail-right.gif)';
            break;
          case "S":
            tail = 'url(./img/tail-up.gif)';
            break;
          case "W":
            tail = 'url(./img/tail-left.gif)';
            break;  
        }
        $('.row-' + pos.row + '.col-' + pos.col).css('background-image', tail);
      } else {

        var bef = pos.dirTo(this.snake.segments[i+1]);
        var aft = pos.dirTo(this.snake.segments[i-1]);
        var piece = ''

        if (  (bef == "S" && aft == "N") ||
              (bef == "N" && aft == "S") ||
              (bef == "E" && aft == "W") ||
              (bef == "W" && aft == "E")) {
        
          $('.row-' + pos.row + '.col-' + pos.col).css('background-color', '#A8C545');  

        } else {

          if (  (bef == "S" && aft == "E") ||
                (bef == "E" && aft == "S") ) {
            piece = 'url(./img/downright.gif)';
          }

          if (  (bef == "S" && aft == "W") ||
                (bef == "W" && aft == "S") ) {
            piece = 'url(./img/downleft.gif)';
          }

          if (  (bef == "N" && aft == "E") ||
                (bef == "E" && aft == "N") ) {
            piece = 'url(./img/upright.gif)';
          }

          if (  (bef == "N" && aft == "W") ||
                (bef == "W" && aft == "N") ) {
            piece = 'url(./img/upleft.gif)';
          }

          $('.row-' + pos.row + '.col-' + pos.col).css('background-image', piece);
        }
      }
    }

    var aPos = this.apple.pos;
    var apple = 'url(./img/apple.png)';
    $('.row-' + aPos.row + '.col-' + aPos.col).css('background-image', apple);
  };

  View.prototype.step = function(){
    if (!this.paused){
      this.resetTurnFlag();
      this.drawBoard();
      this.drawScore();
      this.snake.move();
      if (!this.board.checkCollisions()) {
        this.gameOver();
      }
    }
  };

  View.prototype.drawScore = function(){
    $('.score').text(this.board.numApples * 10);
  }
  View.prototype.resetTurnFlag = function(){
    this.turnFlag = false;
  }

  View.prototype.gameOver = function() {
    clearInterval(this.gameLoop);
    $(window).off();
    $gameover = $('.gameover')
    $('.main').append($gameover);
    $('.gameover').css('display', 'block');

    var that = this;
    this.gameOverCounter = 0;
    this.gameOverLoop = setInterval(function(){
      that.animateGameOver();
    }, 1);
  };

  View.prototype.animateGameOver = function(){
    if (this.gameOverCounter > 10) {
      clearInterval(this.gameOverLoop);
      return;
    }
    var $color = $("<div class='layer2'></div>")
    var $cell = $('.cell');
    $cell.append($color)
    this.gameOverCounter++;
    return;
  }

  View.prototype.bindListeners = function(){
    var that = this;
    $(window).keydown(function(event){
      that.handleKeyEvent(event.keyCode);
    });
  };

  View.prototype.handleKeyEvent = function(key) {

    if (key == 27){
      this.paused = this.paused ? false : true;
      this.drawBoard();
    }

    if (!this.turnFlag) {
      this.turnFlag = true;
      switch (key) {
        case 38:
          this.snake.turn('N');
          break;
        case 39:
          this.snake.turn('E');
          break;
        case 40:
          this.snake.turn('S');
          break;
        case 37:
          this.snake.turn('W');
          break;
        }
    }
  };

})();
