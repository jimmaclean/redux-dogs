import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleBreed, fetchImagesForBreed } from "../store";

const MAX_IMGS = 3;

const Image = ({ src }) => <img src={src}></img>;
const Gallery = ({ imageSrcArray }) => (
  <div>
    {imageSrcArray.slice(0, MAX_IMGS).map((imgSrc, index) => (
      <Image src={imgSrc} key={index} />
    ))}
  </div>
);
const BackLink = () => <Link to="/">{"<- Back"}</Link>;

class SingleBreedImages extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if (
      !this.props.breed || this.props.breed.images.length === 0
    ) {
      this.props.fetchImagesForBreed(this.props.breedToShow);
    }
  }

  handelClick = () => {
    this.props.fetchImagesForBreed(this.props.breed.name);
  };
  render() {
    return (
      <div>
        <BackLink />
        <h3>Hi {this.props.breedToShow}</h3>
        {!this.props.breed ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <ul>
              {this.props.breed.subBreeds.map((subBreed, index) => (
                <li key={index}>{subBreed}</li>
              ))}
            </ul>
            <button onClick={() => this.handelClick()}>Random</button>
            <Gallery imageSrcArray={this.props.breed.images} />
          </>
        )}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    breed: getVisibleBreed(state.allBreedGroups, ownProps.breedToShow),
  }),
  {
    fetchImagesForBreed,
  }
)(SingleBreedImages);
