import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = ['vite.svg', 'vite.svg']

const Slideshow = () => {
    
    // const CustomPrevArrow = (props) => (
    //     <div {...props} className="slick-arrow custom-prev-arrow">
    //       Previous
    //     </div>
    //   );
    
    //   const CustomNextArrow = (props) => (
    //     <div {...props} className="slick-arrow custom-next-arrow">
    //       Next
    //     </div>
    //   );

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    //   prevArrow: <CustomPrevArrow />,
    //   nextArrow: <CustomNextArrow />,
    };
  
    return (
      <Slider {...settings} className="bg-blue-400 h-48">
        {images.map((image, index) => (
          <div key={index} className="slide-container">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    );
  };
  
  export default Slideshow;