import Navbar from "../Navbar/page";

export default function Profile() {
  const user = {
    name: "Sahil Khan",
    email: "Sahil@example.com",
    profilePic: "/logo.webp", // Replace with your image path
    highestWpm: 145,
    averageWpm: 120,
    testHistory: [
      { id: 1, date: "2025-01-20", wpm: 135 },
      { id: 2, date: "2025-01-19", wpm: 145 },
      { id: 3, date: "2025-01-18", wpm: 130 },
      { id: 4, date: "2025-01-17", wpm: 125 },
    ],
  };

  return (
    <div className="p-2 overflow-hidden w-full h-screen bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      {/* Navbar */}
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>

      {/* Profile Section */}
      <div className="w-11/12 h-3/4 lg:w-2/3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <img
            className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg"
            src={user.profilePic}
            alt="Profile"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-around text-white mb-8">
          <div className="flex flex-col items-center p-4 bg-gradient-to-r from-green-600 to-blue-700 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Highest WPM</h2>
            <p className="text-2xl font-bold">{user.highestWpm}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-600 to-pink-700 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Average WPM</h2>
            <p className="text-2xl font-bold">{user.averageWpm}</p>
          </div>
        </div>

        {/* Test History Table */}
        <div className="overflow-x-auto border border-gray-700 rounded-lg">
          <table className="w-full text-left text-gray-200">
            <thead className="bg-gradient-to-r from-blue-900 to-blue-700">
              <tr>
                <th className="p-4 text-lg">Test ID</th>
                <th className="p-4 text-lg">Date</th>
                <th className="p-4 text-lg">WPM</th>
              </tr>
            </thead>
            <tbody>
              {user.testHistory.map((test, index) => (
                <tr
                  key={test.id}
                  className={`transition-all ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500`}
                >
                  <td className="p-4 font-semibold">{test.id}</td>
                  <td className="p-4 font-semibold">{test.date}</td>
                  <td className="p-4 font-semibold">{test.wpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 text-white bg-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-700">
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
}
