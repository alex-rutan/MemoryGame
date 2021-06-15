"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let newCard = document.createElement("div");
    newCard.className = color;
    newCard.addEventListener("click", handleCardClick);
    gameBoard.appendChild(newCard);
  }
}


/** Flip a card face-up. */
function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.add("flipped");
}


/** Flip a card face-down. */
function unFlipCard(card) {
  card.style.backgroundColor = "white";
  card.classList.remove("flipped"); 
}


//create counter to limit number of cards flipped by monitopring class "flipped" and create counter for paired cards.
let flippedCards = document.getElementsByClassName("flipped");
let pairedCards = document.getElementsByClassName("paired");


/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(event) {
  if (flippedCards.length > 1) {
    return
  }

  if (event.target.style.backgroundColor = "white") {
    flipCard(event.target);
  }

  if (flippedCards.length > 1 && flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor) {
    flippedCards[1].removeEventListener("click", handleCardClick);
    flippedCards[1].classList.add("paired");
    flippedCards[1].classList.remove("flipped");
    flippedCards[0].removeEventListener("click", handleCardClick);
    flippedCards[0].classList.add("paired");
    flippedCards[0].classList.remove("flipped");
  }
  
  if (flippedCards.length > 1 && flippedCards[0].style.backgroundColor !== flippedCards[1].style.backgroundColor) {
    setTimeout(() => {unFlipCard(flippedCards[1]);}, 1000);
    setTimeout(() => {unFlipCard(flippedCards[0]);}, 1000);
  }

  if (pairedCards.length === COLORS.length) {
    setTimeout(function() {
      alert ("Congratulations, you win! Please reload browser to play again.");
    }, 500);
  }
}

