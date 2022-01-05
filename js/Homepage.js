import Recipe from "./Recipe.js";
// recette__liste
export default class Homepage {
  constructor() {
    this.recipes = [];
    this.ingredients = [];
    this.appareil = [];
    this.ustensils = [];

    const listeRecette = document.querySelector(".recette__liste");


    const p = document.createElement("p");
    p.textContent = "debug";
    p.addEventListener('click' , e =>{
      console.log("ingrédients :" , this.ingredients);
      console.log("appareil :" , this.appareil);
      console.log("ustensils :" , this.ustensils);
    })

    listeRecette.parentElement.appendChild(p);
    const barreRecherche = document.querySelector("#barreRecherche");

    barreRecherche.addEventListener("input", (e) => {
      if (barreRecherche.value.length > 2) {
        // for (let i = 0; i < this.ingredients.length; i++) {
        //   if(this.ingredients[i].includes(barreRecherche.value)){
        //     console.log('MATCH');
        //     console.log(this.ingredients[i]);
        //   }
        // }
        for (let k = 0; k < this.recipes.length; k++) {
          console.log(this.recipes[k]);
          
        }
       
      } else {
        console.log("moins de 3 caractères");
      }
      console.log(this.recipes);
    });
  }

  async getRecipes() {
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();
      let tabIngredients = [];
      let tabAppareil = [];
      let tabUstensils = [];
      console.log('data', data);
      data.recipes.forEach((recipe) => {
        this.recipes.push(
          new Recipe(
            recipe.id,
            recipe.name,
            recipe.servings,
            recipe.ingredients,
            recipe.time,
            recipe.ustensils,
            recipe.description,
            recipe.appliance
          )
        );
        for (let j = 0; j < recipe.ingredients.length; j++) {
          tabIngredients.push(recipe.ingredients[j].ingredient.toLowerCase()); // me sert à enlever les doublons avec accents et majuscules
        }  
        tabAppareil.push(recipe.appliance.toLowerCase());
        for (let i = 0; i < recipe.ustensils.length; i++) {
          tabUstensils.push(recipe.ustensils[i].toLowerCase());
        }
       
      });
      this.ingredients = [... new Set(tabIngredients)];
      this.appareil = [... new Set(tabAppareil)];
      this.ustensils = [... new Set(tabUstensils)];

      this.displayedRecipe = this.recipes;
    } catch (e) {
      console.log("error in try/catch", e);
    }
  }
  displayAllRecipes() {
    const containerRecipes = document.querySelector(".recette__liste");
    for (let i = 0; i < this.displayedRecipe.length; i++) {
      containerRecipes.appendChild(this.displayedRecipe[i].display());
    }
  }

  // filterRecipe(text){

  // }
}
