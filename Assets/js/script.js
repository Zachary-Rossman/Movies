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

// Displays Next Page button always and dipslays Previous Page button ONLY when page > 
function updatePagerUI() {
    // clear previous pager
    pager.replaceChildren("");

    // Define pager
    let pagerDisplay = document.createElement("div");

    //Tailwind styling for pagination container
    pagerDisplay.className = "flex items-center justify-center gap-6 py-6";

    // HTML for pager
    pagerDisplay.innerHTML = `
        ${pagerValue > 1 
            ? `
                <!-- Previous Page button -->
                <button 
                    class="border px-4 py-2 bg-white hover:bg-gray-200 rounded-lg shadow text-sm transition"
                    id="prev-btn">
                    ← Previous Page
                </button>
            ` 
            : ``}

        <!-- Page Number -->
        <h4 class="text-lg font-semibold text-gray-700">
            Page: ${pagerValue}
        </h4>

        <!-- Next Page button -->
        <button 
            class="border px-4 py-2 bg-white hover:bg-gray-200 rounded-lg shadow text-sm transition"
            id="next-btn">
            Next Page →
        </button>
    `;

    // Display pager
    pager.appendChild(pagerDisplay);

    // Add event listeners only if the buttons exist
    let prevBtn = document.querySelector("#prev-btn");
    let nextBtn = document.querySelector("#next-btn");

    if (prevBtn) {
        // Event listener for prevBtn
        prevBtn.addEventListener("click", () => {
            // Reduce page by 1
            pagerValue--;
            handleFormSubmit(new Event("submit"), true);
        });
    }

    // Add event listener for nextBtn
    nextBtn.addEventListener("click", () => {
        // Increase page by 1
        pagerValue++;
        handleFormSubmit(new Event("submit"), true);
    });
}

// Error output  
function showError(message) {
    // Clear page of any previous results
    displayDiv.replaceChildren("");
    pager.replaceChildren("");

    // Define error on DOM
    let errorBox = document.createElement("div");

    // Error styling
    errorBox.className =
        "bg-red-100 border border-red-300 text-red-900 rounded-xl p-6 mx-auto mt-6 max-w-xl text-center shadow";
        
        // Define errorBox html content
        errorBox.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">⚠️ Error</h2>
        <p class="text-lg">${message}</p>
    `;

    // Append errorBox to DOM
    displayDiv.appendChild(errorBox);
}


// Runs every time the user performs a search OR clicks next/prev
let handleFormSubmit = (Event, isPagination = false) => {
    // Prevents DOM from refreshing
    Event.preventDefault();

    // NEW SEARCH resets to page 1
    if (!isPagination) {
        pagerValue = 1;
    }

    // Validate user input
    if (userInput.value === "") {
        // Display error
        showError("Please enter a movie or series name and try again.");
        // End function here if this error displays
        return;
    }

    // Build API request URL
    let requestUrl = `https://www.omdbapi.com/?apikey=ce01743c&type=${dropdownChoice.value}&s=${userInput.value}&page=${pagerValue}`;

    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {

        // Handle search errors
        if (data.Response === "False") {
            // Display error
            showError("No results found. Please try a different search.");
            // End function here if this error displays
            return;
        }

        // Clear previous results
        displayDiv.replaceChildren("");

        // Grid styling for result display
        displayDiv.className =
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

        let searchResults = data.Search;

        // Loop through results to create UI cards
        for (let i = 0; i < searchResults.length; i++) {
            let title = searchResults[i].Title;
            let year = searchResults[i].Year;
            let poster = searchResults[i].Poster;

            let card = document.createElement(`div`);
            let img = document.createElement(`img`);

            // Card styling
            card.className =
                "bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition";

            // Class for poster
            img.className =
                "rounded-lg w-full h-80 object-contain bg-gray-100 mb-4";

                //Define Card's HTML 
                card.innerHTML = `
                <h2 class="text-xl font-bold text-gray-800 mb-1">${title}</h2>
                <h4 class="text-gray-600 mb-2">Year of Release: ${year}</h4>
            `;

            // Set attribute of image
            img.setAttribute("src", poster);

            // Build result card
            card.appendChild(img);
            displayDiv.appendChild(card);
        }

        // Update paginator
        updatePagerUI();
    });
};


// Function Calls
init();