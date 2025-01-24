const NotFound = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="h-14 sm:h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full">
            <div className="flex items-center">
              <img
                src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png?t=2025-01-02T06%3A41%3A20.422Z"
                alt="Know Israel"
                className="h-6 sm:h-8 w-auto"
              />
              <span className="font-bold text-lg sm:text-xl text-black ml-2">KNOW ISRAEL</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page Not Found</p>
        <a href="/" className="mt-4 px-4 py-2 text-yellow-600 border-yellow-400 border rounded-md">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;