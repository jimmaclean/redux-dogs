import React from 'react';

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
export default () => (
    <Table>
        <thead>
            <tr>
                <th>Breed group</th>
                <th colSpan="2">Number of breeds</th>
            </tr>
        </thead>
        <tbody>
            {testArray.map((value, index) => <Row key={index} groupName={value.name} breedCount="0" url="/1"/>)}
        </tbody>
    </Table>
);