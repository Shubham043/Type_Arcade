export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black">
      <div className="w-full max-w-screen-md p-8 h-auto flex flex-col md:flex-col lg:flex-row items-center justify-between rounded-lg bg-yellow-500/10 shadow-lg">
        {/* Form Section */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h1 className="text-2xl font-bold text-center text-white mb-8">Sign Up</h1>
          <form className="flex flex-col items-start justify-center gap-4 my-2">
            <input
              type="text"
              placeholder="Enter your username"
              className="animate-fire w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-green-500 px-4 py-2 mt-4 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
            >
              Submit
            </button>
          </form>
        </div>
        
        {/* Logo Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center mt-6 md:mt-0">
          <img
            src="/logo.webp"
            alt="Website Logo"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
