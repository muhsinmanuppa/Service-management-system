const Error = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      <p>{message || 'An error occurred. Please try again.'}</p>
    </div>
  );
};

export default Error;