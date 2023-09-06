import React, { useState } from 'react';
import Display from './Display';

const Submit = ({ file }) => {
    const [selectedFiles, setSelectedFiles] = useState([]); // default to empty ra.
    const [comparisons, setComparisons] = useState([]);
    const [showComparisons, setShowComparisons] = useState(false);
    const [selectedGram, setSelectedGram] = useState(1);    // default to one.

    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        if (files.length >= 2 && files.length <= 3) {
            setSelectedFiles(files);
        } else {
            alert('Please select 2 to 3 files (inclusive');
        }
    }

    const handleSubmit = () => {
        if (selectedFiles.length < 2) {
            alert('Please select at least 2 text files.');
            return;
        }

        // begin calculating similarity.
        // performComparisons();

        // update the page on submit.
        setShowComparisons(true);
    }

    // calculate here ?
    return (
        <div className="submit">
            <h2> File Upload & n-gram selection:</h2>
            <input type="file" multiple onChange={handleFile} />
            <br />
            <label>
                Select n-gram value:
                <select value={selectedGram} onChange={(e) => setSelectedGram(parseInt(e.target.value, 10))}>
                    <option value={1}>1-gram</option>
                    <option value={2}>2-gram</option>
                    <option value={3}>3-gram</option>
                    <option value={4}>4-gram</option>
                    <option value={5}>5-gram</option>
                    <option value={6}>6-gram</option>
                </select>
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {showComparisons && (
                <Display comparisons={comparisons} />
            )}
        </div>
    );
};

export default Submit;