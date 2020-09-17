import React from 'react';
import {connect} from 'react-redux';

const testImgArr = [
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg",
]
const MAX_IMGS = 3;

const Image = ({src}) => (
    <img src={src}></img>
)
const Gallery = ({imageSrcArray}) => (
    <div>
        {imageSrcArray.slice(0, MAX_IMGS).map(
            (imgSrc, index) => <Image src={imgSrc} key={index} />
        )}
    </div>
)

export default () => <Gallery imageSrcArray={testImgArr}/>