import React from 'react';
import JaccardSim from './JaccardSim';

const Submit = () => {
  return (
    <div className="submit">
      <h2>File Upload & n-gram selection:</h2>
      <JaccardSim /> {/* Render the JaccardSim component here */}
    </div>
  );
};

export default Submit;