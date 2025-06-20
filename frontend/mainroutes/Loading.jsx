import React from 'react';
import '../mainroutes/Loading.css'; // optional external CSS for styling

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner" />
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
