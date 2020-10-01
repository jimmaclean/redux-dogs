import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sortAllBy } from "../store";

const Table = (props) => <table className="table-fixed w-full max-w-md" {...props}>{props.children}</table>;

const Row = ({ groupName, breedCount, lastRow }) => (
  <tr>
    <td className={getBodyCellsStyles(lastRow)}>{groupName}</td>
    <td className={getBodyCellsStyles(lastRow)}>{breedCount}</td>
    <td className={`${getBodyCellsStyles(lastRow)} text-center w-1/4`}>
      <Link to={`/breed/${groupName}`}>view</Link>
    </td>
  </tr>
);

const headerCellsStyles =
  "px-3 py-2 w-1/2 border-b border-solid border-black font-normal text-brown text-left hover:underline cursor-pointer";
const getBodyCellsStyles = (lastRow) =>
  lastRow
    ? "px-3 py-2 font-normal text-black capitalize"
    : "px-3 py-2 border-b border-solid border-grey font-normal text-black capitalize";

class AllBreedsTable extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th
              onClick={() => this.props.sortAllBy("name")}
              className={headerCellsStyles}
            >
              Breed group
              {this.props.sortedBy.col === "name" &&
                (this.props.sortedBy.isAscending ? " [A⬊z]" : " [Z⬊a]")}
            </th>
            <th
              onClick={() => this.props.sortAllBy("breedCount")}
              colSpan="2"
              className={headerCellsStyles}
            >
              Number of breeds
              {this.props.sortedBy.col === "breedCount" &&
                (this.props.sortedBy.isAscending ? " [0⬊9]" : " [9⬊0]")}
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.allBreedGroups.map((value, index, array) => (
            <Row
              key={index}
              groupName={value.name}
              breedCount={value.subBreeds.length}
              url="/1"
              lastRow={index === array.length - 1}
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
