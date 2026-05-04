import React from 'react';
import Banner from '../banner/Banner';
import ServicesSection from '../ServiceSection/ServicesSection';
import TopDecorators from '../TopDacorators/TopDecorators';
import useAuth from '../../../hooks/useAuth';

const Home = () => {
    
    const {loading}= useAuth()
    if(loading){
        return <div>loading</div>
    }
    return (
        <div >
            <Banner></Banner>
            <div className='bg-gray-100'>
                <div className='max-w-7xl mx-auto'>
                <ServicesSection ></ServicesSection>
                <TopDecorators></TopDecorators>
            </div>
            </div>
            
        </div>
    );
};

export default Home;