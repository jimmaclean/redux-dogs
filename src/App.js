import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./tailwind.output.css";
import { fetchAllBreeds } from "./store";
import AllBreedsTable from "./components/AllBreedsTable";
import SingleBreedImages from "./components/SingleBreedImages";

class App extends Component {
  componentDidMount() {
    this.props.fetchAllBreeds();
  }
  render() {
    return (
      <div className="container mx-auto">
        <h1 className="text-xl text-brown font-bold py-6">Doggy McDogface</h1>
        {this.props.isLoaded ? (
          <Router>
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
          </Router>
        ) : (
          <h3>App Loading...</h3>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ isLoaded: state.isLoaded }), {
  fetchAllBreeds,
})(App);
