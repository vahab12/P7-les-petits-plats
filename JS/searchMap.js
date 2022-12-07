import * as cards from './displayCards.js';
import * as filters from './displayFiltersMap.js';
import { showListOfTags, tagsArray } from './displayTags.js';
import { isFilterReload } from './openCloseFilters.js';
import { deleteDuplicatesSearched } from './utils.js';

export let theMillTurns = (recipes, filter) => {
  let searchedCards = [];
  //La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une
  // fonction fournie sur chaque élément du tableau appelant.
  recipes.map((recipe) => {
    if (
      // une recette ?
      recipe.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
      recipe.description
        .toLowerCase()
        .trim()
        //La méthode includes() permet de déterminer si un tableau contient
        //une valeur et renvoie true si c'est le cas, false sinon.
        .includes(filter.toLowerCase().trim()) ||
      // un appareil ?
      recipe.appliance
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim())
    ) {
      searchedCards.push(recipe);
    }
    // un ustensil ?
    recipe.ustensils.filter((elt) => {
      if (elt.toLowerCase().includes(filter.toLowerCase())) {
        searchedCards.push(recipe);
      }
    });
    // un ingredient ?
    recipe.ingredients.map((ingredient) => {
      if (
        ingredient.ingredient
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim())
      ) {
        searchedCards.push(recipe);
      }
    });
  });
  return searchedCards;
};

// LISTEN INPUT BARRE DE RECHERCHE
export let IS_SEARCH = (recipes) => {
  const takeIt = document.querySelector('.search__input');

  takeIt.addEventListener('input', () => {
    // si le nbre de lettre dépasse 2 alors :  LANCER ALGO
    if (takeIt.value.length > 2) {
      const searchedRecipes = theMillTurns(recipes, takeIt.value);
      const searchedRecipesDistinct = deleteDuplicatesSearched(searchedRecipes);

      cards.DISPLAY_CARDS(searchedRecipesDistinct);
      filters.DISPLAY_FILTERS(searchedRecipesDistinct);
      isFilterReload(recipes);
    } else {
      // SINON TABLEAU DES RECETTES
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);
      // ON VIDE LE TABLEAY DEStags

      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);

      document.querySelectorAll('.filter__custom-option').forEach((li) => {
        li.classList.add('filter__custom-option');
        li.classList.remove('filter__custom-option--enable');
      });
    }
  });
};

// LISTEN FOREACH INPUT FILTER
export let IS_TAGGED = (recipes) => {
  // LISTEN INPUT BARRE DE RECHERCHE DU FILTRE
  const takeFilter = document.querySelectorAll('.filter__select');

  takeFilter.forEach((input) => {
    input.addEventListener('input', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // ON VIDE LE TABLEAU DES TAGS
      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);
      cards.DISPLAY_CARDS(recipes);

      let value = input.getAttribute('data-value');
      let color = input.getAttribute('data-color');

      input.nextElementSibling.remove();

      filters.DISPLAY_FILTERS(recipes, input, input.value, value, color);
      input.parentNode.style.width = '66%';
      input.setAttribute('placeholder', 'Recherche un ingrédient');
      input.nextElementSibling.classList.add('filter__show');
      input.previousElementSibling.classList.add(
        'filter__custom-arrow--rotate'
      );
    });
  });
};
