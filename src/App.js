// import { useEffect, useState } from 'react';
import Submit from './Submit';
import './App.css';

const App = () => {

    return (
        <div className='app'>
            <h1>N-Gram Insight Tool</h1>
            <p className="tool-description">
                Explore and analyze text data with the n-Gram Insight Tool to discover valuable insights. Upload up to 3 text files and 
                select an n-gram value. 
                This tool compares your text files to calculate Jaccard Similarity, and visualize the most common and unique n-grams.
            </p>

            <Submit />

        </div>
    );
};

export default App;