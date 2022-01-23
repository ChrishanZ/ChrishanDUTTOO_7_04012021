import Homepage from "./Homepage.js";

(async function () {
  let homepage = new Homepage();
  await homepage.getRecipes();
  homepage.displayAllRecipes();
})();
