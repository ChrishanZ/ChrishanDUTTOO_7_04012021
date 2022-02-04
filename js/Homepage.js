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

    this.containerRecipes = document.querySelector(".recette__liste");
    const barreRecherche = document.querySelector("#barreRecherche");

    barreRecherche.addEventListener("input", (e) => {
      if (barreRecherche.value.length < 3) {
        console.log("iffed");
        this.recipesFiltered = [];
        this.deleteAllRecipes();
        this.displayAllRecipes();
      } else {
        console.log("effed");
        console.log(this.ingredientsFiltered);
        if (
          this.ingredientsFiltered.length === 0 &&
          this.appareilFiltered.length === 0 &&
          this.ustensilsFiltered.length === 0
        ) {
          this.checkInput(this.recipes);
        } else {
          //faire la condition quand on a encore des tags
        }
        this.deleteAllRecipes();
        this.displayFilteredRecipes(this.recipesFiltered);
      }
    });

    const ingredientsFilter = document.querySelector("#ingredients");
    const arrowIngredients = ingredientsFilter.querySelector(".arrow");
    arrowIngredients.addEventListener("click", () => {
      const listIngredients = document.querySelector("#listeTriIngredients");
      if (
        arrowIngredients.style.backgroundImage ===
        `url("../images/logos/arrowUp.svg")`
      ) {
        this.deleteAllDomListe(listIngredients);
        arrowIngredients.style.backgroundImage =
          "url('../images/logos/arrowDown.svg')";
      } else {
        arrowIngredients.style.backgroundImage =
          "url('../images/logos/arrowUp.svg')";
        if (barreRecherche.value.length < 3) {
          console.log('test');
          this.deleteAllDomListe(listIngredients);
          for (let i = 0; i < this.ingredients.length; i++) {
            const li = document.createElement("li");
            li.textContent = this.ingredients[i];
            listIngredients.appendChild(li);
          }
        } else {
          //affiche avec this.recipesFiltered
          console.log("this.recipesFiltered :" , this.recipesFiltered);
          let tabIngredients = [];
          for (let j = 0; j < this.recipesFiltered.length; j++) {
            for (let k = 0; k < this.recipesFiltered[j].ingredients.length; k++) {
              tabIngredients.push(this.recipesFiltered[j].ingredients[k].ingredient);
            }
          }
          tabIngredients = [...new Set(tabIngredients)];
          console.log("ingredients filtered : ", this.ingredientsFiltered);
          for (let i = 0; i < tabIngredients.length; i++) {
            const li = document.createElement("li");
            li.textContent = tabIngredients[i];
            listIngredients.appendChild(li);
          }
        }
      }
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
    for (let i = 0; i < this.recipes.length; i++) {
      this.containerRecipes.appendChild(this.recipes[i].display());
    }
  }
  deleteAllRecipes() {
    while (this.containerRecipes.firstChild) {
      this.containerRecipes.firstChild.remove();
    }
  }
  deleteAllDomListe(domListe) {
    while (domListe.firstChild) {
      domListe.firstChild.remove();
    }
  }
  displayFilteredRecipes(recipesFiltered) {
    for (let i = 0; i < recipesFiltered.length; i++) {
      this.containerRecipes.appendChild(recipesFiltered[i].display());
    }
  }
  checkInput(liste) {
    for (let i = 0; i < liste.length; i++) {
      if (
        liste[i].name
          .toLowerCase()
          .includes(barreRecherche.value.toLowerCase()) ||
        liste[i].description
          .toLowerCase()
          .includes(barreRecherche.value.toLowerCase()) ||
        liste[i].ingredients.find((x) =>
          x.ingredient
            .toLowerCase()
            .includes(barreRecherche.value.toLowerCase())
        )
      ) {
        const index = this.recipesFiltered.indexOf(liste[i]);
        if (index < 0) {
          this.recipesFiltered.push(liste[i]);
        }
      } else {
        const index = this.recipesFiltered.indexOf(liste[i]);
        if (index > -1) {
          this.recipesFiltered.splice(index, 1);
        }
      }
    }
  }

  tagCheck() {

  }
}
