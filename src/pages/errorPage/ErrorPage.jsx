import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
       <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-primary">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/">
          <button className="btn btn-primary">
            Back To Home
          </button>
        </Link>

      </div>
    </div>
    );
};

export default ErrorPage;