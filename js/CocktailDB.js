class CocktailDB {


    //Save The Recipes Into Local Storage
    saveIntoDB(drink) {
        const drinks = this.getFromDB();

        drinks.push(drink);

        //Add New Array Into Local Storage
        localStorage.setItem('drinks', JSON.stringify(drinks));

    }

    //Removes element from The Local Storage
    removeFromDB(id) {
        const drinks = this.getFromDB();

        //Loop
        drinks.forEach((drink,index) => {
            if(id === drink.id) {drinks.splice(index, 1);}
        });

        //Set The Array Into Local Storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    //Return recipes from Storage
    getFromDB() {
        let drinks;
        //Check From Local Storage

        if(localStorage.getItem('drinks') === null) {
            drinks = [];
        }
        else
        {drinks = JSON.parse(localStorage.getItem('drinks'));}

        return drinks;
    }
}