// Constants for the API URLs to get drinks data.
const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const randomApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// DOM elements for the search and random buttons, and the input field.
const searchBtn = document.querySelector("#search-btn");
const randomBtn = document.querySelector("#random-btn");
const input = document.querySelector("#input");

// Function to get drink data from the API.
function getDrinkData(url) {
  // Drink name to be searched, initialized as an empty string.
  let drinkName = "";
  // If the URL is for searching, get the drink name from the input field.
  if (url === apiUrl) {
    drinkName = input.value;
    // If the input field is empty, return without making a fetch request.
    if (!drinkName) return;
    // Append the drink name to the URL for the fetch request.
    url += drinkName;
  }

  // Fetch the drink data from the API.
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //Log the data retrieved
      console.log(data.drinks[0])
      // Get the first drink from the returned data.
      const drink = data.drinks[0];
      // Get the name of the drink.
      const drinkName = drink.strDrink;
      // Array to store the ingredients.
      const ingredientArr = [];
      // Loop through up to 15 ingredients.
      for (let i = 1; i <= 15; i++) {
        // If there is no ingredient for the current index, break the loop.
        if (!drink[`strIngredient${i}`]) break;
        // Push the ingredient and its measure to the ingredients array.
        ingredientArr.push(
          `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
        );
      }
      // Join the ingredients array into a string.
      const ingredients = ingredientArr.join(", ");
      // Get the instructions for the drink.
      const instructions = drink.strInstructions;
      // Get the image source for the drink.
      const image = drink.strDrinkThumb;

      // Set the drink name
      document.getElementById("drinkName").innerHTML = drinkName;
      // Set the image source
      document.querySelector("img").src = image
      // Set the img alt text
      document.querySelector("img").alt = `Photo of ${drinkName} in a ${drink.strGlass}`

      // Set the instructions for the drink in the HTML.
      document.querySelector(".instructions").textContent = instructions;
      // Set the ingredients for the drink in the HTML.
      document.querySelector(".ingredients").textContent = ingredients;

      // Remove the hide class from the result container to show the results.
      document.getElementById("result-container").classList.remove("hide");
    });
}

// Event listener for the search button.
searchBtn.addEventListener("click", function () {
  // Call the getDrinkData function with the API URL for searching.
  getDrinkData(apiUrl);
});

// Event listener for the random button.
window.addEventListener("load", function () {
  // Call the getDrinkData function with the API URL for searching.
  getDrinkData(randomApiUrl);
});
