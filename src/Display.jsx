import React from 'react';

const Display = ({ comparisons }) => (
    <div className='display'>
        <h2>Comparisons</h2>
        <ul>
            {comparisons.map((comparison, index) => (
                <li key={index}>{comparison}</li>
            ))}
        </ul>
    </div>
);

export default Display;