import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cleanUpText = (text) => {
    return text.replace(/[*#]/g, "");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://ai-based-medical-report-analyser.onrender.com/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.response);
    } catch (err) {
      console.log(err.message);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">🩺 Medical Report Analyzer</h2>
        <p className="subtitle">
          Upload a medical file and get AI-generated summary
        </p>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="upload-button"
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>

        {result && (
          <div className="report-box">
            <h3>📄 Your Report :</h3>
            {cleanUpText(result)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
