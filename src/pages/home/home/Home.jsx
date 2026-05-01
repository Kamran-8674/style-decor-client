import React from 'react';
import Banner from '../banner/Banner';
import ServicesSection from '../ServiceSection/ServicesSection';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <div className='bg-gray-100'>
                <div className='max-w-7xl mx-auto'>
                <ServicesSection ></ServicesSection>
            </div>
            </div>
            
            
            this is home
        </div>
    );
};

export default Home;