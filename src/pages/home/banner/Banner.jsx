import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import pic1 from "../../../assets/Ohana_5_636c3e30-bc3e-47cf-ba79-597a83e58712.webp";
import pic2 from "../../../assets/42299d179816cf5b77228a547863ef65.webp";
import pic3 from "../../../assets/1715946193_webp_original.webp";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full">

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >

        {/* Slide 1 */}
        <div className="relative">
          <img src={pic1} className="h-[70vh] w-fit object-cover" />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Beautiful Wedding Decorations
              </h1>
              <p className="mb-4">
                Make your special day unforgettable
              </p>

              <Link to="/services">
                <button className="btn btn-primary">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img src={pic2} className="h-[70vh] object-cover" />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Home Decoration Services
              </h1>
              <p className="mb-4">
                Transform your home with elegance
              </p>

              <Link to="/services">
                <button className="btn btn-primary">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img src={pic3} className="h-[70vh] w-fit object-cover" />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Birthday & Event Setup
              </h1>
              <p className="mb-4">
                Celebrate your moments in style
              </p>

              <Link to="/services">
                <button className="btn btn-primary">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default Banner;