import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import { getImagesForBreed, getAllBreedGroups } from "./lib/dogsApi";

const initialState = {
  allBreedGroups: [{
    name: 'doggy',
    subBreeds: [
      'fluffy',
      'small',
      'loud'
    ],
    images: []
  }]
};

const transformData = (message) => {
  let arrOfObjets = [];
  Object.keys(message).map((breed) =>
    arrOfObjets.push({
      name: breed,
      subBreeds: message[breed],
      images: []
    })
  );
  return arrOfObjets ;
};

export const getVisibleBreed = (allBreeds, visible) => {
  return allBreeds.filter(b => b.name === visible)[0]
};

const LOAD_ALL = "LOAD_ALL";
const LOAD_IMAGES_FOR_BREED = "LOAD_BREED_IMAGES";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL:
      return {...state, allBreedGroups: action.payload}
    case LOAD_IMAGES_FOR_BREED:
      return {...state, allBreedGroups: state.allBreedGroups.map(
        (breedGroup) => (
          breedGroup.name === action.payload.breed
          ? {...breedGroup, images: action.payload.images}
          : breedGroup
        )
      )}
    default:
      return state
  }

};
// Action creators
export const loadAll = (breeds) => (
  {type: LOAD_ALL, payload: breeds}
)

export const loadImagesForBreed = (breed, imageArray) => {
    return {type: LOAD_IMAGES_FOR_BREED, payload: {images: imageArray, breed: breed}}
};

export const fetchAllBreeds = () => {
  return (dispatch) => {
    getAllBreedGroups()
      .then(json => dispatch(
        loadAll(
          transformData(json.message)
          )
        )
      );
  }
};

export const fetchImagesForBreed = (breed) => {
  return (dispatch) => {
    getImagesForBreed(breed)
      .then(json => {
        dispatch(loadImagesForBreed(breed, json.message))});
  }
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

