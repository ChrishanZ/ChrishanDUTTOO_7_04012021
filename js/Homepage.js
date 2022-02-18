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

    this.barreRecherche = document.querySelector("#barreRecherche");
    let refresh = false;

    this.barreRecherche.addEventListener("input", (e) => {
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
          document.querySelector(".tri__alert").style.display = "block";
          this.deleteAllRecipes();
        } else {
          document.querySelector(".tri__alert").style.display = "none";
          this.deleteAllRecipes();
          this.displayFilteredRecipes(this.recipesFiltered);
        }
      } else {
        if (refresh === true) {
          document.querySelector(".tri__alert").style.display = "none";
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
        this.addFilters(
          this.ingredients,
          this.listIngredients,
          "blue",
          this.ingredientsFiltered,
          this.arrowIngredients
        );
      }
    });

    this.arrowAppareil.addEventListener("click", () => {
      if (this.arrowAppareil.style.backgroundImage === arrowUp) {
        this.arrowAppareil.style.backgroundImage = arrowDown;
        this.deleteAllDomListe(this.listAppareil);
      } else {
        this.arrowAppareil.style.backgroundImage = arrowUp;
        this.addFilters(
          this.appareil,
          this.listAppareil,
          "yellow",
          this.appareilFiltered,
          this.arrowAppareil
        );
      }
    });
    this.arrowUstensils.addEventListener("click", () => {
      if (this.arrowUstensils.style.backgroundImage === arrowUp) {
        this.arrowUstensils.style.backgroundImage = arrowDown;
        this.deleteAllDomListe(this.listUstensils);
      } else {
        this.arrowUstensils.style.backgroundImage = arrowUp;
        this.addFilters(
          this.ustensils,
          this.listUstensils,
          "red",
          this.ustensilsFiltered,
          this.arrowUstensils
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
          tabIngredients.push(recipe.ingredients[j].ingredient.toLowerCase()); // me sert à enlever les majuscules
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

  addFilters(tableauDropdown, domToPushLi, color, dropDownFiltered, thisArrow) {
    let intermediaire = [];
    if (this.recipesFiltered.length > 0) {
      for (let i = 0; i < this.recipesFiltered.length; i++) {
        if (color === "blue") {
          for (let j = 0; j < this.recipesFiltered[i].ingredients.length; j++) {
            intermediaire.push(
              this.recipesFiltered[i].ingredients[j].ingredient.toLowerCase()
            );
          }
        } else if (color === "yellow") {
          intermediaire.push(this.recipesFiltered[i].appliance.toLowerCase());
        } else if (color === "red") {
          for (let j = 0; j < this.recipesFiltered[i].ustensils.length; j++) {
            intermediaire.push(
              this.recipesFiltered[i].ustensils[j].toLowerCase()
            );
          }
        }
      }
      tableauDropdown = intermediaire;
      intermediaire = [];
    }

    for (let i = 0; i < tableauDropdown.length; i++) {
      const li = document.createElement("li");
      li.addEventListener("click", (event) => {
        const li = document.createElement("li");
        li.textContent = event.target.textContent;
        li.classList.add(color);
        if (!dropDownFiltered.includes(event.target.textContent)) {
          this.filtreButtons.appendChild(li);
          dropDownFiltered.push(event.target.textContent);
        }

        this.recipesFiltered = this.filtrer(
          this.recipes,
          this.barreRecherche.value,
          this.ingredientsFiltered,
          this.appareilFiltered,
          this.ustensilsFiltered
        );

        this.deleteAllRecipes();
        this.displayFilteredRecipes(this.recipesFiltered);
        thisArrow.style.backgroundImage =
          "url('../images/logos/arrowDown.svg')";
        this.deleteAllDomListe(domToPushLi);
      });
      li.textContent = tableauDropdown[i];
      domToPushLi.appendChild(li);
    }
  }

  filtrer(tableauRecette, champSaisi, tagIngredient, tagAppareil, tagUstensil) {
    let firstresult = tableauRecette.filter(function (recette) {
      return (
        recette.name.toLowerCase().includes(champSaisi) ||
        recette.description.toLowerCase().includes(champSaisi) ||
        recette.ingredients.find((x) => x.ingredient.includes(champSaisi))
      );
    });

    if (tagIngredient.length > 0) {
      firstresult = firstresult.filter((el) => {
        let check = false;
        el.ingredients.filter((el2) => {
          if (tagIngredient.includes(el2.ingredient.toLowerCase())) {
            check = true;
          }
        });
        return check;
      });
    }

    if (tagAppareil.length > 0) {
      firstresult = firstresult.filter((recette) => {
        return tagAppareil.includes(recette.appliance.toLowerCase());
      });
    }
    if (tagUstensil.length > 0) {
      firstresult = firstresult.filter((recette) => {
        let ustensils = recette.ustensils.map((element) => {
          return element.toLowerCase();
        });

        for (let i = 0; i < tagUstensil.length; i++) {
          return ustensils.includes(tagUstensil[i]);
        }
      });
    }
    return firstresult;
  }
}
