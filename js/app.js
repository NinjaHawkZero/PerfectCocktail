//Instanciate The Classes
const ui= new UI();
const cocktail = new CocktailAPI();
const cocktailDB = new CocktailDB();


//Create The Event Listeners
function eventListeners() {
        //Document Ready
        document.addEventListener('DOMContentLoaded', documentReady);


        //Add Event Listener When The Form Is Submitted
        const searchForm = document.querySelector('#search-form');
        if(searchForm)
        {searchForm.addEventListener('submit', getCocktails);}


        //The results div listener
        const resultsDiv = document.querySelector('#results');
        if(resultsDiv) {
            resultsDiv.addEventListener('click', resultsDelegation);
        }
}

eventListeners();



//Get Cocktails
function getCocktails(e) {
    e.preventDefault(); 

    const searchTerm = document.querySelector('#search').value; 

    //Check If Something Is On The Search Term
    if(searchTerm === '') { //Call UI print message
        ui.printMessage('Please Add An Entry Into The Form', 'danger');
 

    } else {
        //Server Response From Promise
        let serverResponse;


        //Type Of Search (ingredients, cocktails, or name)

        const type = document.querySelector('#type').value;

        //Evaluate The Type Of Method And Then Execute The Query

        switch(type) {

            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
                case 'ingredient':
                    serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                    break;
                    case 'category':
                        serverResponse = cocktail.getDrinksByCategory(searchTerm);
                        break;
                        case 'alcohol':
                            serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                            break;
        }

        ui.clearResults();
        
        
        //Query By The Name Of The Drink
    
    serverResponse.then(cocktails => {if(cocktails.cocktails.drinks === null) {
        //Nothing Exists
        ui.printMessage('No results, try a different term', 'danger');
    } else


    {if(type === 'name') {
        //Display With Ingredients
        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
    } else {
        //Display without Ingredients (category, alcohol, ingredient)
        ui.displayDrinks(cocktails.cocktails.drinks);


    }

}
});}}
    
    
    

//Delegation for the #results area
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe'))
    {cocktail.getSingleRecipe(e.target.dataset.id).then(recipe => {
        //Displays Single Recipe Into A Modal
        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
    })
    }

    //When Favorites BTN is clicked
    if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite')) 
        {
            //Remove The Class
            e.target.classList.remove('is-favorite');
        e.target.textContent = '+';
    
    //Remove From Storage
    cocktailDB.removeFromDB(e.target.dataset.id);
    
    }
else
{   //Add The Class
    e.target.classList.add('is-favorite');
    e.target.textContent ='-';


    //Get Info
    const cardBody = e.target.parentElement;

    const drinkInfo = {
        id: e.target.dataset.id,
        name: cardBody.querySelector('.card-title').textContent,
        image: cardBody.querySelector('.card-img-top').src
    }
    
    //Add Into The Storage
    cocktailDB.saveIntoDB(drinkInfo);

}


    }

}


//Document Ready
function documentReady() {

    //Display On Load The Favorites From Storage
    ui.isFavorite();


    //Select The Search Category Select
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.displayCategories();
    }

    //When Favorites Page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable) {
        //Get The Favorites From Storage And Display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        //When View Or Delete Are Clicked
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            //Delegation
            if(e.target.classList.contains('get-recipe')) {
                cocktail.getSingleRecipe(e.target.dataset.id).then(recipe => {
                //Displays Single Recipe Into A Modal
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);

            }
        )
    }
    //When Remove Button Is Clicked In Favorites
    if(e.target.classList.contains('remove-recipe')) {
        //Remove From DOM
        ui.removeFavorite(e.target.parentElement.parentElement);

        //Remove From Local Storage
        cocktailDB.removeFromDB(e.target.dataset.id)
    }
    }
        )}}