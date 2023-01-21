//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("button").addEventListener("click", getDrink)


function getDrink () {
  /* Set drink variable to users input */
  let drink =  "Lemon Drop"
  // document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
                    /*Gets query value from drink input*/
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const prefix = data.drinks[0];
      console.log(data.drinks)
      document.querySelector("img").src = prefix.strDrinkThumb
      document.querySelector(".name").innerText = prefix.strDrink
      document.querySelector(".instructions").innerText = prefix.strInstructions
      document.querySelector('ul').innerText = ''

      //! Add ingredients
      function createListOfIngredients(measure, ingredient) {
        const li = document.createElement('li')
        if (measure && ingredient) {
          li.innerText = `${measure} ${ingredient}`
        } else {
          li.innerText = `${ingredient}`
        }
        document.querySelector('ul').appendChild(li)
      }

      const ingredientSubstring = 'strIngredient'
      const measureSubstring = 'strMeasure'
      const drink = data.drinks[0]
      let measure = ''
      let ingredient = ''

      for (const [key, value] of Object.entries(drink)) {

        if (key.includes(ingredientSubstring) && value) {
          let measureKey = measureSubstring + key[key.length - 1]
          ingredient = value
          measure = drink[measureKey]
          console.log(`${measure} ${ingredient}`)
          createListOfIngredients(measure, ingredient)
        }
      }  

      
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

