//Importation
import * as index from '../indexMap.js';

// GET DATA
export const GET_RECIPES = (async () => {
  await fetch('./data/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index.GET_RECIPES_HYDRATE(data.recipes);
    })
    .catch((error) => {
      error.message;
    });
})();

// FUNCTION CONSTRUCTEUR
export function renderRecipes(data) {
  this.data = data;
  this.returnRecipes = function (data) {
    return data;
  };
}
