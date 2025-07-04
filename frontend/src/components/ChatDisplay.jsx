function ChatDisplay({ history }) {
  return (
    <div className="w-full">
      {history.length === 0 && (
        <p className="text-gray-500 text-center">No questions asked yet.</p>
      )}
      {history.map((item) => (
        <div key={item.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-700">
            <strong>Question ({item.subject}, {item.language}):</strong> {item.user_question}
          </p>
          <p className="text-gray-900 mt-2">
            <strong>Answer:</strong> {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatDisplay;