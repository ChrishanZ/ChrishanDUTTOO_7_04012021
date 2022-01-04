import Homepage from "./Homepage.js";
console.log("homepage");

(async function () {
  let homepage = new Homepage();
  await homepage.getRecipes();
  homepage.displayAllRecipes();
})();
