
async function fetchNumberFact(number) {
  const apiUrl = `http://numbersapi.com/${number}?json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error(`Error fetching data for ${number}:`, error);
    return `Failed to fetch data for ${number}`;
  }
}

async function fetchAndDisplayFacts() {
  const factsContainer = document.getElementById('facts-container');
  const favoriteNumber = 7;
  const numberOfFacts = 4;

  try {
    for (let i = 1; i <= numberOfFacts; i++) {
      const fact = await fetchNumberFact(favoriteNumber);
      const factElement = document.createElement('p');
      factElement.textContent = `Fact ${i}: ${fact}`;
      factsContainer.appendChild(factElement);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function
fetchAndDisplayFacts();
