import React, { useState } from 'react';
import Display from './Display'; // Import the Display component

function hashCode(str) {
  let hash = 5381; // Start with an arbitrary prime number
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash * 33) ^ char; // The "33" is an arbitrary multiplier
  }
  return hash >>> 0; // Ensure the result is a non-negative integer
}

const JaccardSim = () => {
  const [fileNames, setFileNames] = useState([]);
  const [nGrams, setNGrams] = useState(1);
  const [comparisons, setComparisons] = useState([]);

  const gramThisFile = (text, grams) => {
    const myGramsHashCoded = [];
    const tokenList = text.split(/\s+/); // Split text into tokens by whitespace

    for (let i = 0; i <= tokenList.length - grams; i++) {
      let s = '';

      for (let j = 0; j < grams; j++) {
        s += tokenList[i + j] + ' ';
      }

      // Ensure the same hashing logic as in Java
      myGramsHashCoded.push(hashCode(s));
    }

    // Remove duplicates as needed
    removeDuplicates(myGramsHashCoded);

    return myGramsHashCoded;
  };

  const removeDuplicates = (array) => {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  };

  const calculateJaccardSimilarity = async (event) => {
    if (fileNames.length < 2) {
      alert('Please select at least 2 text files.');
      return;
    }

    const raList = [];
    const comparisonsList = [];

    // Read the content of selected text files
    for (let i = 0; i < fileNames.length; i++) {
      const file = event.target.files[i];
      const text = await readFileAsync(file); // Read the file asynchronously
      const nGramArray = gramThisFile(text, nGrams);
      removeDuplicates(nGramArray);
      raList.push(nGramArray);
    }

    // Compare the texts
    for (let i = 0; i < raList.length - 1; i++) {
      for (let j = i + 1; j < raList.length; j++) {
        const similarity = Jac(raList[i], raList[j]);
        comparisonsList.push({
          file1: fileNames[i],
          file2: fileNames[j],
          similarity: similarity.toFixed(5),
        });
      }
    }

    setComparisons(comparisonsList);
  };

  const Jac = (f1, f2) => {
    let ctr = 0;

    for (let i = 0; i < f1.length; i++) {
      for (let j = 0; j < f2.length; j++) {
        if (f1[i] === f2[j]) {
          ctr++;
        }
      }
    }

    return ctr / (f1.length + f2.length - ctr);
  };

  // Helper function to read a file asynchronously
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        resolve(text);
      };
      reader.onerror = (event) => {
        reject(new Error('Error reading file.'));
      };
      reader.readAsText(file);
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length >= 2 && selectedFiles.length <= 4) {
      setFileNames(selectedFiles.map((file) => file.name));
    } else {
      alert('Please select 2 to 4 text files.');
      // Optionally, you can clear the file input here
      event.target.value = null;
    }
  };

  return (
    <div className="jaccard-similarity">
      {/* <h2>Jaccard Similarity Calculation</h2> */}
      <input type="file" multiple onChange={handleFileChange} />
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
          <option value={4}>4-gram</option>
          {/* Add more options if needed */}
        </select>
      </label>
      <br />
      <button onClick={calculateJaccardSimilarity}>Calculate Jaccard Similarity</button>
      {/* Display the results of Jaccard Similarity comparisons using the Display component */}
      {comparisons.length > 0 && (
        <Display comparisons={comparisons} />
      )}
    </div>
  );
};

export default JaccardSim;