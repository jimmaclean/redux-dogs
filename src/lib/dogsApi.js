export const getAllBreeds = () => {
  return fetch("https://dog.ceo/api/breeds/list/all").then((response) =>
    response.json()
  );
};

export const getAllBreedGroups = () => {
  return fetch("https://dog.ceo/api/breeds/list/all").then((response) =>
    response.json()
  );
};


export const getImagesForBreed = (breed, number = 3) => {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random/${number}`).then((response) =>
    response.json()
  );
};