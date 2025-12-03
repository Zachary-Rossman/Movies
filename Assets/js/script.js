// STEP 1 : Create functioning search bar that records user's typed input. Will have a drop down choice of what user wants to search for, a search bar, and a search button. Must record user's typed input and choice.
    // Types will be movies or series
// STEP 2: Use user's input to search to check against api. If data is available, retrieve data from the api to be used to display on screen.
    // This will pull all data in the search results to be prepared to display
// STEP 3: Loop through search results, and create elements on html to display results from the search. When user does another search, the results must clear themselves and show new ones only
    // This will show results for user's search
// STEP 4: To be able to show all results, create pager 
    // This will make the site more interactive for user

//Global Variables
let displayDiv = document.querySelector(`#display-div`);
let dropdownChoice = document.querySelector(`#dropdown-choice`);
let searchBtn = document.querySelector(`#search-button`)
let searchForm = document.querySelector(`#search-form`);
let userInput = document.querySelector(`#user-input`);


// Functions
function init () {
    searchForm.addEventListener("submit", handleFormSubmit);
}

// Function will fire when form is submitted
let handleFormSubmit = (Event) => {
    Event.preventDefault();

    // modify link based on choice in box
    if (userInput.value === "") {
        // Display error message for user to type in something
        let searchError = document.createElement(`h2`);
        searchError.textContent = (`ERROR! Please enter a name of a movie or series to search for and retry`)
        searchError.classList.add(`text-red-950`);
        displayDiv.appendChild(searchError);
        return;
    } else if (dropdownChoice.value === "movie") {
        // Fetch link with the parameter "type=movies"
        let requestUrl = `http://www.omdbapi.com/?apikey=ce01743c&type=${dropdownChoice.value}&s=${userInput.value}`;
        
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Checks for errors in search results
            if (data.Response === "False") {
                let searchError = document.createElement(`h2`);
                searchError.textContent = (`ERROR! Please type another name and try again`);
                searchError.classList.add(`text-red-950`);
                displayDiv.appendChild(searchError);
                return;
            } else if (data.Response === "True") {
                // Define search results
                let searchResults = data.Search;

                // Loop through results
                for(let i=0; i < searchResults.length; i++) {
                    // Define results criteria based on data from API
                    let movieTitle = searchResults[i].Title;
                    let year = searchResults[i].Year;
                    let poster = searchResults[i].Poster;

                    // Create DOM elements 
                    let movieCard = document.createElement(`div`);
                    let moviePoster = document.createElement(`img`);

                    // Set HTML 
                    movieCard.innerHTML = 
                    `<h2>${movieTitle}</h2>
                    <h4>Year of Release: ${year}</h4>`

                    // Set image attribute for source on IMG tag for poster
                    moviePoster.setAttribute("src", poster);

                    // Append name, year of release, and poster to displayDiv
                    displayDiv.appendChild(movieCard);
                    displayDiv.appendChild(moviePoster);
                }
            }
        })
    } else if (dropdownChoice.value === "series") {
        // Fetch link with the parameter "type=movies"
        let requestUrl = `http://www.omdbapi.com/?apikey=ce01743c&type=${dropdownChoice.value}&s=${userInput.value}`;
        
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.Response === "False") {
                let searchError = document.createElement(`h2`);
                searchError.textContent = (`ERROR! Please type another name and try again`);
                searchError.classList.add(`text-red-950`);
                displayDiv.appendChild(searchError);
                return;
            } else if (data.Response === "True") {
                // Define search results
                let searchResults = data.Search;

                // Loop through results
                for(let i=0; i < searchResults.length; i++) {
                    // Define results criteria based on data from API
                    let seriesTitle = searchResults[i].Title;
                    let year = searchResults[i].Year;
                    let poster = searchResults[i].Poster;

                    // Create DOM elements
                    let seriesCard = document.createElement(`div`);
                    let seriesPoster = document.createElement(`img`);

                    // Set HTML
                    seriesCard.innerHTML = 
                    `<h2>${seriesTitle}</h2>
                    <h4>Year of Release: ${year}</h4>`

                    // Set image attribute on IMG tag for poster
                    seriesPoster.setAttribute("src", poster);

                    // Append name, year of release, and poster to displayDiv
                    displayDiv.appendChild(seriesCard);
                    displayDiv.appendChild(seriesPoster);
                }
            }
        });
    }
}

// Function Calls & Event Listeners
init();