class CocktailAPI{

//Get Drinks By Name
   async getDrinksByName(name) {
       //Search By Name
       const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

       //Returns A JSON Response
       const cocktails = await apiResponse.json();

       return{
           cocktails
       }



    }


    //Get Recipes By Ingredient
    async getDrinksByIngredient(ingredient) {
        //Search By Ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        //Wait For Response Then Return JSON
        const cocktails = await apiResponse.json();

        return{cocktails}
    }

    //Get Single Recipe
    async getSingleRecipe(id) {
        //Search By Ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        //Wait For Response Then Return JSON
        const recipe = await apiResponse.json();

        return{recipe}


    }

    //Retrieves All The Categories From The REST API
    async getCategories() {
        const apiResponse = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        //Wait for Response and Return JSON
        const categories = await apiResponse.json();

        return {categories}
    }

    //Get Drinks By Category
    async getDrinksByCategory(category) {
    //Search By Category
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`);
    //Wait For Response Then Return JSON
    const cocktails = await apiResponse.json();

    return{cocktails}

    }

    //Get Alcohol Or Non Alcohol Drinks
    async getDrinksByAlcohol(term) {

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        const cocktails = await apiResponse.json();

        return {cocktails}


    }
}