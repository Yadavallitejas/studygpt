import { useState } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';

function QuestionInput({ onNewQuestion }) {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Math');
  const [language, setLanguage] = useState('Telugu');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setLoading(true);
      try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng', {
          logger: (m) => console.log(m),
        });
        setQuestion(text);
      } catch (err) {
        setError('Failed to process image. Please try another image.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let finalQuestion = question;

    if (image && !question) {
      try {
        const { data: { text } } = await Tesseract.recognize(image, 'eng');
        finalQuestion = text;
      } catch (err) {
        setError('Failed to process image. Please try another image.');
        setLoading(false);
        return;
      }
    }

    if (!finalQuestion.trim()) {
      setError('Please enter a question or upload an image.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/ask/', {
        user_question: finalQuestion,
        subject,
        language,
      });
      onNewQuestion(response.data);
      setQuestion('');
      setImage(null);
    } catch (err) {
      setError('Failed to get response from server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="SST">Social Studies</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
            placeholder="Type your question here..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Ask Question'}
        </button>
      </form>
    </div>
  );
}

export default QuestionInput;