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
                <SortIcon isDown={this.props.sortedBy.isAscending} />
              )}
            </th>
            <th onClick={() => this.props.sortAllBy("breedCount")} colSpan="2">
              Number of breeds
              {this.props.sortedBy.col === "breedCount" && (
                <SortIcon isDown={!this.props.sortedBy.isAscending} />
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
