import { useState } from 'react';
import QuestionInput from './components/QuestionInput';
import ChatDisplay from './components/ChatDisplay';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const handleNewQuestion = (newQuestion) => {
    setChatHistory([...chatHistory, newQuestion]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">StudyGPT</h1>
      <div className="w-full max-w-2xl">
        <QuestionInput onNewQuestion={handleNewQuestion} />
        <ChatDisplay history={chatHistory} />
      </div>
    </div>
  );
}

export default App;