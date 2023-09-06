import React from 'react';

const Display = ({ comparisons }) => (
  <div className='display'>
    <h2>Jaccard Similarity Comparisons:</h2>
    <ul>
      {comparisons.map((comparison, index) => (
        <li key={index}>
          {`Jac(${comparison.file1}, ${comparison.file2}) = ${comparison.similarity}`}
        </li>
      ))}
    </ul>
  </div>
);

export default Display;