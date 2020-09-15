import { createStore } from "redux";
import { getAllBreeds } from "./lib/dogsApi";

const initialState = () => {
  return getAllBreeds().then(({ message }) => {
    let arrOfObjets = [];
    Object.keys(message).map((breed) =>
      arrOfObjets.push({
        name: breed,
        subBreeds: message[breed],
      })
    );
    return { brees: arrOfObjets };
  });
};
const SHOW_ALL = "SHOW_ALL";

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return initialState();
  }
};

export const showAll = () => {
  return {
    type: SHOW_ALL,
  };
};

export const store = createStore(reducer);

