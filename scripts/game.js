/*
Sheldon Irving
A00073833
Comp 2132
Final Project
*/


let raf = window.requestAnimationFrame;
let makeStepHandler = undefined;
let makeStep = function (delay, frames,rollframes,totalframes) {
    return new Promise(function (resolve) {
        makeStepHandler= raf(timeout=>{_makeStep(timeout, delay, frames,rollframes,totalframes, resolve)});
    });
};

/*
let makePromoise = function (codeFunction) {
    return new Promise(function (resolve) {
        raf(timeout=>{_makeStep(timeout, delay, frames, resolve)});
    });
};
*/

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


const popupAlert    = document.getElementById("pop-up");
const delay = 1000;

let timerActive = false;
let noPopup = false;


let timer1 = setTimeout( function(){
    timerActive = true;
    // I added userHasNotStartedAnimationYet since you defined a variable for it
    // but its not needed since i used noPopup
    //

    if ((1) && (! noPopup)) {
    //showPopup("this is a test");
    //showPopup();
    //transPopup(0);

    transPopupAnimateHandler = window.requestAnimationFrame(transPopupAnimate);


    } else { //occupancy



        //example of fade of popup using setInterval
        /*
        let base = 0;
        let intDelay = 1000;
        let intStep = 10;
        let intShow = setInterval( function() {
        base+=intStep;
        


        transPopup(base/intDelay);

            if (base == intDelay) {
                clearInterval(intShow);
            } else {
                //alert(base);
            }
        },(intStep));
        */




    }
}, delay );






let popupInit = false;

function showPopup(message = undefined,header = undefined,className=undefined) {
    

    let popupAlertClose = document.getElementById("btn-close");

    if (!popupInit)
    //alert("close");
    //popupAlert will also work here since the button takes the click
    //using popupAlertClose makes it so when clicking close wont work when popup help
    popupAlert.addEventListener("click", function(e) {
    //alert("closeclick");
        hidePopup();
    });

    //avoid duplicate handlers
    popupInit = true;

    console.log(`alert: ${message}`);
    if (message != undefined) {
        //change message

        if (! message.isArray) {
            message = [`${message}`];
        }
        

        if (header == undefined) {header = message[0];}
        let messageList = [];
        message.forEach(text => {
            messageList.push(`<p>${text}</p>`);
        });

        if (className == undefined) {
        popupAlert.innerHTML = `<h2>${header}</h2><button id="btn-close">&#10005;</button>${messageList.join("")}`;
        } else {
            popupAlert.innerHTML = `<h2 class='${className}'>${header}</h2><button id="btn-close">&#10005;</button>${messageList.join("")}`;
        }
    }

    popupAlert.className = "show";
}


let start;
let max = 1000



function transPopupAnimate(timestamp) {

    if (start == undefined ) {
        start = timestamp;
    }
    let elapsed = timestamp - start;

    transPopup(elapsed/max);

    if (elapsed < max) {
    //window.requestAnimationFrame(this);
    
        transPopupAnimateHandler = window.requestAnimationFrame(transPopupAnimate);
    } else { //end animatiion

        window.cancelAnimationFrame(transPopupAnimateHandler);
    }
}

function hidePopup() {
    popupAlert.className = "hide";
    //popupAlert.style = undefined;
    popupAlert.removeAttribute("style");
}

function transPopup(oc) {
    

    if (! popupInit) {showPopup();}
    let ooc = (Math.round(oc*100)/100);
    //alert(ooc);
    popupAlert.style = `opacity: ${ooc};`
}


//player class
class player {
    constructor(name = undefined) {
        this.name = name;
        this.score = 0;
        this.totalScore = 0;
        //this.roll = undefined;
        this.roll = [];
        this.hasDice = [];
        this.bound = undefined;
    }

    addDice(dice) {
        this.hasDice.push(dice);
    }
    addBound(player) {
        this.bound = player;

    }
    addRoll(roll1,roll2,score) {
        this.roll.push({roll1: roll1, roll2: roll2, score: score});
    }
    reset() {
        this.score = 0;
        this.totalScore = 0;
        //this.roll = undefined;
        this.roll = [];
        //this.hasDice = [];
        //this.bound = undefined;

    }
}


//dice class 
class dice {
    constructor(owner = undefined) {
        this.max = 6;
        this.owner = owner;
        this.bound = undefined;
        this.value = undefined;

    }
    roll() {
        //0 to 1 -> 0 to 5
        //return 1+(Math.floor(Math.random()*(this.max-1) % 5));
        let rnd = 1;
        //keep rolling until not 0
        while(rnd == 1) {
            rnd = Math.random();
        }
        //do not want 1 as it gives extra odd and not fall in range 0 - 0.999999
        //return 1+(Math.floor(rnd*(this.max-1) % 5));
        this.value =  1+(Math.floor(rnd*(this.max-1) % 5));
        //alert(this.value);
        return this.value;
    }
    curRoll() { //return current value of roll (face side up)
        return this.value;
    }

    //bound to interface
    addBound(dice) {
        this.bound = dice;
    }
}

let state = false;
//game class
class game{
    constructor(players = undefined, rounds = 3) {

        if (players != undefined) {
            if (players.isArray) {
                this.players = this.players

            } else {
                this.players = [players];
            }
        } else {
            this.players = [];
        }

        this.dice = [];
        //this.dice = new dice();
        this.updatePlayers();



        this.rounds = rounds;
        this.game = [];

    }
    addPlayer(user,interfaceUser=null,interfaceDice = null) {

        if (interfaceUser != null) {
            user.addBound(interfaceUser);
            //alert(interfaceUser.getElementsByClassName("name"));
            interfaceUser.getElementsByClassName("name")[0].innerHTML = `<div id="dice${this.players.length}n" class="inline"></div> Player${this.players.length+1}: ${user.name.toProperCase()}`;
            //alert(this.players.length);
            let dicen = document.getElementById(`dice${this.players.length}n`);
            drawDice(dicen,this.players.length+1,20,false);
        }
        this.players.push(user);
        //alert(`add:${name.name}`);
        this.updatePlayers(interfaceDice);
    }

    updatePlayers(interfaceDice = null) {
        this.numPlayers = this.players.length;
        //alert();

        if (this.players.length > 0) {
            //create a dice for each player
                this.players.forEach((player,index)=>{

                    if(player.hasDice.length == 0 ) {
                        //alert(player.name);
                        //need to assign dice to the player
                        let dice1 = new dice(player.name);
                        let dice2 = new dice(player.name);

                    //only on init
                     if (interfaceDice.length > 1) {
                         dice1.addBound(interfaceDice[0]);
                         dice2.addBound(interfaceDice[1]);
                     }

                        player.addDice(dice1);
                        player.addDice(dice2);

                        
                        this.dice.push(dice1);
                        this.dice.push(dice2); 
                    }
                                   
                });

        }
    }

    resetGame() {
        //reset all dice
        this.dice.forEach(dice=>{drawDice(dice.bound,1);});
        this.game = [];
        //reset all players
        this.players.forEach(player=>{player.reset();});

        document.getElementById("start").removeAttribute("disabled");
        document.getElementById("start").innerHTML = "Start Game";
        document.getElementById("results").innerHTML = `<p class="centre">Click Start to start game</p>`
        document.getElementById("results").removeAttribute("class");


        let score = document.getElementsByClassName("score");
        let totalscore = document.getElementsByClassName("totalscore");

        for(let ii=0;ii<score.length;ii++) {
            score[ii].className="score";
            score[ii].innerHTML = `<p class="centre">0</p>`;
        }

        for(let ii=0;ii<totalscore.length;ii++) {
            totalscore[ii].className="totalscore";
            totalscore[ii].innerHTML = `<p class="centre">0</p>`;
        }
        //score.forEach(scoret=>{scoret.className="score"});
        //totalscore.forEach(totalscore=>{totalscore.className="totalscore"});

        //end animation
        state = false;
        window.cancelAnimationFrame(makeStepHandler);

    }
    playGame() {

        //alert(this.game == undefined);

        //detect if game is in progress, if so next roll

        if (this.game == undefined) {
            this.game = [];




            //let score = {};
            //this.rounds = 1;
            //cant use for since the game relies on a click to roll also because animate is call back
            //for (let ii=1; ii<=this.rounds; ii++) {
                
            
                //there is no way to wait for rollround as its animated unless we do a promise
                
                //let winner = this.rollRound();

                this.rollRound();
                
                //keep track of winners
                //this.game.push(winner);

                
                /*
                if (score[winner.name] == undefined) {
                score[winner.name] = winner.score;
                } else {
                    score[winner.name]+= winner.score;
                }
                */
            //}

        } else {


            //alert();
            if (this.game.length+1 < this.rounds) {
                
                document.getElementById("start").innerHTML = "Roll Again";
            } else {
                document.getElementById("start").disabled = true;
            }
            this.rollRound();
        }
    }
    rollRound() {

        let maxScore = -1;
        let maxPlayer = undefined;

        let minScore = -1;
        let minPlayer = undefined;

        state = true;
        //let diceAnimateHandle = window.requestAnimationFrame( diceAnimate);
        
        let th=this;
        resetAnimate();
        document.getElementById("start").disabled = true;

        //play with this function
        //delay = 100ms per frame
        //20 frames per set (2000ms), 15 (1500ms)shows dice shakes, pause 5 frames (500ms)
        //follow pattern for 20 frames
        makeStep(100,20,15,20).then(
            function(result){

                //alert(result);



            //setTimeout(function() {

            th.players.forEach( player=>{
                
                

                //let roll1 = this.dice.roll();
                //let roll2 = this.dice.roll();

                
                //
                //
                //need to start animation roll
                //when animation is done get values

                //



                //    while (state) {
                //
                //    }


                //wait on async to finish


                let roll1 = player.hasDice[0].curRoll();
                let roll2 = player.hasDice[1].curRoll();


                //alert(roll1);

                player.score = th.calcScore(roll1, roll2);
                player.totalScore+=player.score;
                player.addRoll(roll1,roll2,player.score);

                console.log(`${player.name} ${roll1} ${roll2} ${player.score} ${player.totalScore}`);


                if (player.score > maxScore) {
                    minScore = maxScore;
                    maxScore = player.score;
                    
                    minPlayer = maxPlayer
                    maxPlayer = player;
                } else {
                    minPlayer = player;
                    minScore = player.score;
                }


              


            });    
            th.game.push({winner: maxPlayer,looser:minPlayer});
            //result(maxPlayer)
        //resolve();
        }
        ).then(
            //animate winner of round
            function(result) {

                //alert(th.game[th.game.length-1].name);
                let line = th.game[th.game.length-1];

                let player = line["winner"];
                let lplayer = line["looser"];

                th.players.forEach(player=>{
                    //alert(player.bound.getElementsByClassName("score"));
                    //alert(player.bound);
                    //player.bound.innerText = player.score;
                    //alert(player.name);
                    let score = player.bound.getElementsByClassName("score");
                    if (score.length > 0) {
                        score[0].innerHTML = `<p class="centre">${player.score}</p>`;
                       
                    }
                    let totalscore = player.bound.getElementsByClassName("totalscore");
                    if (totalscore.length > 0) {
                        totalscore[0].innerHTML = `<p class="centre">${player.totalScore}</p>`;
                    }

                });



                if (th.game.length < th.rounds) {


                    //alert(score[0].className);

                    let score = player.bound.getElementsByClassName("score");
                    let totalscore = player.bound.getElementsByClassName("totalscore");

                    let lscore = lplayer.bound.getElementsByClassName("score");
                    let ltotalscore = lplayer.bound.getElementsByClassName("totalscore");


                    if (player.score != lplayer.score) {
                    score[0].className = "score winner";
                    lscore[0].className = "score looser";


                    //need to update these based on winner
                    totalscore[0].className = "totalscore winner";
                    ltotalscore[0].className = "totalscore looser";
                    } else {

                        score[0].className = "score tie";
                        lscore[0].className = "score tie";
    
    
                        //need to update these based on winner
                        totalscore[0].className = "totalscore tie";
                        ltotalscore[0].className = "totalscore tie";

                    }



                    if (player.score != lplayer.score) {
                        if (player.name != 'computer') {
                            document.getElementById("results").className = "winner";




                        } else {
                            document.getElementById("results").className = "looser";

                            

                        }
                        document.getElementById("results").innerHTML = `<p class="centre">'${player.name.toProperCase()}' wins this round, click to roll again</P>`;

                     } else {
                        document.getElementById("results").className = "tie";
                        document.getElementById("results").innerHTML = `<p class="centre">'Its a Tie, click to roll again</P>`;

                     }

                    
                    document.getElementById("start").removeAttribute("disabled");
                    //document.getElementById("start").innerHTML = "Roll Again";
                } else {
                    
                    let minScore = -1;
                    let maxScore = -1;
                    let maxPlayer = undefined;
                    let minPlayer = undefined;

                    th.players.forEach(player=>{

                        console.log(`sort ${player.name}`);

                        console.log(`${player.name }${player.totalScore} ${maxScore}`);
                        if (player.totalScore > maxScore) {
                            minScore = maxScore;
                            maxScore = player.totalScore;
                            
                            minPlayer = maxPlayer
                            maxPlayer = player;
                            console.log(`${maxPlayer.name} ${maxScore}`);
                        } else {
                            minPlayer = player;
                            minScore = player.totalScore;
                        }

                    });


                    //alert(maxPlayer);

                    let score = maxPlayer.bound.getElementsByClassName("score");
                    let totalscore = maxPlayer.bound.getElementsByClassName("totalscore");

                    let lscore = minPlayer.bound.getElementsByClassName("score");
                    let ltotalscore = minPlayer.bound.getElementsByClassName("totalscore");

                    if (minScore != maxScore) {
                    score[0].className = "score winner";
                    lscore[0].className = "score looser";

                    //need to update these based on winner
                    totalscore[0].className = "totalscore winner";
                    ltotalscore[0].className = "totalscore looser";
                    } else {

                        score[0].className = "score tie";
                        lscore[0].className = "score tie";
    
                        //need to update these based on winner
                        totalscore[0].className = "totalscore tie";
                        ltotalscore[0].className = "totalscore tie";

                    }


                    if (minScore != maxScore) {
                    //alert(maxPlayer.name);
                        if (maxPlayer.name != 'computer') {
                            document.getElementById("results").className = 'winner';   
                        } else {
                            document.getElementById("results").className = 'looser';
                        }
                        document.getElementById("results").innerHTML = `<p class="centre">Game Over, try again. '${maxPlayer.name.toProperCase()}' Wins!</P>`;
                    } else {
                        document.getElementById("results").className = 'tie';
                        document.getElementById("results").innerHTML = `<p class="centre">Game Over, try again. Its a Tie!</P>`;
                    }

                    //add popup
                    showPopup(`${document.getElementById("results").innerHTML}<p class='centre'>Click 'Reset Game' to try again</p>`,`Game Results: ${document.getElementById("results").className}`,document.getElementById("results").className);

                    //document.getElementById("start").removeAttribute("disabled");
                    document.getElementById("start").disabled = true;

                }
                //alert(document.getElementById("start").innerHTML);
                //alert(result,name);

            }
        );

//        })}, 1000);

        //console.log(`${maxPlayer.name} ${maxScore}`);

        //return player that won round
        //return maxPlayer;


    }
    calcScore(roll1, roll2) {

        let score = 0;
        if (roll1 == 1 || roll2 == 1) {
            score = 0;

        } else if (roll1 == roll2) {
            score = (roll1+roll2)*2;

        } else {
            score = roll1 + roll2;
        }
        return score;
    }
}



let dicet0 = document.getElementById("dicet0");
let dicet1 = document.getElementById("dicet1");
let dicet2 = document.getElementById("dicet2");
let dicet3 = document.getElementById("dicet3");
let dicet4 = document.getElementById("dicet4");
let dicet5 = document.getElementById("dicet5");

drawDice(dicet0,1,20,false);
drawDice(dicet1,2,20,false);
drawDice(dicet2,3,20,false);
drawDice(dicet3,4,20,false);
drawDice(dicet4,5,20,false);
drawDice(dicet5,6,20,false);

let dice0n = document.getElementById("dice0n");
let dice1n = document.getElementById("dice1n");
drawDice(dice0n,1,20,false);
drawDice(dice1n,2,20,false);

let dice0 = document.getElementById("dice0");
let dice1 = document.getElementById("dice1");
let dice2 = document.getElementById("dice2");
let dice3 = document.getElementById("dice3");

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

let pa = new player('you');
let pb = new player('computer');
let gm = new game();
gm.addPlayer(pa,player1,[dice0,dice1]);
gm.addPlayer(pb,player2,[dice2,dice3]);

//gm.playGame();

document.getElementById("start").addEventListener('click', function(e) {
    gm.playGame();
});


document.getElementById("reset").addEventListener('click', function(e) {
    gm.resetGame();
});


document.getElementById("help").addEventListener('click', function(e) {
    showPopup("Click 'Start Game' to start the game. Click 'Roll Again' for next dice roll. Click 'Reset Game' to start the game again over","Need Help?")
});

//dice0.setAttribute("src","images/dice-faces-six-ivory-white-55711126.png");


drawDice(dice0,1);
drawDice(dice1,1);
drawDice(dice2,1);
drawDice(dice3,1);

//dice0r = new dice();
//dice1r = new dice();
//dice2r = new dice();
//dice3r = new dice();





//let diceAnimateHandle = window.requestAnimationFrame( diceAnimate);


let startDice = undefined;
let curFrame = 0;
let pause = false;

function resetAnimate() {
    startDice = undefined;
    curFrame = 0;
    pause = false;
}

//let state = false;
//function diceAnimate(timeout) {
function _makeStep(timeout, delay, frames,rollframes,totalframes, resolve) {
    if (startDice == undefined) {
        startDice = timeout;
    }

    //state = true;

    timeSpan = Math.floor(timeout - startDice);


    //let delay = 50;
    if (timeSpan >= delay) {





    let frameTime = timeSpan - timeSpan%delay;
    startDice+=(frameTime);
    //how many frames passed in duration
    let frame = frameTime / delay

    curFrame+=frame;


    //pause effect to rersemble shaker
    if ((curFrame%frames) <= rollframes) {
        pause = false;
        console.log(`${curFrame}`);
    } else {
        pause = true;
        console.log(`${curFrame}: pause`);
    }

        //shake limit or event to stop
        if (curFrame < (totalframes-1)) {
            state = true;
        } else {
            state = false;

        }

        //possible foreach
    if (!pause) {

        gm.dice.forEach(dice=>{
            drawDice(dice.bound,dice.roll());
        });
        //drawDice(dice0,dice0r.roll());
        //drawDice(dice1,dice1r.roll());
        //drawDice(dice2,dice2r.roll());
        //drawDice(dice3,dice3r.roll())

    }


    }

    if (state) {
        //window.requestAnimationFrame(diceAnimate);
        makeStepHandler=raf(timeout=>{_makeStep(timeout, delay, frames,rollframes,totalframes, resolve)});
    } else {
        resolve(state);
    }
    //alert(this);

}



function drawDice(dice,number = 1,newSizePX = 171,textDisplay = true) {
//36 //92 //92
//let number = 2;

//342*342
let x = 0;
let y = 0;
switch(number) {
    case 1: y= 52+104+342;x = 36 + 2*92+2*342; break;
    case 2: y= 52+104+342;x = 36 + 92+342; break;
    case 3: y= 52+104+342;x = 36; break;
    case 4: y= 52;        x = 36 + 2*92 + 2*342; break;
    case 5: y= 52;x = 36 + 92 + 342; break;
    case 6: y= 52; x = 36; break;
}

//let newSizePX = 171;
let scale = newSizePX / 342;

//dice.style = ` width: 342px; height: 342px; border: 1px solid green; background: url(images/dice-faces-six-ivory-white-55711126.png) -${x}px -${y}px; background-size: 1300px 971px;`;
// scalre to half size
dice.style = `width: ${342*scale}px; height: ${342*scale}px; border: 1px solid green; background: url(images/dice-faces-six-ivory-white-55711126.png) -${x*scale}px -${y*scale}px; background-size: ${1300*scale}px ${971*scale}px;`;
if (textDisplay) {
    dice.innerText = number;
}
}
