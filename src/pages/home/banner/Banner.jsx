import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import pic1 from '../../../assets/pexels-lorenzo-manera-686693293-33447543.jpg'
import pic2 from '../../../assets/pexels-lorenzo-manera-686693293-33447543.jpg'
import pic3 from '../../../assets/pexels-lorenzo-manera-686693293-33447543.jpg'

const Banner = () => {
    return (
         <div className='mx-auto max-w-5xl'>
            <Carousel width={600}>
                <div>
                    <img src={pic1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={pic2}  />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={pic3}/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>

         </div>
    );
};

export default Banner;