// STEP 1 : Create functioning search bar that records user's typed input. Will have a drop down choice of what user wants to search for, a search bar, and a search button. Must record user's typed input and choice.
    // Types will be movies or series
// STEP 2: Use user's input to search to check against api. If data is available, retrieve data from the api to be used to display on screen.
    // This will pull all data in the search results to be prepared to display
// STEP 3: Loop through search results, and create elements on html to display results from the search. When user does another search, the results must clear themselves and show new ones only
    // This will show results for user's search
// STEP 4: To be able to show all results, create pager 
    // This will make the site more interactive for user

//Global Variables
let searchBtn = document.querySelector(`#search-button`)
let searchForm = document.querySelector(`#search-form`);
let userInput = document.querySelector(`#user-input`);


// Functions
function init () {

}

// Function will fire when form is submitted
let handleFormSubmit = (Event) => {
    Event.preventDefault();

    // Set if statements for user requirements
    if (userInput.value === "") {
        // Display error for user to type something
        return;
    }
    // Pulls API and inserts search for name
    let requestUrl = `http://www.omdbapi.com/?apikey=ce01743c&s=${userInput.value}`;
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

// Function Calls & Event Listeners
init();
searchForm.addEventListener("submit", handleFormSubmit);