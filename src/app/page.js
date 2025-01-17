import Link from 'next/link'
export default function HomePage() {
  return (
      <div className="w-full h-full flex flex-col lg:flex-row md:flex-col items-center justify-center bg-gradient-to-r from-indigo-900 to-black relative">
          {/* Buttons on Top-Left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
              <h3 className="text-white border lg:w-auto p-2 h-auto text-center rounded-md text-sm sm:text-1xl cursor-pointer">
              <Link href="/SignUp"> Create account</Link>
                 
              </h3>
              <h3 className="text-white border lg:w-auto p-2 h-auto text-center rounded-md text-sm sm:text-1xl cursor-pointer">
                  <Link href="/Login"> Login </Link>
              </h3>
          </div>

          {/* Left Section */}
          <div className="flex items-left justify-center flex-col lg:w-1/2 md:w-1/2 w-full h-screen  p-8 sm:m-0">
              <h1 className="text-5xl font-extrabold text-white m-4 animate-typing-loop">Test Your Typing Speed!</h1>
              <p className="text-xl text-start text-gray-200 m-4">Challenge yourself and improve your typing skills!</p>
              <button className="px-6 py-3 w-full lg:w-1/2 m-4 text-white rounded-full text-lg bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:via-blue-600 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
                
                <Link href="/Typing">Start Test</Link>  
              </button>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 w-full h-screen flex items-center justify-center p-1 ">
              <img className="w-3/5 border rounded-lg animate-bounce cursor-pointer" src="/logo.webp" alt="Logo" />
          </div>
      </div>
  );
}
