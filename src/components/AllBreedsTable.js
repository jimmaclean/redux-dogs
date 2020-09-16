import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllBreeds} from '../store';

const Table = (props) => <table {...props}>{props.children}</table>

const Row = ({groupName, breedCount, url}) => (
    <tr>
        <td>{groupName}</td>
        <td>{breedCount}</td>
        <td>
            <a href={url}>view</a>
        </td>
    </tr>  
)
const testArray = [];
for(let i = 0; i < 5; i++) {
    testArray.push({name: `Dog breed group ${i+1}`});
}
class AllBreedsTable extends Component {
    constructor() {
        super();
      }
    componentDidMount() {
        this.props.fetchAllBreeds()
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
                    {this.props.allBreedGroups.map((value, index) => <Row key={index} groupName={value.name} breedCount={value.subBreeds.length} url="/1"/>)}
                </tbody>
            </Table>
        );
    }
}

export default connect(
    (state) => ({allBreedGroups: state.allBreedGroups}),
    {fetchAllBreeds}
)(AllBreedsTable)