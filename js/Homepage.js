import Recipe from "./Recipe.js";
// recette__liste
export default class Homepage {
  constructor() {
    this.recipes = []; // tab inital 50 recettes --> l'affiche dans le dom
    this.recipesFiltered = []; // tab --->  ok donc si par exemple 4 resultats --> compare les titres avec ceux du dom et je display none le reste
    this.ingredients = [];
    this.appareil = [];
    this.ustensils = [];

    const containerRecipes = document.querySelector(".recette__liste");
    const listeRecette = containerRecipes.children;

    const barreRecherche = document.querySelector("#barreRecherche");

    barreRecherche.addEventListener("input", (e) => {
      if (barreRecherche.value.length < 3) {
        this.recipesFiltered = [];
        this.deleteAllRecipes();
        this.displayAllRecipes();
      }
      for (let i = 0; i < this.recipes.length; i++) {
        if (barreRecherche.value.length > 2) {
          if (
            this.recipes[i].name
              .toLowerCase()
              .includes(barreRecherche.value.toLowerCase()) ||
            this.recipes[i].description
              .toLowerCase()
              .includes(barreRecherche.value.toLowerCase()) ||
            this.recipes[i].ingredients.find((x) =>
              x.ingredient
                .toLowerCase()
                .includes(barreRecherche.value.toLowerCase())
            )
          ) {
            console.log("filtered : ", this.recipes[i].name);
            const index = this.recipesFiltered.findIndex(
              (x) => x.name === this.recipes[i].name
            );
            this.deleteAllRecipes();
            if (index === -1) {
              this.recipesFiltered.push(this.recipes[i]);
            }
            for (let k = 0; k < this.recipesFiltered.length; k++) {
              containerRecipes.appendChild(this.recipesFiltered[k].display());
            }
          } else {
            const index = this.recipesFiltered.indexOf(this.recipes[i]);
            if (index > -1) {
              this.recipesFiltered.splice(index, 1);
              this.deleteAllRecipes();
              for (let k = 0; k < this.recipesFiltered.length; k++) {
                containerRecipes.appendChild(this.recipesFiltered[k].display());
              }
            }
            if (this.recipesFiltered.length === 0) {
            }
          }
        }
      }
      console.log("this.recipesfiltered :", this.recipesFiltered);
    });
  }

  async getRecipes() {
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();
      let tabIngredients = [];
      let tabAppareil = [];
      let tabUstensils = [];
      console.log("data", data);
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
          tabIngredients.push(recipe.ingredients[j].ingredient.toLowerCase()); // me sert à enlever les doublons et majuscules
        }
        tabAppareil.push(recipe.appliance.toLowerCase());
        for (let i = 0; i < recipe.ustensils.length; i++) {
          tabUstensils.push(recipe.ustensils[i].toLowerCase());
        }
      });
      this.ingredients = [...new Set(tabIngredients)];
      this.appareil = [...new Set(tabAppareil)];
      this.ustensils = [...new Set(tabUstensils)];
    } catch (e) {
      console.log("error in try/catch", e);
    }
  }
  displayAllRecipes() {
    const containerRecipes = document.querySelector(".recette__liste");
    for (let i = 0; i < this.recipes.length; i++) {
      containerRecipes.appendChild(this.recipes[i].display());
    }
  }
  deleteAllRecipes() {
    const containerRecipes = document.querySelector(".recette__liste");
    while (containerRecipes.firstChild) {
      containerRecipes.firstChild.remove();
    }
  }
}
