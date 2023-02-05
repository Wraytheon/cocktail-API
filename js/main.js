// Constants to store the API URL for searching and getting a random drink
const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const randomApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Selecting the search button, random button, input field, and result container element from the HTML
const searchBtn = document.querySelector("#search-btn");
const randomBtn = document.querySelector("#random-btn");
const input = document.querySelector("#input");


// Adding a click event listener to the search button
searchBtn.addEventListener("click", function () {
  // Get the value of the input field
  const drinkName = input.value;

  // If the input field is empty, return and do nothing
  if (!drinkName) return;

  // Fetch the data from the API URL by concatenating the input value to the apiUrl constant
  fetch(apiUrl + drinkName)
    .then((res) => res.json()) // Convert the response to JSON
    .then((data) => {
      // Get the first drink from the data and store it in a variable
      const drink = data.drinks[0];

      // Get the drink name, ingredients, and instructions
      const drinkName = drink.strDrink;
      const ingredientArr = [];
      for (let i = 1; i <= 15; i++) {
        // Check if there is no ingredient at the current iteration, break the loop
        if (!drink[`strIngredient${i}`]) break;
        // Push the ingredient and its measure to the ingredientArr array
        ingredientArr.push(
          `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
        );
      }
      const ingredients = ingredientArr.join(", ")
      const instructions = drink.strInstructions;

      // Update the HTML of the result container with the drink details
      document.getElementById("result-container").classList.remove("hide")

      document.getElementById("drinkName").innerHTML = drinkName;

      document.querySelector(".instructions").textContent = instructions;

      document.querySelector(".ingredients").textContent = ingredients
    });
});

// Adding a click event listener to the random button
randomBtn.addEventListener("click", function () {
  // Fetch the data from the random API URL
  fetch(randomApiUrl)
    .then((res) => res.json()) // Convert the response to JSON
    .then((data) => {
      // Get the first drink from the data and store it in a variable
      const drink = data.drinks[0];

      // Get the drink name, ingredients, and instructions
      const drinkName = drink.strDrink;
      const ingredientArr = [];
      for (let i = 1; i <= 15; i++) {
        // Check if there is no ingredient at the current iteration, break the loop
        if (!drink[`strIngredient${i}`]) break;
        // Push the ingredient and its measure to the ingredientArr array
        ingredientArr.push(
          `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
        );
      }
      const ingredients = ingredientArr.join(", ")
      const instructions = drink.strInstructions;

      // Update the HTML of the result container with the drink details
      document.getElementById("result-container").classList.remove("hide")

      document.getElementById("drinkName").innerHTML = drinkName;

      document.querySelector(".instructions").textContent = instructions;

      document.querySelector(".ingredients").textContent = ingredients
    });
});
