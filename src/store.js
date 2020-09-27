import { createStore, applyMiddleware, bindActionCreators } from "redux";
import thunk from "redux-thunk";
import { getImagesForBreed, getAllBreedGroups } from "./lib/dogsApi";

const initialState = {
  isLoaded: false,
  allBreedGroups: [
    // {
    //   name: "doggy",
    //   subBreeds: ["fluffy", "small", "loud"],
    //   images: [],
    // },
  ],
};

const transformData = (message) => {
  let arrOfObjets = [];
  Object.keys(message).map((breed) =>
    arrOfObjets.push({
      name: breed,
      subBreeds: message[breed],
      breedCount: message[breed].length,
      images: [],
    })
  );
  return arrOfObjets;
};

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

export const getVisibleBreed = (allBreeds, visible) => {
  return allBreeds.filter((b) => b.name === visible)[0];
};

const LOAD_ALL = "LOAD_ALL";
const LOAD_IMAGES_FOR_BREED = "LOAD_BREED_IMAGES";
const SORT_ALL_BY = "SORT_ALL_BY";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL:
      return { ...state, allBreedGroups: action.payload, isLoaded: true };
    case LOAD_IMAGES_FOR_BREED:
      return {
        ...state,
        allBreedGroups: state.allBreedGroups.map((breedGroup) =>
          breedGroup.name === action.payload.breed
            ? { ...breedGroup, images: action.payload.images }
            : breedGroup
        ),
      };
    case SORT_ALL_BY:
      return {
        ...state,
        allBreedGroups: [...state.allBreedGroups].sort(
          compareValues(action.payload)
        ),
      };
    default:
      return state;
  }
};
// Action creators
export const loadAll = (breeds) => ({ type: LOAD_ALL, payload: breeds });

export const loadImagesForBreed = (breed, imageArray) => {
  return {
    type: LOAD_IMAGES_FOR_BREED,
    payload: { images: imageArray, breed: breed },
  };
};

export const fetchAllBreeds = () => {
  return (dispatch) => {
    getAllBreedGroups().then((json) =>
      dispatch(loadAll(transformData(json.message)))
    );
  };
};

export const fetchImagesForBreed = (breed) => {
  return (dispatch) => {
    getImagesForBreed(breed).then((json) => {
      dispatch(loadImagesForBreed(breed, json.message));
    });
  };
};

export const sortAllBy = (sortBy) => {
  return {
    type: SORT_ALL_BY,
    payload: sortBy,
  };
};

export const store = createStore(reducer, applyMiddleware(thunk));
