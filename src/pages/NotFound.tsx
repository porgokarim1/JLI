const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page Not Found</p>
        <a href="/" className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md">
          Go Back to Home
        </a>
      </div>
    );
  };
  
  export default NotFound;