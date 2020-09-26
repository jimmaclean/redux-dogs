import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { fetchAllBreeds } from "./store";
import AllBreedsTable from "./components/AllBreedsTable";
import SingleBreedImages from "./components/SingleBreedImages";

class App extends Component {
  componentDidMount() {
    this.props.fetchAllBreeds();
  }
  render() {
    return (
      <>
        {this.props.isLoaded ? (
          <Router>
            <div>
              <Switch>
                <Route
                  path="/breed/:breed?"
                  render={({ match }) => (
                    <SingleBreedImages breedToShow={match.params.breed} />
                  )}
                />
                <Route path="/">
                  <AllBreedsTable />
                </Route>
              </Switch>
            </div>
          </Router>
        ) : (
          <h3>App Loading</h3>
        )}
      </>
    );
  }
}

export default connect((state) => ({ isLoaded: state.isLoaded }), {
  fetchAllBreeds,
})(App);
