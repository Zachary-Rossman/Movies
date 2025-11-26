//Global Variables
let userInput = document.querySelector(`#user-input`);


// Functions
function init () {
    let requestUrl = 'http://www.omdbapi.com/?apikey=ce01743c&s=${userInput}';

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