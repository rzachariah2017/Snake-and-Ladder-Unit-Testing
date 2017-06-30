var snakesAndLadders = {
  point: function (startPoint, endPoint) {
    this.start = startPoint;
    this.end = endPoint;
  },
  init: function () {

    this.snakes = [
      new this.point(41, 20),
      new this.point(87, 15),
      new this.point(56, 53),
      new this.point(33, 6),
      new this.point(49, 9)
    ];
    this.ladders = [
      new this.point(2, 37),
      new this.point(10, 32),
      new this.point(27, 46),
      new this.point(51, 68),
      new this.point(61, 79),
      new this.point(65, 84),
      new this.point(71, 91),
      new this.point(81, 100)
    ];
    this.myMap = new Map();
    this.makeMap();
  },
  startGame: function() {
    this.init();
    this.enableBtn("roll1");
    this.enableBtn("roll2");
  },
  takeTurn: function (buttonId) {
    var x = this.rollDice();
    if(buttonId == "roll1"){
      var divId = "status1";
      var diceId = "position1";
      var curPosId = "pos1";
      var prevPosId = "oldpos1";
      var winnerId = "Player 1";
      var oppBtnId = "roll2";
    }
    else {
      var divId = "status2";
      var diceId = "position2";
      var curPosId = "pos2";
      var prevPosId = "oldpos2";
      var winnerId = "Player 2";
      var oppBtnId = "roll1";
    }
    this.printMsg(x, diceId);
    var prevPos = Number(document.getElementById(curPosId).innerHTML);
    this.printMsg(prevPos, prevPosId);
    var curPos = prevPos + x;
    var returnedResult = this.findPos(curPos);
    var newPos = returnedResult.newPos;
    var posType = returnedResult.msg;
    this.printMsg(posType, divId);
    this.printMsg(newPos, curPosId);
    this.disableBtn(buttonId);
    this.enableBtn(oppBtnId);
    var winner = this.checkForWinner(newPos);
    if(winner){
      this.printMsg(winnerId, "winner");
      this.disableBtn("roll1");
      this.disableBtn("roll2");
    }
  },
  findPos: function (currPos) {
    var foundPos = this.myMap.get(currPos);
    //console.log(foundPos);
    if(foundPos) {
      if(foundPos.end > currPos){
        return {
          newPos: foundPos.end,
          msg: 'Climb up the ladder'
        }
      }
      else{
        return {
          newPos: foundPos.end,
          msg: 'A snake bit you'
        }
     }
    }
    return {
      newPos: currPos,
      msg:'no snake or ladder'
    }
   },
  printMsg: function (msg, elemId) {
    document.getElementById(elemId).innerHTML = msg;
  },
  makeMap: function () {
    for (i = 0; i < this.snakes.length; i++) {
      this.myMap.set(this.snakes[i].start, this.snakes[i]);
    }
    for (i = 0; i < this.ladders.length; i++) {
      this.myMap.set(this.ladders[i].start, this.ladders[i]);
    }
  },
  rollDice: function () {
    var x = Math.floor((Math.random() * 6) + 1);
    return x;
  },
  enableBtn: function (buttonId) {
    document.getElementById(buttonId).disabled = false;
  },
  disableBtn: function (buttonId) {
    document.getElementById(buttonId).disabled = true;
  },
  checkForWinner: function (pos) {
    if (pos >= 100) {
      return true;
    }
    return false;
  }
};

module.exports = snakesAndLadders;
