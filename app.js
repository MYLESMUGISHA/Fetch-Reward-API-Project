// global variables
let results = document.getElementById("results");
let alertMessage = document.getElementById("user-alert");
let myForm = document.getElementById("form");
// function for submitting the form data
myForm.addEventListener('submit', function(e){
     //  preventing the page from laoding
    e.preventDefault();
    // getting the form values
    let name = document.getElementById("names").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let state = document.getElementById("state").value;
    let occupation = document.getElementById("occupation").value;
    let data = {
    "name": name,
    "email": email,
    "password": password,
    "occupation": occupation,
    "state": state
    }
    let api_url ="https://frontend-take-home.fetchrewards.com/form";
    //  form validation
    if (name === '' || email === '' || password === '') {
        alertMessage.style.display = "block";
        setTimeout(function(){
        alertMessage.style.display = "none";
        }, 5000);
    } else {
        // posting the form data to the API
        fetch(api_url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((data) => {
              // clearing the form after submission.
            document.getElementById("names").value = " ";
            document.getElementById("email").value = " ";
            document.getElementById("password").value = " ";
        // Provide feedback upon successful form submission
        results.innerHTML = `<p id="feedback-message">Thanks for completing the form :joy: ! </p>`
             // removing the message after 3 seconds
        setTimeout(function(){
            results.remove();
        }, 3000);
        })
        .catch(error => {
            console.error(error.message)
        })
    }
})
     // Getting data from the API
   function getData(){
    fetch('https://frontend-take-home.fetchrewards.com/form')
    .then((response) => response.json())
   .then(function(data) {
// 1. displaying occupations
let occupations = data.occupations
let select = document.getElementById("occupation");
function occupationsDropdown() {
            for (let i = 0; i < occupations.length; i++) {
            let optn = occupations[i];
             let el = document.createElement("option");
                el.textContent = optn;
                el.value = optn;
                select.appendChild(el);
            }
        }
    occupationsDropdown();
    // 2. displaying states
    let states = data.states
    let stateSelect = document.getElementById("state");
    function statesDropdown() {
   for (let i = 0; i < states.length; i++) {
  let stateOption = states[i].name + " " + states[i].abbreviation;
  let stateEl = document.createElement("option");
  stateEl.textContent = stateOption;
  stateEl.value = stateOption;
  stateSelect.appendChild(stateEl);
}
}
statesDropdown();
}
);
}
getData()