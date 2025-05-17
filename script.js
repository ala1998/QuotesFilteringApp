let quotes = [];

async function getQuotesFromAPI() {
    try {
      const result = await fetch('https://dummyjson.com/quotes');
      const resultJSON = await result.json();
    //   console.log(resultJSON);
      quotes = resultJSON.quotes;
    //   console.log(quotes);

      displayQuotes(quotes);
    } catch (err) {
        document.getElementById('listOfQuotes').innerHTML = '<p id="error">Unable to load quotes now! Please try again later.</p>';
        // console.error('Quotes Fetching Error: ', err);
    }
  }

  function displayQuotes(quotes) {

    document.getElementById('listOfQuotes').innerHTML = '';
  
    if (!quotes || quotes.length===0) {
        document.getElementById('listOfQuotes').innerHTML = '<li>No quotes found! Please enter another string.</li>';
      return;
    }

    document.getElementById('listOfQuotes').innerHTML = quotes.map(({ quote }) => `<li>${quote}</li>`).join('');

  }

  const handleFiltering = () => {
    const cleanInput = document.getElementById('filterInput').value.trim().toLowerCase();
    const listOfFilteredQuotes = quotes.filter(item => item.quote.toLowerCase().includes(cleanInput));
    displayQuotes(listOfFilteredQuotes);
  };

  document.getElementById('filterInput').addEventListener('input', handleFiltering);

  getQuotesFromAPI();