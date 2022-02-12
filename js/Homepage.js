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
    this.listIngredients = document.querySelector("#listeTriIngredients");
    this.listAppareil = document.querySelector("#listeTriAppareil");
    this.listUstensils = document.querySelector("#listeTriUstensils");
    this.filtreButtons = document.querySelector(".tri__elements");
    const ingredientsFilter = document.querySelector("#ingredients");
    const appareilFilter = document.querySelector("#appareil");
    const ustensilsFilter = document.querySelector("#ustensils");
    this.arrowIngredients = ingredientsFilter.querySelector(".arrow");
    this.arrowAppareil = appareilFilter.querySelector(".arrow");
    this.arrowUstensils = ustensilsFilter.querySelector(".arrow");

    const arrowUp = `url("../images/logos/arrowUp.svg")`;
    const arrowDown = `url("../images/logos/arrowDown.svg")`;

    const barreRecherche = document.querySelector("#barreRecherche");
    let refresh = false;

    barreRecherche.addEventListener("input", (e) => {
      let texteSaisi = e.target.value.toLowerCase();
      refresh = true;
      if (texteSaisi.length > 2) {
        this.recipesFiltered = this.filtrer(
          this.recipes,
          texteSaisi,
          [],
          [],
          []
        );
        if (this.recipesFiltered.length === 0) {
          console.log("Display : pas de résultat");
          const h2 = document.createElement("h2");
          h2.textContent = "Pas de résultat existant pour votre recette.";
          this.containerRecipes.parentElement.appendChild(h2);
          this.deleteAllRecipes();
        } else {
          this.deleteAllRecipes();
          this.displayFilteredRecipes(this.recipesFiltered);
        }
      } else {
        if (refresh === true) {
          this.deleteAllRecipes();
          this.displayAllRecipes();
        }
      }
    });

    this.arrowIngredients.addEventListener("click", () => {
      if (this.arrowIngredients.style.backgroundImage === arrowUp) {
        this.arrowIngredients.style.backgroundImage = arrowDown;
        this.deleteAllDomListe(this.listIngredients);
      } else {
        this.arrowIngredients.style.backgroundImage = arrowUp;
        this.showFilters(
          this.ingredients,
          this.listIngredients,
          "blue",
          this.ingredientsFiltered
        );
      }
    });

    this.arrowAppareil.addEventListener("click", () => {
      if (this.arrowAppareil.style.backgroundImage === arrowUp) {
        this.arrowAppareil.style.backgroundImage = arrowDown;
        this.deleteAllDomListe(this.listAppareil);
      } else {
        this.arrowAppareil.style.backgroundImage = arrowUp;
        this.showFilters(
          this.appareil,
          this.listAppareil,
          "yellow",
          this.appareilFiltered
        );
      }
    });
    this.arrowUstensils.addEventListener("click", () => {
      if (this.arrowUstensils.style.backgroundImage === arrowUp) {
        this.arrowUstensils.style.backgroundImage = arrowDown;
        this.deleteAllDomListe(this.listUstensils);
      } else {
        this.arrowUstensils.style.backgroundImage = arrowUp;
        this.showFilters(
          this.ustensils,
          this.listUstensils,
          "red",
          this.ustensilsFiltered
        );
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
  displayFilters(filters) {
    for (let i = 0; i < filters.length; i++) {
      this.containerRecipes.appendChild(recipesFiltered[i].display());
    }
  }

  showFilters(tableauDropdown, domToPushLi, color, dropDownFiltered) {
    for (let i = 0; i < tableauDropdown.length; i++) {
      const li = document.createElement("li");
      li.addEventListener("click", (event) => {
        console.log(event.target.textContent);
        const li = document.createElement("li");
        li.textContent = event.target.textContent;
        li.classList.add(color);
        this.filtreButtons.appendChild(li);
        for (let i = 0; i < this.recipes.length; i++) {
          if (
            this.recipes[i].ingredients.filter(
              (element) =>
                element.ingredient.toLowerCase() === event.target.textContent
            ).length > 0
          ) {
            this.recipesFiltered.push(this.recipes[i]);
          }
        }
        dropDownFiltered.push(event.target.textContent);
        this.deleteAllRecipes();
        this.displayFilteredRecipes(this.recipesFiltered);
        this.arrowIngredients.style.backgroundImage =
          "url('../images/logos/arrowDown.svg')";
        this.deleteAllDomListe(this.listIngredients);
      });
      li.textContent = tableauDropdown[i];
      domToPushLi.appendChild(li);
    }
  }

  filtrer(tableauRecette, champSaisi, tagIngredient, tagUstensil, tagAppareil) {
    let firstresult = tableauRecette.filter(function (recette) {
      return (
        recette.name.toLowerCase().includes(champSaisi) ||
        recette.description.toLowerCase().includes(champSaisi) ||
        recette.ingredients.find((x) => x.ingredient.includes(champSaisi))
      );
    });
    // firstresult = firstresult.filter(tagIngredient);
    // firstresult = firstresult.filter(tagUstensil);
    // firstresult = firstresult.filter(tagAppareil);
    return firstresult;
  }
}
