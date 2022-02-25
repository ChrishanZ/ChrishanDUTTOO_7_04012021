// input search

// un tableau de recettes

let tableau = [{}, {}, {},]
let refresh = false;
let selectedtagIngredient = [];

let input = document.getElementByID('input');

input.addEventlistner('keyup', function(event) => {

	let textsaisi = event.value.textContent;

	// si textsaisi > 3 on fait un filtre sinon on fait rien

	if(textsaisi.length > 3) {
		//faire un filtre

		this.filtered = filtrer(tableau, textsaisi, [], [], []);

		// refresh tag ;

		refresh = true;

		if(resultat.length == 0) {
			// aucun resltat
		}else {
			// display les resultat sur screen
		}

	}else {
		//rien
		if(refresh == true) {
			// redisplay les 50recettes
		}
	}

})

						
function filtrer (tableauRecette, champSaisi, tagIngredien, tagustennsil, tagAppareil) {
	//
		let firstresult = tableauRecette.filter(champSaisi);

		firstresult = firstresult.filter(tagIngredien);
			firstresult = firstresult.filter(tagustennsil);
				firstresult = firstresult.filter(tagAppareil);

	return firstresult;
}

//




arrowIngredients.addEventListener("click", () => {
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
      if (
        barreRecherche.value.length < 3 &&
        this.ingredientsFiltered.length === 0 &&
        this.appareilFiltered.length === 0 &&
        this.ustensilsFiltered.length === 0
      ) {
        this.deleteAllDomListe(listIngredients);
        for (let i = 0; i < this.ingredients.length; i++) {
          const li = document.createElement("li");
          li.addEventListener("click", (event) => {
            console.log(event.target);
            const li = document.createElement("li");
            li.textContent = event.target.textContent;
            li.classList.add("blue");
            filtreButtons.appendChild(li);
            for (let i = 0; i < this.recipes.length; i++) {
              if (
                this.recipes[i].ingredients.filter(
                  (element) =>
                    element.ingredient.toLowerCase() ===
                    event.target.textContent
                ).length > 0
              ) {
                this.recipesFiltered.push(this.recipes[i]);
              }
            }
            this.ingredientsFiltered.push(event.target.textContent);

            this.deleteAllRecipes();
            this.displayFilteredRecipes(this.recipesFiltered);
            arrowIngredients.style.backgroundImage =
              "url('../images/logos/arrowDown.svg')";
            this.deleteAllDomListe(listIngredients);
          });

          li.textContent = this.ingredients[i];
          listIngredients.appendChild(li);
        }
      } else {
        let tabIngredients = [];
        for (let j = 0; j < this.recipesFiltered.length; j++) {
          for (
            let k = 0;
            k < this.recipesFiltered[j].ingredients.length;
            k++
          ) {
            tabIngredients.push(
              this.recipesFiltered[j].ingredients[k].ingredient
            );
          }
        }
        tabIngredients = [...new Set(tabIngredients)];
        for (let i = 0; i < tabIngredients.length; i++) {
          const li = document.createElement("li");
          li.addEventListener("click", (event) => {
            if (
              this.ingredientsFiltered.indexOf(
                event.target.textContent.toLowerCase()
              ) < 0
            ) {
              const li = document.createElement("li");
              li.textContent = event.target.textContent;
              li.classList.add("blue");
              filtreButtons.appendChild(li);
            }

            let newTab = [];
            for (let i = 0; i < this.recipesFiltered.length; i++) {
              if (
                this.recipesFiltered[i].ingredients.filter(
                  (element) =>
                    element.ingredient.toLowerCase() ===
                    event.target.textContent.toLowerCase()
                ).length > 0
              ) {
                if (this.recipesFiltered[i])
                  newTab.push(this.recipesFiltered[i]);
              }
            }
            this.recipesFiltered = newTab;
            newTab = [...new Set(newTab)];
            if (
              !this.ingredientsFiltered.includes(
                event.target.textContent.toLowerCase()
              )
            ) {
              this.ingredientsFiltered.push(
                event.target.textContent.toLowerCase()
              );
            }

            this.deleteAllRecipes();
            this.displayFilteredRecipes(this.recipesFiltered);
            arrowIngredients.style.backgroundImage =
              "url('../images/logos/arrowDown.svg')";
            this.deleteAllDomListe(listIngredients);
            console.log(this.ingredientsFiltered);
          });
          li.textContent = tabIngredients[i];
          listIngredients.appendChild(li);
        }
      }
    }
  });