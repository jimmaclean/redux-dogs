import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBreeds, fetchImagesForBreed } from "../store";

const Table = (props) => <table {...props}>{props.children}</table>;

const Row = ({ groupName, breedCount }) => (
  <tr>
    <td>{groupName}</td>
    <td>{breedCount}</td>
    <td>
      <Link to={`/breed/${groupName}`}>view</Link>
    </td>
  </tr>
);

class AllBreedsTable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Breed group</th>
            <th colSpan="2">Number of breeds</th>
          </tr>
        </thead>
        <tbody>
          {this.props.allBreedGroups.map((value, index) => (
            <Row
              onClick={this.props.fetchImagesForBreed}
              key={index}
              groupName={value.name}
              breedCount={value.subBreeds.length}
              url="/1"
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default connect((state) => ({ allBreedGroups: state.allBreedGroups }), {
  fetchImagesForBreed,
})(AllBreedsTable);
