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
        this.recipes.push(recipe);
      });
    } catch (e) {
      console.log("error in try/catch", e);
    }
  }

  displayAllRecipes() {
    const containerRecipes = document.querySelector(".recette__liste");
    for (let i = 0; i < this.recipes.length; i++) {
      const liRecipe = document.createElement("li");
      liRecipe.textContent = this.recipes[i].name;
      containerRecipes.appendChild(liRecipe);
    }
  }
}
