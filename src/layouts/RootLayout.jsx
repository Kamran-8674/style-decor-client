import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navbar/navbar';
import Footer from '../pages/shared/footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default RootLayout;