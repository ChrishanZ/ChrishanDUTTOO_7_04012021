export default class Recipe {
  constructor(
    id,
    name,
    serving,
    ingredients,
    time,
    ustensils,
    description,
    appliance
  ) {
    this.id = id;
    this.name = name;
    this.serving = serving;
    this.ingredients = ingredients;
    this.time = time;
    this.ustensils = ustensils;
    this.description = description;
    this.appliance = appliance;
  }

  display() {
    console.log(this.description);
    console.log(this.ingredients);
    let li = document.createElement("li");
    let divUpper = document.createElement("div");

    let divLower = document.createElement("div");
    let divLowerHeader = document.createElement("div");
    let divLowerContent = document.createElement("div");
    let h2LowerHeader = document.createElement("h2");
    let pLowerHeader = document.createElement("p");
    let pLowerContentDescription = document.createElement("p");

    divLowerHeader.className = "lower__header";
    divLowerContent.className = "lower__content";

    h2LowerHeader.textContent = `${this.name}`;
    pLowerHeader.textContent = `${this.time} min`;
    divLowerHeader.appendChild(h2LowerHeader);
    divLowerHeader.appendChild(pLowerHeader);

    let divRecipe = document.createElement("div");
    divRecipe.className = "lower__content-recipe";
    let divDescription = document.createElement("div");
    divDescription.className = "lower__content-description";

    for (let i = 0; i < this.ingredients.length; i++) {
      let divRecipeContainer = document.createElement("div");
      divRecipeContainer.className = "lower__content-recipe__container";
      let h2LowerContent = document.createElement("h2");
      let pLowerContent = document.createElement("p");

      h2LowerContent.textContent = `${this.ingredients[i].ingredient} :`;
      pLowerContent.textContent = `${
        this.ingredients[i].quantity ? this.ingredients[i].quantity : ""
      } ${this.ingredients[i].unit ? this.ingredients[i].unit : ""}`;

      divRecipeContainer.appendChild(h2LowerContent);
      divRecipeContainer.appendChild(pLowerContent);
      divRecipe.appendChild(divRecipeContainer);
    }
    pLowerContentDescription.textContent = `${this.description}`;
    divDescription.appendChild(pLowerContentDescription);

    divLowerContent.appendChild(divRecipe);
    divLowerContent.appendChild(divDescription);

    divLower.appendChild(divLowerHeader);
    divLower.appendChild(divLowerContent);

    divUpper.className = "upper";
    divLower.className = "lower";
    li.appendChild(divUpper);
    li.appendChild(divLower);

    return li;
  }
}
