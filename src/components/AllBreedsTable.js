import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchAllBreeds, fetchImagesForBreed} from '../store';

const Table = (props) => <table {...props}>{props.children}</table>

const Row = ({groupName, breedCount, onClick}) => (
    <tr>
        <td>{groupName}</td>
        <td>{breedCount}</td>
        <td>
            <Link to={`/${groupName}`}>view</Link>
            <button onClick={()=> onClick(groupName)}>Load {groupName} images</button>
        </td>
    </tr>  
)

class AllBreedsTable extends Component {
    constructor() {
        super();
      }
    componentDidMount() {
        // this.props.fetchAllBreeds()
    }
    handelClick = (breed) => {
        this.props.fetchImagesForBreed(breed)
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
                    {this.props.allBreedGroups.map((value, index) => <Row onClick={this.props.fetchImagesForBreed} key={index} groupName={value.name} breedCount={value.subBreeds.length} url="/1"/>)}
                </tbody>
            </Table>
        );
    }
}

export default connect(
    (state) => ({allBreedGroups: state.allBreedGroups}),
    {fetchImagesForBreed}
)(AllBreedsTable)