import Recipe from "./Recipe.js";
// recette__liste
export default class Homepage {
  constructor() {
    this.recipes = [];
  }

  async getRecipes() {
    console.log("fonction getrecipes");
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();
      console.log(data);
      data.recipes.forEach((recipe) => {
        this.recipes.push(
          new Recipe(
            recipe.id,
            recipe.name,
            recipe.serving,
            recipe.ingredients,
            recipe.time,
            recipe.ustensils,
            recipe.description,
            recipe.appliance
          )
        );
      });
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
}
