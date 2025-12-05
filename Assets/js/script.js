// STEP 4: To be able to show all results, create pager 
    // This will make the site more interactive for user

//Global Variables
let displayDiv = document.querySelector(`#display-div`);
let dropdownChoice = document.querySelector(`#dropdown-choice`);
let pager = document.querySelector(`#pager`);
// // NOT USED YET
// let pageChoice = document.querySelector(`#page-choice`);
// // NOT USED YET
// let pageDropdown = document.querySelector(`#page-dropdown`);
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
        // Clear any previous responses or errors and display current search results
        displayDiv.replaceChildren('');

        // Display error message for user to type in something
        let searchError = document.createElement(`h2`);
        searchError.textContent = (`ERROR! Please enter a name of a movie or series to search for and retry`)
        searchError.classList.add(`text-red-950`);
        displayDiv.appendChild(searchError);
        
        return;
    } else if (dropdownChoice.value === "movie") {
        // Fetch link with the parameter "type=movies"
        let requestUrl = `http://www.omdbapi.com/?apikey=ce01743c&type=${dropdownChoice.value}&s=${userInput.value}&page=1`;
        
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Checks for errors in search results
            if (data.Response === "False") {
                // Clear any previous responses or errors and display current search results
                displayDiv.replaceChildren('');

                // Define error and display on page
                let searchError = document.createElement(`h2`);
                searchError.textContent = (`ERROR! Please type another name and try again`);
                searchError.classList.add(`text-red-950`);
                displayDiv.appendChild(searchError);
                return;
            } else if (data.Response === "True") {
                // Clear any previous responses or errors and display current search results
                displayDiv.replaceChildren('');

                // Define search results and total results to calculate pages
                let searchResults = data.Search;

                // THIS WILL BE USED TO CALCULATE PAGES! IF MORE THAN 10, MORE PAGES ARE NEEDED!
                // let totalResults = data.totalResults;
                // console.log(totalResults);

                // Define pager's HTML content
                    // let pagerForm = document.createElement(`div`);
                    // let pagerHTML = `
                    //     <form id="page-dropdown">
                    //     <label for="page">Page:</label>
                    //     <select name="page" id="page-choice" class="border">
                    //         <option value="1">1</option>
                    //         <option value="2">2</option>
                    //         <option value="3">3</option>
                    //         <option value="4">4</option>
                    //         <option value="5">5</option>
                    //         <option value="6">6</option>
                    //         <option value="7">7</option>
                    //         <option value="8">8</option>
                    //         <option value="9">9</option>
                    //         <option value="10">10</option>
                    //         <option value="11">11</option>
                    //         <option value="12">12</option>
                    //         <option value="13">13</option>
                    //         <option value="14">14</option>
                    //         <option value="15">15</option>
                    //         <option value="16">16</option>
                    //         <option value="17">17</option>
                    //         <option value="18">18</option>
                    //         <option value="19">19</option>
                    //         <option value="20">20</option>
                    //         <option value="21">21</option>
                    //         <option value="22">22</option>
                    //         <option value="23">23</option>
                    //         <option value="24">24</option>
                    //         <option value="25">25</option>
                    //     </select>
                    //     </form>`

                    //     pagerForm.innerHTML = pagerHTML;

                    //     // Append pager form
                    //     pager.append(pagerForm);

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
                // Define pager's HTML content
                    let pagerForm = document.createElement("form");
                    let pagerHTML = `
                        <form action="" id="page-dropdown">
                        <label for="page">Page:</label>
                        <select name="page" id="page-choice" class="border">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                        </select>
                        </form>`

                        pagerForm.innerHTML = pagerHTML;

                        // Append pager form
                        pager.appendChild(pagerForm);

                        // NOT USED YET
                        let pageChoice = document.querySelector(`#page-choice`);
                        
                        // NOT USED YET
                        let pageDropdown = document.querySelector(`#page-dropdown`);

                        console.log(pageChoice.value);
                        pageDropdown.addEventListener("click", pageClick);

                        function pageClick (Event) {
                            console.log(pageChoice.value);
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
                // Clear any previous responses or errors and display current search results
                displayDiv.replaceChildren('');

                // Define error and display on page
                let searchError = document.createElement(`h2`);
                searchError.textContent = (`ERROR! Please type another name and try again`);
                searchError.classList.add(`text-red-950`);
                displayDiv.appendChild(searchError);
                return;
            } else if (data.Response === "True") {
                // Clear any previous responses or errors and display current search results
                displayDiv.replaceChildren('');

                // Define search results
                let searchResults = data.Search;

                // Define pager's HTML content

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