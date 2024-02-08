$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';
    
    // Function to draw a card from the deck using async/await
    async function drawCard(deckId) {
      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        if (!response.ok) {
          throw new Error(`Failed to draw card. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.remaining === 0) {
          alert('No cards remaining in the deck!');
          return;
        }

        // Log the value and suit of the drawn card
        console.log(`Card: ${data.cards[0].value} of ${data.cards[0].suit}`);

        // Display the card on the HTML page
        displayCard(data.cards[0]);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }

    // Function to display the card on the HTML page
    function displayCard(card) {
      const cardsContainer = document.getElementById('cardsContainer');
      const cardElement = document.createElement('div');
      cardElement.textContent = `${card.value} of ${card.suit}`;
      cardsContainer.appendChild(cardElement);
    }

    // Function to create a new deck when the page loads using async/await
    async function createNewDeck() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        if (!response.ok) {
          throw new Error(`Failed to create new deck. Status: ${response.status}`);
        }

        const data = await response.json();
        const deckId = data.deck_id;

        // Attach event listener to the draw card button
        const drawCardBtn = document.getElementById('drawCardBtn');
        drawCardBtn.addEventListener('click', () => drawCard(deckId));
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }

    // Call the createNewDeck function when the page loads
    window.addEventListener('load', createNewDeck);
});