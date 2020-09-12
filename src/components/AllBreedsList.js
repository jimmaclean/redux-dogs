import React, { Component } from "react";
import {getAllBreeds} from '../lib/dogsApi';

class AllBreedsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
    };
  }
  componentDidMount() {
    getAllBreeds().then(({ message }) => {
      console.log(message);
      let arrOfObjets = [];
      Object.keys(message).map((breed) =>
        arrOfObjets.push({
          name: breed,
          subBreeds: message[breed],
        })
      );
      this.setState({ breeds: arrOfObjets });
      console.log(this.state);
    });
  }

  render() {
    return (
      <ol>
        {this.state.breeds.map((breed, index) => {
          if (breed.subBreeds.length > 0) {
            return (
              <React.Fragment key={index}>
                <li>{breed.name}</li>
                <ol>
                  {breed.subBreeds.map((subBreed, index) => (
                    <li key={index}>{subBreed}</li>
                  ))}
                </ol>
              </React.Fragment>
            );
          } else {
            return <li key={index}>{breed.name}</li>;
          }
        })}
      </ol>
    );
  }
}

export default AllBreedsList;
