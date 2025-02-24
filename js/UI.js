class UI{

    //Display All The Drink Categories
    displayCategories() {
        const categoryList = cocktail.getCategories().then(categories => {
            const catList = categories.categories.drinks;

            //Append A First Option Without Value
            const firstOption = document.createElement('option');
            firstOption.textContent = '- Select -';
            firstOption.value = '';
            document.querySelector('#search').appendChild(firstOption);

            //Append Into The Select
            catList.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category.strCategory;
                option.value = category.strCategory.split('').join('_');

                document.querySelector('#search').appendChild(option);

            })
        })
    }


    //Display The Cocktails Without Ingredients
    displayDrinks(drinks) {
        //Show The Results

    const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        //Insert The Results
        const resultsDiv = document.querySelector('#results');

        //Loop through Drinks
        drinks.forEach(drink => {resultsDiv.innerHTML += `
            <div class="col-md-4">
            <div class="card my-3">
            <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
        +
        </button>
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <div class="card-body">
            <h2 class="card-title text-center">${drink.strDrink}</h2>
            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                        </div>
        </div>
        
        `});
        this.isFavorite();

    }

    //Displays Drinks With Ingredients
    displayDrinksWithIngredients(drinks) {


        //Show The Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';


        //Insert The Results
        const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink => { resultsDiv.innerHTML += `
        <div class="col-mid-6">
        <div class="card my-3">
        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
        +
        </button>
        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

        <div class="card-body">
        <h2 class="card-title text-center">${drink.strDrink}</h2>
        <p class="card-text font-weight-bold">Instructions:</p>
        <p class="card-text">
        ${drink.strInstructions}
        </p>
        <p class="card-text">
        <ul class="list-group">
        <li class="list-group-item alert alert-danger">Ingredients</li> 
        ${this.displayIngredients(drink)}
        </ul>
        </p>
        <p class="card-text font-weight-bold">Extra Information:</p>
        <p class="card-text">
            <span class="badge badge-pill badge-success">
            ${drink.strAlcoholic}
            </span>
            <span class="badge badge-pill badge-warning">
            Category:${drink.strCategory}
            </span>

            </p>

        </div>
        </div>
        </div>
        
        `;
    
    
    });
    this.isFavorite();

    }

    //Prints The Ingredients And Measurements
    displayIngredients(drink) {
        let ingredients = [];
        for(let i=1; i< 16; i++)
        { const ingredientMeasure = {};
            if(drink[`strIngredient${i}`] !== null) {
            ingredientMeasure.ingredient = drink [`strIngredient${i}`];
            ingredientMeasure.measure = drink [`strMeasure${i}`];
            ingredients.push(ingredientMeasure);

        
        
        } 
    console.log(ingredients);
     }

     //Build The Template
     let ingredientsTemplate = '';
     ingredients.forEach(ingredient => {ingredientsTemplate +=`
        <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
     
     
     
     `;}

      );
      return ingredientsTemplate;

    
    }

    //Display Single Recipe
    displaySingleRecipe(recipe) {
        //Get The Variables
        const modalTitle = document.querySelector('.modal-title'),
                modalDescription = document.querySelector('.modal-body .description-text'),
                modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

                //Set The Titles
                modalTitle.innerHTML = recipe.strDrink;
                modalDescription.innerHTML = recipe.strInstructions;

        //Display The Ingredients
        modalIngredients.innerHTML=this.displayIngredients(recipe);
    }

    //Displays A Custom Message
    printMessage(message, className) {
        const div = document.createElement('div');


        //Add The HTML
        div.innerHTML =`
                <div class="alert alert-dismissable alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
                </div>
        
        
        
        
        `;


        //Insert Before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        //Remove After 3 seconds
        setTimeout(() => {document.querySelector('.alert').remove();},3000);


    }

    //Clear Previous Results
    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML=''
    }



    //Displays Favorites From Storage
    displayFavorites(favorites) {

        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(drink => {
            const tr = document.createElement('tr');

            tr.innerHTML= `
            <td>
            <img src="${drink.image}" alt="${drink.name}" width=100>
            </td>
            <td>${drink.name}</td>
            <td>
                <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}"
                class="btn btn-success get-recipe">

                        View
                    </a>            
                </td>
                <td>
                <a href="#"  data-id="${drink.id}"
                class="btn btn-danger remove-recipe">

                        Remove
                    </a>            
                </td>
            `;
            favoritesTable.appendChild(tr);
        })
    }
    //Remove Single Favorite From DOM 
    removeFavorite(element){element.remove();}

    //Add A Class When Cocktail Is Favorited
    isFavorite() {
        const drinks = cocktailDB.getFromDB();
        drinks.forEach(drink => {

            //Destructuring the id

            let{id} = drink;
            //Select The Favorites
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink) {
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }
}