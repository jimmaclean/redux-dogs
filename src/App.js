import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const getAllBreeds = () => {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json());
}
const allBreedsItems = ({breeds}) => {
  breeds.map(
    (breed, index) => <li key={index}>{breed}</li>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: []
    }
  }
  componentDidMount() {
    getAllBreeds().then(
      ({message}) => {
        let arr = [];
        Object.keys(message).map(breed => arr.push(breed))
        this.setState({breeds: arr})
        console.log(this.state)
      }
    )
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ol>
          {allBreedsItems(this.state.breeds)}
        </ol>
      </header>
    </div>
    )

  }
}

export default App;
