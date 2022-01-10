import Recipe from "./Recipe.js";
// recette__liste
export default class Homepage {
  constructor() {
    this.recipes = [];
    this.ingredients = [];
    this.appareil = [];
    this.ustensils = [];

    const containerRecette = document.querySelector(".recette__liste");
    const listeRecette = containerRecette.children;

    // const p = document.createElement("p");
    // p.textContent = "debug";
    // p.addEventListener("click", (e) => {
    //   // console.log("ingrédients :", this.ingredients);
    //   // console.log("appareil :", this.appareil);
    //   // console.log("ustensils :", this.ustensils);
    //   this.filterRecipe(this.recipes[0].ustensils);
    //   console.log(this.recipes);
    // });
    // listeRecette.parentElement.appendChild(p);

    const barreRecherche = document.querySelector("#barreRecherche");

    barreRecherche.addEventListener("input", (e) => {
      for (let i = 0; i < this.recipes.length; i++) {
        if (barreRecherche.value.length > 2) {
          // this.filterWhole(barreRecherche.value, this.recipes[i]);
          if (
            this.recipes[i].name
              .toLowerCase()
              .includes(barreRecherche.value.toLowerCase()) ||
            this.recipes[i].description
              .toLowerCase()
              .includes(barreRecherche.value.toLowerCase()) ||
            this.recipes[i].appliance
              .toLowerCase()
              .includes(barreRecherche.value.toLowerCase())
          ) {
            listeRecette[i].style.display = "flex";
          } else {
            listeRecette[i].style.display = "none";
          }
        } else {
          listeRecette[i].style.display = "flex";
        }
      }
    });

    const dropDownIngredientsDown = document.querySelector("#ingredientsDown");
    const dropDownAppareilDown = document.querySelector("#appareilDown");
    const dropDownUstensilsDown = document.querySelector("#ustensilsDown");
    const dropDownIngredientsUp = document.querySelector("#ingredientsUp");
    const dropDownAppareilUp = document.querySelector("#appareilUp");
    const dropDownUstensilsUp = document.querySelector("#ustensilsUp");

    const dropDownIngredientsContainer = document.querySelector(
      "#listeTriIngredients"
    );
    const dropDownAppareilContainer =
      document.querySelector("#listeTriAppareil");
    const dropDownUstensilsContainer =
      document.querySelector("#listeTriUstensils");

    dropDownIngredientsDown.addEventListener("click", () => {
      dropDownIngredientsDown.style.display = "none";
      dropDownIngredientsUp.style.display = "flex";
      dropDownAppareilDown.style.display = "flex";
      dropDownAppareilUp.style.display = "none";
      dropDownUstensilsDown.style.display = "flex";
      dropDownUstensilsUp.style.display = "none";
      dropDownIngredientsContainer.style.width = "700px";
      dropDownIngredientsContainer.parentElement.style.width = "660px";

      dropDownAppareilContainer.parentElement.style.width = "170px";
      dropDownUstensilsContainer.parentElement.style.width = "170px";

      if (dropDownUstensilsContainer.firstChild) {
        while (dropDownUstensilsContainer.firstChild) {
          dropDownUstensilsContainer.firstChild.remove();
        }
      }
      if (dropDownAppareilContainer.firstChild) {
        while (dropDownAppareilContainer.firstChild) {
          dropDownAppareilContainer.firstChild.remove();
        }
      }

      for (let i = 0; i < this.ingredients.length; i++) {
        const li = document.createElement("li");
        li.textContent = this.ingredients[i];
        dropDownIngredientsContainer.appendChild(li);
      }
    });
    dropDownAppareilDown.addEventListener("click", () => {
      dropDownAppareilDown.style.display = "none";
      dropDownAppareilUp.style.display = "flex";

      dropDownIngredientsDown.style.display = "flex";
      dropDownIngredientsUp.style.display = "none";
      dropDownUstensilsDown.style.display = "flex";
      dropDownUstensilsUp.style.display = "none";

      dropDownAppareilContainer.style.width = "700px";
      dropDownAppareilContainer.parentElement.style.width = "660px";

      dropDownIngredientsContainer.parentElement.style.width = "170px";
      dropDownUstensilsContainer.parentElement.style.width = "170px";

      if (dropDownUstensilsContainer.firstChild) {
        while (dropDownUstensilsContainer.firstChild) {
          dropDownUstensilsContainer.firstChild.remove();
        }
      }
      if (dropDownIngredientsContainer.firstChild) {
        while (dropDownIngredientsContainer.firstChild) {
          dropDownIngredientsContainer.firstChild.remove();
        }
      }

      for (let i = 0; i < this.appareil.length; i++) {
        const li = document.createElement("li");
        li.textContent = this.appareil[i];
        dropDownAppareilContainer.appendChild(li);
      }
    });
    dropDownUstensilsDown.addEventListener("click", () => {
      dropDownUstensilsDown.style.display = "none";
      dropDownUstensilsUp.style.display = "flex";
      dropDownIngredientsDown.style.display = "flex";
      dropDownIngredientsUp.style.display = "none";
      dropDownAppareilDown.style.display = "flex";
      dropDownAppareilUp.style.display = "none";
      dropDownUstensilsContainer.style.width = "700px";
      dropDownUstensilsContainer.parentElement.style.width = "660px";

      dropDownIngredientsContainer.parentElement.style.width = "170px";
      dropDownAppareilContainer.parentElement.style.width = "170px";

      if (dropDownAppareilContainer.firstChild) {
        while (dropDownAppareilContainer.firstChild) {
          dropDownAppareilContainer.firstChild.remove();
        }
      }
      if (dropDownIngredientsContainer.firstChild) {
        while (dropDownIngredientsContainer.firstChild) {
          dropDownIngredientsContainer.firstChild.remove();
        }
      }

      for (let i = 0; i < this.ustensils.length; i++) {
        const li = document.createElement("li");
        li.textContent = this.ustensils[i];
        dropDownUstensilsContainer.appendChild(li);
      }
    });
    dropDownIngredientsUp.addEventListener("click", () => {
      dropDownIngredientsUp.style.display = "none";
      dropDownIngredientsDown.style.display = "flex";

      while (dropDownIngredientsContainer.firstChild) {
        dropDownIngredientsContainer.firstChild.remove();
      }

      dropDownIngredientsContainer.parentElement.style.width = "170px";
    });
    dropDownAppareilUp.addEventListener("click", () => {
      dropDownAppareilUp.style.display = "none";
      dropDownAppareilDown.style.display = "flex";
      while (dropDownAppareilContainer.firstChild) {
        dropDownAppareilContainer.firstChild.remove();
      }
      dropDownAppareilContainer.parentElement.style.width = "170px";
    });
    dropDownUstensilsUp.addEventListener("click", () => {
      dropDownUstensilsUp.style.display = "none";
      dropDownUstensilsDown.style.display = "flex";
      while (dropDownUstensilsContainer.firstChild) {
        dropDownUstensilsContainer.firstChild.remove();
      }
      dropDownUstensilsContainer.parentElement.style.width = "170px";
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

  filterWhole(string, domElem) {
    console.log("string", string);
    console.log("domElem", domElem);
  }

  displayDropdown() {
    console.log("active");
  }
}
