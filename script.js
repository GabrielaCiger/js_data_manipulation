console.log(`${cities.length} communes chargées`);

function ready(callback) {
  if (document.readyState != 'loading'){

      /* The document.readyState property in JavaScript
      represents the loading status of the current HTML document. */

    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);

    /* Adding an event listener to a document using
    JavaScript’s addEventListener method allows you
    to execute a specified function when a specific
    event occurs (e.g., click, mouseover, load). */
  }
}

// insérer votre code ci-dessous

/* * Exercise 4.1 */

// crée en mémoire une structure de données pour stocker un div

function main() {

    // crée en mémoire une structure de données pour stocker un div
    const el = document.createElement('div');
    el.innerHTML =  'Je suis un div';

    // insère le div dans le DOM (cela l'affiche)
    document.body.appendChild(el);

}

// ready(main);

/* On the HTML page we can see the text we inserted into el.innerHTML */

/* ! Exercise 4.2 */

function getCitiesByDept(department) {
    return cities.filter((city) => city.codeDepartement === department);
}

function showCitiesInDiv(index){
    let filteredCities = getCitiesByDept(index);

    const divDepartement = document.getElementById("divDepartement");

    const titleDepartement = document.createElement("h2");
    titleDepartement.textContent = `Departement ${index}`
    divDepartement.appendChild(titleDepartement);

    const numberCities = document.createElement("h3");
    numberCities.textContent = "Result : " + filteredCities.length + " cities found";
    divDepartement.appendChild(numberCities);

    filteredCities.forEach((city) => {

        let divCity = document.createElement("div");
        divCity.className = "cityContainer";
        divDepartement.appendChild(divCity);

        let nameCity = document.createElement("h4");
        nameCity.textContent = `${city.nom}`;
        divCity.appendChild(nameCity);

    });
};

// showCitiesInDiv("38");



/* ! Exercise 4.3 */

const searchInputIndex = document.getElementById("inputText");
let searchButton = document.getElementById("searchCities");
let deptArray = [];
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    const divDepartement = document.getElementById("divDepartement");

    if (!searchInputIndex.value || searchInputIndex.value.trim() === "") {
        divDepartement.innerHTML = "";
        const searchPage = document.createElement("h2");
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
            showCitiesInDiv(searchInputIndex.value);
        }
    }
});

/* ! Exercise 4.4 */

function removeSpecChar(input){
    input = input.normalize('NFD')
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    return input;
}

let arrayCities = cities.map(city => {
    return { ...city, nomNoSpecialChar: removeSpecChar(city.nom) };
});

function searchCity() {
    let userInput = document.getElementById("input").value;
    userInput = removeSpecChar(userInput);

    divDepartement.innerHTML = "";

    if (deptArray.length === 0) {

        let searchArray = arrayCities.filter((city) => city.nom.includes(userInput));

        if (searchArray.length === 0) {

            const noMatchMessage = document.createElement("h4");
            noMatchMessage.textContent = `No city matches the search.`;
            divDepartement.appendChild(noMatchMessage);

        } else {

            searchArray.forEach((matchedCity) => {
                const cityName = document.createElement("h4");
                cityName.textContent = `${matchedCity.nom}`;
                divDepartement.appendChild(cityName);
            });
        }
    }

    document.getElementById('text').innerHTML = userInput;
}



