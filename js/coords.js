(function(){

	if (typeof window.S === "undefined"){
    window.S = {};
  }


  Coords = S.Coords = function(row, col) {
    this.row = row;
    this.col = col;
  }

  Coords.prototype.plus = function(otherCoord){
     var row = this.row + otherCoord.row;
     var col = this.col + otherCoord.col;
     return new Coords(row, col);
  }

  Coords.prototype.eq = function(otherCoord){
    return (this.row == otherCoord.row && this.col == otherCoord.col);
  }

  Coords.prototype.dirTo = function(otherCoord){
    deltas = [];
    deltas.push(new Coords(-1, 0));
    deltas.push(new Coords(0, 1));
    deltas.push(new Coords(1, 0));
    deltas.push(new Coords(0, -1));

    result = null;
    for(var i = 0; i < deltas.length; i++){
      var newCoord = this.plus(deltas[i]);
      if (newCoord.eq(otherCoord)){
        result = i;
        break;
      }
    }

    switch(result){
      case 0:
        return "N";
      case 1:
        return "E";
      case 2:
        return "S";
      case 3:
        return "W";
    }

    return false;
  }  

})();