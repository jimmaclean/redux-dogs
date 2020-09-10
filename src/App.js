import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const getAllBreeds = () => {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json());
}

class App extends Component {
  componentDidMount() {
    getAllBreeds().then(({message}) => console.log(message))
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
    )

  }
}

export default App;
