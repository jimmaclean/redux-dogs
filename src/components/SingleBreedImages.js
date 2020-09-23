import React, {Component} from "react";
import { connect } from "react-redux";
import { getVisibleBreed, fetchImagesForBreed } from "../store";

const testImgArr = [
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
  "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg",
];
const MAX_IMGS = 3;

const Image = ({ src }) => <img src={src}></img>;
const Gallery = ({ imageSrcArray }) => (
  <div>
    {imageSrcArray.slice(0, MAX_IMGS).map((imgSrc, index) => (
      <Image src={imgSrc} key={index} />
    ))}
  </div>
);

class SingleBreedImages extends Component {
    constructor() {
        super();
      }
    componentDidMount() {

    }
    // handelClick = (breed) => {
    //     this.props.fetchImagesForBreed(breed)
    // }
    
    render() {
        if (this.props.breed && this.props.breed.images.length === 0 ) {
            this.props.fetchImagesForBreed(this.props.breed.name)
        }
        return (
            <div>
                <h3>Hi {this.props.breedToShow}</h3>
                {this.props.breed && <Gallery imageSrcArray={this.props.breed.images} />}
            </div>

        );
    }
}

export default connect((state, ownProps) => ({ breed: getVisibleBreed(state.allBreedGroups, ownProps.breedToShow) }), {
  fetchImagesForBreed,
})(SingleBreedImages);
