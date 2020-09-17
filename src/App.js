import React from "react";
import "./App.css";
import AllBreedsTable from "./components/AllBreedsTable";
import SingleBreedImages from './components/SingleBreedImages';

const App = () => {
  return (
    <div>
      <SingleBreedImages />
      <AllBreedsTable />
    </div>
  );
};

export default App;
