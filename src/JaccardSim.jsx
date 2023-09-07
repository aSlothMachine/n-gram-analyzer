import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'; // Replace with your backend URL

const JaccardSim = () => {

    // create state variables.
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [nGrams, setNGrams] = useState(1); // Default n-gram value
    const [comparisons, setComparisons] = useState([]);

    // const handleFileChange = (e) => {
    //     setSelectedFiles([...e.target.files]);
    //   };

    //   const calculateJaccardSimilarity = async () => {
    //     // Create a FormData object to send files
    //     const formData = new FormData();
    //     selectedFiles.forEach((file) => formData.append('fileNames', file));
      
    //     try {
    //       const response = await axios.post('/api/compare', formData, {
    //         params: {
    //           ngram: nGrams,
    //         },
    //       });
      
    //       // Update the comparisons state with the response data
    //       setComparisons(response.data);
    //     } catch (error) {
    //       // Handle errors, e.g., display an error message
    //       console.error('Error calculating similarity:', error);
    //     }
    //   };

    return (
        <div className="jaccard-similarity">
            <h2>Jaccard Similarity Calculation</h2>
            <input type="file" multiple /*onChange={handleFileChange}*/ />
            <br />
            <label>
                Select n-gram value:
                <select
                    value={nGrams}
                    onChange={(e) => setNGrams(parseInt(e.target.value, 10))}
                >
                    <option value={1}>1-gram</option>
                    <option value={2}>2-gram</option>
                    <option value={3}>3-gram</option>
                    {/* Add more options if needed */}
                </select>
            </label>
            <br />
            <button /*onClick={calculateJaccardSimilarity}*/>Calculate Jaccard Similarity</button>
            {/* Display the results of Jaccard Similarity comparisons */}
            {comparisons.length > 0 && (
                <div className="comparisons">
                    <h3>Jaccard Similarity Comparisons:</h3>
                    <ul>
                        {comparisons.map((comparison, index) => (
                            <li key={index}>
                                {`Jac(${comparison.file1}, ${comparison.file2}) = ${comparison.similarity}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JaccardSim;