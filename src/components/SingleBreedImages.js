import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleBreed, fetchImagesForBreed } from "../store";

const MAX_IMGS = 3;

const Image = ({ src }) => (
  <li className="gallery-item">
    <img src={src}></img>
  </li>
);

const Gallery = ({ imageSrcArray }) => (
  <ol className="gallery-list">
    {imageSrcArray.slice(0, MAX_IMGS).map((imgSrc, index) => (
      <Image src={imgSrc} key={index} />
    ))}
  </ol>
);
const BackLink = () => <Link to="/">{"<- Back"}</Link>;

class SingleBreedImages extends Component {
  componentDidMount() {
    if (this.props.breed && this.props.breed.images.length === 0) {
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
            {this.props.breed.subBreeds.length > 0 && (
              <ul>
                {this.props.breed.subBreeds.map((subBreed, index) => (
                  <li key={index}>{subBreed}</li>
                ))}
              </ul>
            )}

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
