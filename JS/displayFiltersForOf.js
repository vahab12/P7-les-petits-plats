import { renderRecipes } from './getData.js';
import * as utils from './utils.js';
import { listenFilter } from './displayTags.js';

var distinctIngredients = [];
var distinctAppliance = [];
var distinctUstensils = [];

// NEW DATA ARRAY : distinct INGREDIENTS
export const displayFilterIngredients =
  (renderRecipes.prototype.displayFilterIngredients = function (data, filter) {
    for (const recipe of data) {
      for (const ingredient of recipe.ingredients) {
        let currentIngredient = ingredient.ingredient.toLowerCase().trim();

        if (distinctIngredients.length === 0) {
          distinctIngredients.push(currentIngredient);
        } else {
          let isIn = false;
          for (const itemInIngredients of distinctIngredients) {
            if (itemInIngredients === currentIngredient) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctIngredients.push(currentIngredient);
          }
        }
      }
    }
    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctIngredients;
  });

// NEW SET : distinct APPLIANCE
export const displayFilterAppliance =
  (renderRecipes.prototype.displayFilterAppliance = function (data, filter) {
    for (const recipe of data) {
      let currentAppliance = recipe.appliance.toLowerCase().trim();

      if (distinctAppliance.length === 0) {
        distinctAppliance.push(currentAppliance);
      } else {
        let isIn = false;
        for (const itemInAppliance of distinctAppliance) {
          if (itemInAppliance === currentAppliance) {
            isIn = true;
          }
        }
        if (!isIn) {
          distinctAppliance.push(currentAppliance);
        }
      }
      // }
    }
    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctAppliance.filter((appliance) =>
        appliance.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctAppliance;
  });

// NEW SET : distinct USTENSILS
export const displayFilterUstensils =
  (renderRecipes.prototype.displayFilterUstensils = function (data, filter) {
    for (const recipe of data) {
      for (const ustensil of recipe.ustensils) {
        let currentUstensil = ustensil.toLowerCase().trim();

        if (distinctUstensils.length === 0) {
          distinctUstensils.push(currentUstensil);
        } else {
          let isIn = false;
          for (const itemInUstensils of distinctUstensils) {
            if (itemInUstensils === currentUstensil) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctUstensils.push(currentUstensil);
          }
        }
      }
    }
    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctUstensils.filter((ustensil) =>
        ustensil.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctUstensils;
  });

// HYDRATE HTML DANS LES FILTRES
const list_HTML = (renderRecipes.prototype.getList_HTML = (
  distinctData,
  datacolor
) => {
  let li_HTML = '';
  distinctData.map((setLi) => {
    li_HTML += `<li class="filter__custom-option" data-color="${datacolor}">${utils.capitalize(
      setLi
    )}</li>`;
  });

  return li_HTML;
});

// TEST CONDITIONNEL POUR ROUTER HTML
export const hydrateFilter = (renderRecipes.prototype.hydrateFilter = function (
  data,
  value,
  btn,
  datacolor,
  filter
) {
  switch (value) {
    case 'Ingrédients':
      btn.insertAdjacentHTML(
        'afterend',
        `
        <ul class="filter__custom-menu filter__custom-menu--primary">
      ${list_HTML(displayFilterIngredients(data, filter), datacolor)}
      </ul>`
      );
      break;
    case 'Appareil':
      btn.insertAdjacentHTML(
        'afterend',
        `
        <ul class="filter__custom-menu filter__custom-menu--success">
      ${list_HTML(displayFilterAppliance(data, filter), datacolor)}
      </ul>`
      );
      break;
    case 'Ustensiles':
      btn.insertAdjacentHTML(
        'afterend',
        `
        <ul class="filter__custom-menu filter__custom-menu--danger">
      ${list_HTML(displayFilterUstensils(data, filter), datacolor)}
      </ul>`
      );
      break;
    default:
      break;
  }
});

// FONCTION GLOBALE
export const DISPLAY_FILTERS = (renderRecipes.displayFilters = function (
  data,
  btn,
  filter,
  value,
  color
) {
  if (btn && filter && value && color) {
    hydrateFilter(data, value, btn, color, filter);
  } else if (data) {
    document.querySelectorAll('.filter__select').forEach((button) => {
      let value = button.getAttribute('value');

      let datacolor = button.getAttribute('data-color');

      hydrateFilter(data, value, button, datacolor);
    });
  }

  // ECOUTE L'ENSEMBLE DES LI (textcontent et color)
  listenFilter(data, document.querySelectorAll('.filter__custom-option'));
});
