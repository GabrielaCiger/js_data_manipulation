console.log(`${cities.length} communes chargées`);

let deptArray = [];
let arrayCities = cities.map(city => {
    return {...city, nomWithoutSpecChar: removeSpecChar(city.nom)};
});

let searchArray = [];
let deptArraySorted = [];

function getCitiesByDept(department) {
    return cities.filter((city) => city.codeDepartement === department);
}

function displayNoMatchMessage() {
    divDepartement.innerHTML = "";
    const noMatchMessage = document.createElement("h4");
    noMatchMessage.textContent = "No city matches the search.";
    divDepartement.appendChild(noMatchMessage);
}

function removeSpecChar(input){
    input = input.normalize('NFD')
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    return input;
}

function displayCities(citiesArray) {
    divDepartement.innerHTML = "";
    divDepartement.classList.add("row", "g-4", "mt-4");

    citiesArray.forEach((matchedCity) => {
        // Create the card container
        const card = document.createElement("div");
        card.classList.add("card", "card-custom", "shadow-sm");

        // Create the card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Create and append the card title
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = matchedCity.nom;
        cardBody.appendChild(cardTitle);

        // Create and append the card text
        const cardText = document.createElement("p");
        cardText.classList.add("card-text", "text-center");
        cardText.textContent = `Population: ${matchedCity.population}`;
        cardBody.appendChild(cardText);

        // Append the card body to the card
        card.appendChild(cardBody);

        // Create a column to hold the card
        const col = document.createElement("div");
        col.classList.add("col-md-4", "d-flex", "justify-content-center");

        // Append the card to the column
        col.appendChild(card);

        // Append the column to the row
        divDepartement.appendChild(col);
    });
}

const searchInputIndex = document.getElementById("inputText");
let searchButton = document.getElementById("searchCities");

searchButton.addEventListener("click", function(event){
    event.preventDefault();
    const divDepartement = document.getElementById("divDepartement");

    if (!searchInputIndex.value || searchInputIndex.value.trim() === "") {
        divDepartement.innerHTML = "";
        deptArray = [];
        const searchPage = document.createElement("h3");
        searchPage.classList = "text-center mt-4";
        searchPage.textContent = `Please, enter a department number`
        divDepartement.appendChild(searchPage);
    } else {
        divDepartement.innerHTML = "";
        deptArray = getCitiesByDept(searchInputIndex.value);
        if (deptArray.length === 0){
            divDepartement.innerHTML = "";
            const errorPage = document.createElement("h2");
            errorPage.textContent = `Department with this number does not exist.`
            divDepartement.appendChild(errorPage);
        } else {
            divDepartement.innerHTML = "";
            displayCities(deptArray);
        }
    }
});

function searchCity() {
    let userInput = document.getElementById("input").value;
    userInput = removeSpecChar(userInput);

    if (deptArray.length > 0) {
        deptArraySorted = deptArray.map(city => {
            return { ...city, nomWithoutSpecChar: removeSpecChar(city.nom) };
        });
    }

    divDepartement.innerHTML = "";

    if (deptArray.length === 0) {
        searchArray = arrayCities.filter((city) => city.nomWithoutSpecChar.includes(userInput));
    } else {
        searchArray = deptArraySorted.filter((city) => city.nomWithoutSpecChar.includes(userInput));
    }

    if (searchArray.length === 0) {
        displayNoMatchMessage();
    } else {
        displayCities(searchArray);
    }
}

function sortInAlphabeticalOrder() {
    divDepartement.innerHTML = ""; // Clear previous results
    const checkBox = document.getElementById("byAlphabet");
    if (checkBox.checked) {
        const citiesToSort = searchArray.length > 0 ? searchArray : arrayCities;
        citiesToSort.sort((a, b) => a.nomWithoutSpecChar.localeCompare(b.nomWithoutSpecChar));
        displayCities(citiesToSort);
    }
}

let range = document.getElementById("myRange");
let rangeDiv = document.getElementById("minPop");

let valueOutput = document.createElement("p");
rangeDiv.appendChild(valueOutput);

function sortByPopulation() {
    divDepartement.innerHTML = "";

    if (deptArray.length === 0) {
        searchArray = arrayCities.filter(city => city.population >= range.value);
    } else {
        deptArraySorted = deptArray.map(city => {
            return { ...city, nomWithoutSpecChar: removeSpecChar(city.nom) };
        });
        searchArray = deptArraySorted.filter(city => city.population >= range.value);
    }
    displayCities(searchArray);
}

range.addEventListener("input", function() {
    range.oninput = function() {
        valueOutput.textContent = `Min. population : ${this.value}`;
    }
    sortByPopulation();
})

