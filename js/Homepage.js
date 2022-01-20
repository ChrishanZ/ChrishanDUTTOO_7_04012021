import Recipe from "./Recipe.js";
// recette__liste
export default class Homepage {
  constructor() {
    this.recipes = []; // tab inital 50 recettes --> l'affiche dans le dom
    this.recipesFiltered = []; // tab --->  ok donc si par exemple 4 resultats --> compare les titres avec ceux du dom et je display none le reste
    this.ingredients = [];
    this.ingredientsFiltered = [];
    this.appareil = [];
    this.appareilFiltered = [];
    this.ustensils = [];
    this.ustensilsFiltered = [];

    const containerRecipes = document.querySelector(".recette__liste");
    const barreRecherche = document.querySelector("#barreRecherche");

    barreRecherche.addEventListener("input", (e) => {
      if (barreRecherche.value.length < 3) {
        this.recipesFiltered = [];
        this.deleteAllRecipes();
        this.displayAllRecipes();
      } else {
        for (let i = 0; i < this.recipes.length; i++) {
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
            const index = this.recipesFiltered.indexOf(this.recipes[i]);
            if (index < 0) {
              this.recipesFiltered.push(this.recipes[i]);
            } 
          } else {
            const index = this.recipesFiltered.indexOf(this.recipes[i]);
            if (index > -1) {
              this.recipesFiltered.splice(index, 1);
            }
          }
        }
        this.deleteAllRecipes();
        for (let i = 0; i < this.recipesFiltered.length; i++) {
          containerRecipes.appendChild(this.recipesFiltered[i].display());
        }
      }
      console.log("this.recipesfiltered :", this.recipesFiltered);

      const filterIngredients = document.querySelector("#ingredients");
      filterIngredients.addEventListener("click", () => {
        let tagsIngredients = [];
        if (this.recipesFiltered.length > 1) {
          for (let i = 0; i < this.recipesFiltered.length; i++) {
            console.log(this.recipesFiltered[i].ingredients);
            for (
              let j = 0;
              j < this.recipesFiltered[i].ingredients.length;
              j++
            ) {
              tagsIngredients.push(
                this.recipesFiltered[i].ingredients[j].ingredient
              );
            }
          }
        } else {
          //faire conditions si tableau recipesFiltered est vide
        }
        console.log([...new Set(tagsIngredients)]);
      });

      // const filterIngredients = document.querySelector("");
      // const filterIngredients = document.querySelector("");
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
