var chai = require('chai');
var expect = chai.expect;
var snakesAndLadders = require('../index');
var assert = chai.assert;

describe('Snakes and Ladders', function() {
  describe('Roll Dice', function() {
    var randomNumber = snakesAndLadders.rollDice();
    it('random number is between 1 and 6',function(){
       console.log(randomNumber);
       assert.isAtMost(randomNumber, 6, 'random number is less than or equal to 6');
       assert.isAtLeast(randomNumber, 1, 'random number is greater than or equal to 1');
    });
  });
  describe('Check for winner',function(){
    before(function(){
      snakesAndLadders.init();
    });
    var testData = [
      {input:50, output:false},
      {input:100, output:true},
      {input:105, output:true},
    ];
    testData.forEach(function(value){
      it('check for winner must return true when position is greater than 100',function(){
        console.log(value);
        expect(snakesAndLadders.checkForWinner(value.input)).to.equal(value.output);
      });
    });
  });
  describe('Find Pos', function(){
    var testData = [
      {input:2, output:{newPos:37, msg:"Climb up the ladder"}},
      {input:87, output:{newPos:15, msg:"A snake bit you"}},
      {input:50, output:{newPos:50, msg:"no snake or ladder"}}
    ];
    testData.forEach(function(value){
      it('find pos must correctly identify a cell as snake, ladder or neither',function(){
        console.log(value);
        assert.deepEqual(snakesAndLadders.findPos(value.input),value.output);
      });
    });
  });
  describe('DOM Tests', function(){
  	beforeEach(function(){
  			var fixture = '<div id="fixture"><button id="start" onclick="snakesAndLadders.startGame()">Start Game</button></div>';
  			//var fixture = __html__[*.html];
  			document.body.insertAdjacentHTML (
  				'afterbegin',
  				fixture);
  	});
  	afterEach(function() {
    	document.body.removeChild(document.getElementById('fixture'));
  	});
  	it('should get the same button name', function(){
  		//document.body.innerHTML = __html__['*.html'];
  		console.log(document.getElementById("start").innerHTML);
		expect(document.getElementById('start').innerHTML).to.equal("Start Game");  		

  	});
  });  
});

