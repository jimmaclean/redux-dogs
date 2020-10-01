import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleBreed, fetchImagesForBreed } from "../store";

const MAX_IMGS = 3;

const Image = ({ src }) => (
  <li className="w-full border border-grey rounded">
    <img
      src={src}
      className="object-cover h-32 sm:h-48 md:h-64 xl:h-96 w-full"
    ></img>
  </li>
);

const Gallery = ({ imageSrcArray }) => (
  <ol className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 mb:mb-8">
    {imageSrcArray.slice(0, MAX_IMGS).map((imgSrc, index) => (
      <Image src={imgSrc} key={index} />
    ))}
  </ol>
);
const BackLink = () => (
  <Link
    to="/"
    className="px-6 py-2 border border-brown text-brow no-underline inline-block mb-4"
  >
    {"< Back"}
  </Link>
);

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
        <h3 className="capitalize text-lg font-bold mb-3">
          {this.props.breedToShow}
        </h3>
        {!this.props.breed ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div className="md:flex items-center">
              {this.props.breed.subBreeds.length > 0 && (
                <div className="flex-grow mb-4">
                  <h4 className="inline-block mr-2">Sub breeds:</h4>
                  <ul className="inline-block">
                    {this.props.breed.subBreeds.map((subBreed, index) => (
                      <li className="text-brown inline-block mr-2" key={index}>
                        {subBreed}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => this.handelClick()}
                className="px-6 py-2 flex-shrink-0 bg-brown text-white mb-4"
              >
                Change pictures
              </button>
            </div>

            <Gallery imageSrcArray={this.props.breed.images} />
          </>
        )}
        <BackLink />
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
