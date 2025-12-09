// STEP 4: To be able to show all results, create pager 
// This will make the site more interactive for user

// Global Variables
let displayDiv = document.querySelector(`#display-div`);
let dropdownChoice = document.querySelector(`#dropdown-choice`);
let pager = document.querySelector(`#pager`);
let pagerValue = 1; // Tracks which page of results is shown
let searchBtn = document.querySelector(`#search-button`);
let searchForm = document.querySelector(`#search-form`);
let userInput = document.querySelector(`#user-input`);


// Initialize form listener
function init () {
    searchForm.addEventListener("submit", handleFormSubmit);
}


/* 
    Update the pager UI
    - Shows Next Page button always
    - Shows Previous Page button ONLY when page > 1
    - Updates displayed page number
*/
function updatePagerUI() {
    pager.replaceChildren(""); // clear previous pager

    let pagerDisplay = document.createElement("div");

    // Create pager buttons dynamically based on current page
    pagerDisplay.innerHTML = `
        ${pagerValue > 1 
            ? `<button class="border px-2" id="prev-btn">Previous Page</button>` 
            : ``}

        <h4 class="inline-block px-4">Page: ${pagerValue}</h4>

        <button class="border px-2" id="next-btn">Next Page</button>
    `;

    pager.appendChild(pagerDisplay);

    // Add event listeners only if the buttons exist
    let prevBtn = document.querySelector("#prev-btn");
    let nextBtn = document.querySelector("#next-btn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            pagerValue--; // Move to previous page
            handleFormSubmit(new Event("submit"), true); // true = pagination click
        });
    }

    nextBtn.addEventListener("click", () => {
        pagerValue++; // Move to next page
        handleFormSubmit(new Event("submit"), true); // true = pagination click
    });
}


/*
    handleFormSubmit()
    - Runs every time the user performs a search OR clicks next/prev
    - Pagination clicks bypass the page reset
*/
let handleFormSubmit = (Event, isPagination = false) => {
    Event.preventDefault();

    // NEW SEARCH always resets to page 1
    if (!isPagination) {
        pagerValue = 1;
    }

    // Test pager for increase
    console.log("Current Page:", pagerValue);

    // Validate user input before doing API call
    if (userInput.value === "") {
        displayDiv.replaceChildren('');
        pager.replaceChildren('');

        let searchError = document.createElement(`h2`);
        searchError.textContent = `ERROR! Please enter a name of a movie or series to search for and retry`;
        searchError.classList.add(`text-red-950`);
        displayDiv.appendChild(searchError);

        return;
    }

    // Build URL dynamically depending on movie/series dropdown
    let requestUrl = `https://www.omdbapi.com/?apikey=ce01743c&type=${dropdownChoice.value}&s=${userInput.value}&page=${pagerValue}`;

    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {

        // Handle invalid searches
        if (data.Response === "False") {
            displayDiv.replaceChildren('');
            pager.replaceChildren('');

            let searchError = document.createElement(`h2`);
            searchError.textContent = `ERROR! Please type another name and try again`;
            searchError.classList.add(`text-red-950`);
            displayDiv.appendChild(searchError);

            return;
        }

        // Clear previous results on new search or page change
        displayDiv.replaceChildren('');

        // OMDB search results (always max 10 per page)
        let searchResults = data.Search;

        // Loop through results to create display cards
        for (let i = 0; i < searchResults.length; i++) {
            let title = searchResults[i].Title;
            let year = searchResults[i].Year;
            let poster = searchResults[i].Poster;

            // Create DOM elements for card + poster
            let card = document.createElement(`div`);
            let img = document.createElement(`img`);

            card.innerHTML = `
                <h2>${title}</h2>
                <h4>Year of Release: ${year}</h4>
            `;

            img.setAttribute("src", poster);

            // Append results to the DOM
            displayDiv.appendChild(card);
            displayDiv.appendChild(img);
        }

        // Update pagination buttons for current page
        updatePagerUI();
    });
}


// Function Calls & Event Listeners
init();