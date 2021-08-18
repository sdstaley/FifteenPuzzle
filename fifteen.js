"use strict";
// initialize timer
var interval;
var seconds = 0;
//initialize move counter
var moveCount = 0;
var tileClickCount = document.getElementsByClassName("tile clickable");
var audio = new Audio('wood.wav');
var victorySound = new Audio('victorySound.wav');

//stores whether there is a game in progress
var inProgress = false;

// stores the user selected background
var selected_background;

// stores background images
let background = ["bg1", "bg2", "bg3", "bg4"];
let squareID = [
    "one", "two", "three", "four",
    "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

// function to start game
function startGame() {
    if (selected_background == undefined) {
        let bgStart = Math.floor((Math.random() * 4));
        let selected_background = background[bgStart];
        document.getElementById(background[bgStart]).selected = true;
        for (var i = 0; i < squareID.length - 1; i++) {
            document.getElementById(squareID[i]).className = "tile " + background[bgStart];
        }
    }
    else {
        let bgVal = document.getElementById("bgNum").value;
        // updates the selected background to the correct option
        let selected_background = bgVal;
        for (var i = 0; i < squareID.length - 1; i++) {
            document.getElementById(squareID[i]).className = "tile " + selected_background;
        }
    }
}

// function for the user to select the background
function bgSelect() {
    clearInterval(interval);
    //gets input to update background
    let bgVal = document.getElementById("bgNum").value;
    // updates the selected background to the correct option
    selected_background = bgVal;
    for (var i = 0; i < squareID.length - 1; i++) {
        document.getElementById(squareID[i]).className = "tile " + bgVal;
    }
    seconds = 0;
    interval = setInterval(updateTimer, 1000);
}

function addTiles() {
    let pieces = document.querySelectorAll('div');
    let i = -2;
    pieces.forEach(tile => {
        if (tile.classList.contains("tile")) {
            tile.style.left = (i % 4 * 100) + 'px';
            tile.style.top = (parseInt(i / 4) * 100) + 'px';
            tile.classList.add('clickable');
            tile.classList.add('animate');
            tile.addEventListener('click', function () {
                let empty = document.querySelector('#sixteen');
                if (ifSwappable(this, empty)) {
                    let tempX = this.style.left;
                    let tempY = this.style.top;
                    let tempBGP = this.style.backgroundPosition;
                    this.style.left = empty.style.left;
                    this.style.top = empty.style.top;
                    audio.play();
                    empty.style.left = tempX;
                    empty.style.top = tempY;
                    moveCount++;
                    document.querySelector('#moves').textContent = moveCount;
                }
            });
            tile.addEventListener('mouseover', function() {
                let empty = document.querySelector('#sixteen');
                if (ifSwappable(this, empty)) {
                    tile.classList.add('hover');
                }
                else {
                    tile.classList.remove('hover');
                }
            })
        }

        i++;
    });
}

addTiles();

function ifSwappable(square, square2) {
    let squareX = parseInt(square.style.left.replace('px', ''));
    let squareY = parseInt(square.style.top.replace('px', ''));
    let square2X = parseInt(square2.style.left.replace('px', ''));
    let square2Y = parseInt(square2.style.top.replace('px', ''));
    square.classList.add('animate')
    square2.classList.add('animate')
    if (squareX == square2X) {
        if (squareY + 100 == square2Y || square2Y + 100 == squareY) {
            return true;
        }
    }
    else if (squareY == square2Y) {
        if (squareX + 100 == square2X || square2X + 100 == squareX) {
            return true;
        }
    }
    else {
        return false;
    }
}

// function shuffle(){
//     for(let i = 0; i < 1000; i++){
//          var empty = document.querySelector('#sixteen');
//          let emptyX = parseInt(empty.style.left, 10) + 600;
//          let emptyY = parseInt(empty.style.top, 10) + 250;
//          var randomSquare = Math.floor(Math.random() * 4);
//          //left of empty square
//          if(randomSquare == 0 && emptyX - 100 > 500){
//              document.elementFromPoint(emptyX - 100, emptyY).click();
//          //below empty square
//          } else if(randomSquare == 1 && emptyY + 100 < 650){
//              document.elementFromPoint(emptyX, emptyY + 100).click();
//          //right of empty square
//          } else if(randomSquare == 2 && emptyX + 100 < 1000){
//              document.elementFromPoint(emptyX + 100, emptyY).click();
//          //above empty square
//          } else if(randomSquare == 3 && emptyY - 100 > 100){
//              document.elementFromPoint(emptyX, emptyY - 100).click();
//          }
//     }
//     moveCount= 0;
//     document.querySelector('#moves').textContent = moveCount;
//     interval = setInterval(updateTimer, 1000);
//  }

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        var empty = document.querySelector('#sixteen');
        var emptyX = parseInt(empty.style.left, 10) + 300;
        var emptyY = parseInt(empty.style.top, 10) + 200;
        var randomSquare = Math.round(Math.random() * 3.49999);
        //left of empty square
        if (randomSquare == 0 && emptyX - 100 > 200) {
            document.elementFromPoint(emptyX - 100, emptyY).click();
            //below empty square
        } else if (randomSquare == 1 && emptyY + 100 < 600) {
            document.elementFromPoint(emptyX, emptyY + 100).click();
            //right of empty square
        } else if (randomSquare == 2 && emptyX + 100 < 700) {
            document.elementFromPoint(emptyX + 100, emptyY).click();
            //above empty square
        } else if (randomSquare == 3 && emptyY - 100 > 100) {
            document.elementFromPoint(emptyX, emptyY - 100).click();
        }
    }
    moveCount = 0;
    inProgress = true;
    document.querySelector('#moves').textContent = moveCount;
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}

setInterval(() => {
    if (inProgress) {
        if (document.elementFromPoint(300, 200).id == "one") {
            if (document.elementFromPoint(400, 200).id == "two") {
                if (document.elementFromPoint(500, 200).id == "three") {
                    if (document.elementFromPoint(600, 200).id == "four") {
                        if (document.elementFromPoint(300, 300).id == "five") {
                            if (document.elementFromPoint(400, 300).id == "six") {
                                if (document.elementFromPoint(500, 300).id == "seven") {
                                    if (document.elementFromPoint(600, 300).id == "eight") {
                                        if (document.elementFromPoint(300, 400).id == "nine") {
                                            if (document.elementFromPoint(400, 400).id == "ten") {
                                                if (document.elementFromPoint(500, 400).id == "eleven") {
                                                    if (document.elementFromPoint(600, 400).id == "twelve") {
                                                        if (document.elementFromPoint(300, 500).id == "thirteen") {
                                                            if (document.elementFromPoint(400, 500).id == "fourteen") {
                                                                if (document.elementFromPoint(500, 500).id == "fifteen") {
                                                                    document.getElementById("test").innerHTML = "YOU WIN!";
                                                                    document.body.style.backgroundImage = "url('win.jpg')";
                                                                    
                                                                        victorySound.play();
                                                                    
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, 1000)


function cheatButton() {
    let tiles = document.querySelectorAll('.tile');
    let game = document.querySelector('#game');
    game.innerHTML = `<div id="one"      class="tile">1</div>
    <div id="two"      class="tile">2</div>
    <div id="three"    class="tile">3</div>
    <div id="four"     class="tile">4</div>
    <div id="five"     class="tile">5</div>
    <div id="six"      class="tile">6</div>
    <div id="seven"    class="tile">7</div>
    <div id="eight"    class="tile">8</div>
    <div id="nine"     class="tile">9</div>
    <div id="ten"      class="tile">10</div>
    <div id="eleven"   class="tile">11</div>
    <div id="twelve"   class="tile">12</div>
    <div id="thirteen" class="tile">13</div>
    <div id="fourteen" class="tile">14</div>
    <div id="fifteen"  class="tile">15</div>
    <div id="sixteen"  class="tile"></div>`;
    startGame();
    addTiles();
    clearInterval(interval);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

//timer for game in seconds
function updateTimer() {
    seconds += 1;
    timer.innerText = seconds + "s";
}