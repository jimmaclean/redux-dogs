import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import { getAllBreeds, getAllBreedGroups } from "./lib/dogsApi";

const initialState = {
  allBreedGroups: [{
    name: 'doggy',
    subBreeds: [
      'fluffy',
      'small',
      'loud'
    ]
  }]
};

const transformData = (message) => {
  let arrOfObjets = [];
  Object.keys(message).map((breed) =>
    arrOfObjets.push({
      name: breed,
      subBreeds: message[breed],
    })
  );
  return arrOfObjets ;
};


const SHOW_ALL = "SHOW_ALL";
const LOAD_ALL = "LOAD_ALL";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return initialState();
    case LOAD_ALL:
      return {...state, allBreedGroups: action.payload}
    default:
      return state
  }

};
// Action creators
export const showAll = () => {
  return {
    type: SHOW_ALL,
  };
};
export const loadAll = (breeds) => (
  {type: LOAD_ALL, payload: breeds}
)

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

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

