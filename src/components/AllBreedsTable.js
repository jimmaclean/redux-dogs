import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sortAllBy } from "../store";

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
const SortIcon = ({isDown}) => (isDown ?  "⇩" : "⇧");

class AllBreedsTable extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th onClick={() => this.props.sortAllBy("name")}>
              Breed group
              {this.props.sortedBy.col === "name" && (
                this.props.sortedBy.isAscending ? " [A⬊z]" : " [Z⬊a]"
              )}
            </th>
            <th onClick={() => this.props.sortAllBy("breedCount")} colSpan="2">
              Number of breeds
              {this.props.sortedBy.col === "breedCount" && (
                  this.props.sortedBy.isAscending ? " [0⬊9]" : " [9⬊0]"
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.allBreedGroups.map((value, index) => (
            <Row
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

export default connect(
  (state) => ({
    allBreedGroups: state.allBreedGroups,
    sortedBy: state.sortedBy,
  }),
  {
    sortAllBy,
  }
)(AllBreedsTable);
