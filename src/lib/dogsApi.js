export const getAllBreeds = () => {
  return fetch("https://dog.ceo/api/breeds/list/all").then((response) =>
    response.json()
  );
};
