import React, { useState } from 'react';
import Display from './Display';

const Submit = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [comparisons, setComparisons] = useState([]);
    const [showComparisons, setShowComparisons] = useState(false);
    const [selectedGram, setSelectedGram] = useState(1);

    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        if (files.length >= 2 && files.length <= 3) {
            setSelectedFiles(files);
        } else {
            alert('Please select 2 to 3 files (inclusive)');
        }
    }

    const handleSubmit = async () => {
        if (selectedFiles.length < 2) {
            alert('Please select at least 2 text files.');
            return;
        }

        // Create a FormData object and append selected files
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`files`, file); // ?
        });

        try {
            const response = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle success, e.g., update state with comparisons
                const data = await response.json();
                setComparisons(data.comparisons);
                setShowComparisons(true);
            } else {
                // Handle server error, e.g., show an error message
                alert('Server error. Please try again later.');
            }
        } catch (error) {
            // Handle fetch error, e.g., show an error message
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="submit">
            <h2>File Upload & n-gram selection:</h2>
            <input type="file" name="files" multiple onChange={handleFile} />
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