console.time('index.js');
('use strict');

//importation
import { renderRecipes } from './JS/getData.js';
import * as cards from './JS/displayCards.js';
import * as filters from './JS/displayFiltersForOf.js';
import * as openclosefilters from './JS/openCloseFilters.js';
import * as search from './JS/searchForOf.js';

// RECUPERE LA DATA ET HYDRATE LES COMPOSANTS
export const GET_RECIPES_HYDRATE = (renderRecipes.prototype.getAllRecipes =
  function (recipes) {
    cards.DISPLAY_CARDS(recipes);
    filters.DISPLAY_FILTERS(recipes);
    search.IS_SEARCH(recipes);
    search.IS_TAGGED(recipes);
    return recipes;
  });

// ASSURE L'OUVERTURE ET LA FERMETURE DES FILTRES
let buttons = document.querySelectorAll('.filter__select');
let buttonValue;
buttons.forEach((btn) => {
  // OPEN CLOSE FILTER
  btn.addEventListener('click', () => {
    buttonValue = btn.getAttribute('value');
    openclosefilters.isFiltersInteractive(btn, buttonValue);
  });
});

// --------------------------------------------------------

// AFFICHE LE TEMPS D'EXECUTION DU SCRIPT JS
console.timeEnd('index.js');
/*
// EFFACE LA CONSOLE APRES 7 SECONDE
setTimeout(() => {
  console.clear('this is the first message');
}, 7000);
*/
