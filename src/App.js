import React from "react";
import "./App.css";
import AllBreedsTable from "./components/AllBreedsTable";
import { getAllBreedGroups } from "./lib/dogsApi";

const state = {
  allBreedGroups: []
};
const api = getAllBreedGroups().then(({ message }) => {
  Object.keys(message).map((breed) => {
    let subBreedCount = message[breed].length;
    state.allBreedGroups.push({
      name: breed,
      subBreedCount: subBreedCount,
      subBreeds: subBreedCount > 0 ? message[breed] : null,
    });
  });
});
const App = () => {
  return (
    <div>
      <AllBreedsTable />
    </div>
  );
};

export default App;
