import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import CarouselSwipe from './CarouselSwipe';
import items from './items';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.scss';

export default class HomeCarousel extends React.Component {
  render() {
    return (
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop={true}
        showArrows={false}
        className="home-carousel"
      >
        <CarouselSwipe items={items.slice(0, 10)} />
        <CarouselSwipe items={items.slice(10, 20)} />
        <CarouselSwipe items={items.slice(20, 30)} />
      </Carousel>
    );
  }
}
