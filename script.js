console.log(`${cities.length} communes chargées`);

// const cities = [
//     {
//         "code":"01001",
//         "nom":"L'Abergement-Clémenciat",
//         "population":767,
//         "codesPostaux":["01400"],
//         "codeDepartement":"01"
//     },

let arr = cities.filter((city) => city.population >= 300000)
/* ? filter() */
/* For each city in the cities array of objects, check the city.population and if true
add it to the arr filtered array */

arr.sort((a, b) => b.nom[0].localeCompare(a.nom[0]));
/* * localeCompare */
/* localeCompare() compares two strings according to the locale and returns a numeric value
indicating the relationship between the strings */

// arr.forEach(city => console.log(city.nom, city.population));

function getCitiesByDept(department) {
    return cities.filter((city) => city.codeDepartement === department);
}

/* * Exercise 2.2 */

let hauteSavoie = getCitiesByDept('73')
// hauteSavoie.sort((a, b) => a.nom[0].localeCompare(b.nom[0]));
// hauteSavoie.forEach(city => console.log(city.nom));

/* * Exercise 2.3 */

function displayCity(array) {
    array.sort((a, b) => a.nom[0].localeCompare(b.nom[0]));
    return array.forEach(city => console.log(city.codeDepartement + " - " + city.nom))
}
displayCity(hauteSavoie);

