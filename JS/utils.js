// MELANGER LES ELEMENTS D'UN TABLEAU
export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// METTRE LA PREMIERE LETTRE EN LETTRE CAPITALE
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const deleteDuplicatesSearched = (array) => {
  let cleanDuplicate = [];
  array.forEach((item) => {
    cleanDuplicate.indexOf(item) == -1 ? cleanDuplicate.push(item) : '';
  });
  return cleanDuplicate;
};
