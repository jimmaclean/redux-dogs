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
export default () => (
    <Table>
        <thead>
            <th>Breed group</th>
            <th colSpan="2">Number of breeds</th>
        </thead>
        <tbody>
            <Row groupName="Dog breed group 1" breedCount="0" url="/1"/>
            <Row groupName="Dog breed group 2" breedCount="12" url="/2"/>
            <Row groupName="Dog breed group 3" breedCount="2" url="/3"/>
        </tbody>
    </Table>
);