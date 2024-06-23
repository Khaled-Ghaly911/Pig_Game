'use strict';
//selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score_0_El = document.querySelector('#score--0')
const score_1_El = document.getElementById('score--1')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores;
let currentScore
let currentPlayer
let playing

//starting conditions 
const init = function () {
    score_0_El.textContent = 0
    score_1_El.textContent = 0
    current0El.textContent = 0;
    current1El.textContent = 0;

    scores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;
    playing = true;

    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    diceEl.classList.add('hidden')

    document.querySelector(`.player--0`).classList.remove('player--winner')
    document.querySelector(`.player--1`).classList.remove('player--winner')
}

init();



const switchPlayer = function () {
    document.getElementById(`current--${currentPlayer}`).textContent = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

//on Rolling Dice 
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generate Random number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice)
        //Dispaly Dice Roll
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        //Is it a 1 ? 
        if (dice !== 1) {
            //Add dice roll to current score
            currentScore += dice;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore
        } else {
            //switch Player
            switchPlayer()
        }
    }
})


btnHold.addEventListener('click', function () {

    if (playing) {
        //Add current score to active player's score
        scores[currentPlayer] += currentScore
        document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];

        //check if the score of the player is >= 100
        if (scores[currentPlayer] >= 100) {
            //finish the game
            playing = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active')
        } else {
            //switch the player 
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init)