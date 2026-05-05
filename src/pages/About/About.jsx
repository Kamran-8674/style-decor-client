import React from "react";
import Hero from "./Hero";

const About = () => {
  return (
    <div>
      <Hero></Hero>
      <div className="p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
        <p className="text-gray-600">
          StyleDecor is a modern decoration service platform that helps users
          book professional decorators for weddings, birthdays, corporate
          events, and home decoration. Our goal is to make event planning easy,
          fast, and stress-free.
        </p>
      </div>
      <div className="bg-base-200 p-10">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">Expert Decorators</h3>
            <p>Highly skilled professionals</p>
          </div>

          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">Affordable Price</h3>
            <p>Best value for your budget</p>
          </div>

          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">On-Time Delivery</h3>
            <p>We never miss deadlines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
