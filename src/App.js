import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AllBreedsTable from "./components/AllBreedsTable";
import SingleBreedImages from "./components/SingleBreedImages";

const App = () => {
  return (
    <Router>
      <div>
        <Route
          path="/:breed?"
          render={({ match }) => (
            <SingleBreedImages breedToShow={match.params.breed} />
          )}
        />
        <AllBreedsTable />
      </div>
    </Router>
  );
};

export default App;
