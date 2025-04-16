// Memory Game JavaScript
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Function to initialise the game
function initGame() {
    const cardValues = [...letters, ...letters];
    
    // Shuffle the cards
    for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }
    
    // Get the game board element
    const gameBoard = document.getElementById("game-board");
    
    // Create the cards and add them to the game board
    for (let i = 0; i < cardValues.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.value = cardValues[i];
        card.dataset.index = i;
        
        card.addEventListener("click", flipCard);
        
        gameBoard.appendChild(card);
        
        cards.push(card);
    }
}

// Function to handle card flipping
function flipCard() {
    if (this.classList.contains("flipped") ||  this.classList.contains("matched") ||  !canFlip ||  flippedCards.length >= 2) {
        return;
    }
    
    this.classList.add("flipped");
    this.textContent = this.dataset.value;
    
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Function to check if the two flipped cards match
function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        
        matchedPairs++;
        
        document.getElementById("matched-count").textContent = matchedPairs;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert("Congratulations! You won the game!");
            }, 500);
        }
    } else {
        canFlip = false;
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            canFlip = true;
        }, 1000);
    }
    
    // Reset flippedCards array
    flippedCards = [];
}

// Initialise the game when the page loads
window.addEventListener("load", initGame);