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
    this.startFilter = false;

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
        if (this.startFilter) {
          this.recipesFiltered = this.filtrer(
            this.recipesFiltered,
            texteSaisi,
            [],
            [],
            []
          );
        } else {
          this.recipesFiltered = this.filtrer(
            this.recipes,
            texteSaisi,
            [],
            [],
            []
          );
        }

        if (this.recipesFiltered.length === 0) {
          document.querySelector(".tri__alert").style.display = "block";
          this.deleteAllRecipes();
        } else {
          document.querySelector(".tri__alert").style.display = "none";
          this.deleteAllRecipes();
          this.displayFilteredRecipes(this.recipesFiltered);
        }
      } else {
        if (refresh === true && this.startFilter === false) {
          document.querySelector(".tri__alert").style.display = "none";
          this.deleteAllRecipes();
          this.displayAllRecipes();
        } else if (refresh === true && this.startFilter === true) {
          document.querySelector(".tri__alert").style.display = "none";
          this.deleteAllRecipes();
          this.recipesFiltered = this.filtrer(
            this.recipes,
            [],
            this.ingredientsFiltered,
            this.appareilFiltered,
            this.ustensilsFiltered
          );
          this.displayFilteredRecipes(this.recipesFiltered);
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
            if (
              !intermediaire.includes(
                this.recipesFiltered[i].ingredients[j].ingredient.toLowerCase()
              )
            ) {
              intermediaire.push(
                this.recipesFiltered[i].ingredients[j].ingredient.toLowerCase()
              );
            }
          }
        } else if (color === "yellow") {
          if (
            !intermediaire.includes(
              this.recipesFiltered[i].appliance.toLowerCase()
            )
          ) {
            intermediaire.push(this.recipesFiltered[i].appliance.toLowerCase());
          }
        } else if (color === "red") {
          for (let j = 0; j < this.recipesFiltered[i].ustensils.length; j++) {
            if (
              !intermediaire.includes(
                this.recipesFiltered[i].ustensils[j].toLowerCase()
              )
            ) {
              intermediaire.push(
                this.recipesFiltered[i].ustensils[j].toLowerCase()
              );
            }
          }
        }
      }
      tableauDropdown = intermediaire;
      intermediaire = [];
    }

    for (let i = 0; i < tableauDropdown.length; i++) {
      const li = document.createElement("li");
      li.addEventListener("click", (event) => {
        const div = document.createElement("div");
        const cross = document.createElement("span");
        cross.addEventListener("click", (element) => {
          this.deleteAllRecipes();
          let index = dropDownFiltered.indexOf(
            element.target.parentElement.textContent
          );
          if (index !== -1) {
            dropDownFiltered.splice(index, 1);
          }
          console.log(element);
          element.target.parentElement.remove();
          if (color === "blue") {
            this.ingredientsFiltered = dropDownFiltered;
          } else if (color === "yellow") {
            this.appareilFiltered = dropDownFiltered;
          } else if (color === "red") {
            this.ustensilsFiltered = dropDownFiltered;
          }

          console.log("ingredientsFiltered", this.ingredientsFiltered);
          console.log("appareilFiltered", this.appareilFiltered);
          console.log("ustensilsFiltered", this.ustensilsFiltered);
          this.recipesFiltered = this.filtrer(
            this.recipes,
            this.barreRecherche.value,
            this.ingredientsFiltered,
            this.appareilFiltered,
            this.ustensilsFiltered
          );
          this.displayFilteredRecipes(this.recipesFiltered);
          console.log("this.recipesFiltered", this.recipesFiltered);
          console.log("dropDownFiltered", dropDownFiltered);
        });
        div.textContent = event.target.textContent;
        div.classList.add(color);
        div.appendChild(cross);
        if (!dropDownFiltered.includes(event.target.textContent)) {
          this.filtreButtons.appendChild(div);
          dropDownFiltered.push(event.target.textContent);
        }
        if (this.startFilter) {
          this.recipesFiltered = this.filtrer(
            this.recipesFiltered,
            this.barreRecherche.value,
            this.ingredientsFiltered,
            this.appareilFiltered,
            this.ustensilsFiltered
          );
        } else {
          this.recipesFiltered = this.filtrer(
            this.recipes,
            this.barreRecherche.value,
            this.ingredientsFiltered,
            this.appareilFiltered,
            this.ustensilsFiltered
          );
        }

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
    this.startFilter = true;
    console.log("tableauRecette", tableauRecette);
    let firstresult = tableauRecette.filter(function (recette) {
      return (
        recette.name.toLowerCase().includes(champSaisi) ||
        recette.description.toLowerCase().includes(champSaisi) ||
        recette.ingredients.find((x) => x.ingredient.includes(champSaisi))
      );
    });

    if (tagIngredient.length > 0) {
      firstresult = firstresult.filter((element) => {
        let check = 0;
        for (let i = 0; i < element.ingredients.length; i++) {
          if (
            tagIngredient.includes(
              element.ingredients[i].ingredient.toLowerCase()
            )
          ) {
            check += 1;
          }
          if (check === tagIngredient.length) {
            return element;
          }
        }
      });
    }

    if (tagAppareil.length > 0) {
      firstresult = firstresult.filter((recette) => {
        return tagAppareil.includes(recette.appliance.toLowerCase());
      });
    }
    if (tagUstensil.length > 0) {
      firstresult = firstresult.filter((element) => {
        let check = 0;
        for (let i = 0; i < element.ustensils.length; i++) {
          if (tagUstensil.includes(element.ustensils[i].toLowerCase())) {
            check += 1;
          }
          if (check === tagUstensil.length) {
            return element;
          }
        }
      });
    }
    return firstresult;
  }
}
