import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-primary text-white  p-10">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🏢 Brand */}
        <div>
          <h2 className="text-xl font-bold">StyleDecor</h2>
          <p className="text-sm mt-2">
            Making your events beautiful and memorable.
          </p>
        </div>

  
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: support@styledecor.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Location: Sylhet, Bangladesh</p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-2">Working Hours</h3>
          <p>Sat - Thu: 9:00 AM - 8:00 PM</p>
          <p>Friday: Closed</p>
        </div>

      
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">

            <a href="#">
              <FaFacebook className="hover:text-primary" />
            </a>

            <a href="#">
              <FaInstagram className="hover:text-primary" />
            </a>

            <a href="#">
              <FaTwitter className="hover:text-primary" />
            </a>

          </div>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="text-center mt-8 border-t pt-4 text-sm ">
        ©  StyleDecor. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
