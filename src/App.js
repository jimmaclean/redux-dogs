import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import {fetchAllBreeds} from './store';
import AllBreedsTable from "./components/AllBreedsTable";
import SingleBreedImages from "./components/SingleBreedImages";

class App extends Component {
  componentDidMount() {
    this.props.fetchAllBreeds()
  }
  render() {
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
  }
};

export default connect(
  null,
  {fetchAllBreeds}
)(App)
