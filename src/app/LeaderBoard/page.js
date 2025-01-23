import Navbar from "../Navbar/page";

export default function LeaderBoard() {
    const players = [
      { rank: 1, name: "PlayerOne", score: 12345 },
      { rank: 2, name: "ProGamer", score: 11230 },
      { rank: 3, name: "QuickShot", score: 9870 },
      { rank: 4, name: "Speedster", score: 8500 },
      { rank: 5, name: "SniperWolf", score: 7200 },
    ];
  
    return (
      <div className="w-full h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center justify-center">
                    <div>  <Navbar/> </div>    
        <div className="w-11/12 lg:w-2/3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Leaderboard</h1>
          <div className="overflow-hidden border border-gray-700 rounded-lg">
            <table className="w-full text-left text-gray-200">
              <thead className="bg-gradient-to-r from-blue-900 to-blue-700">
                <tr>
                  <th className="p-4 text-lg">Rank</th>
                  <th className="p-4 text-lg">Player</th>
                  <th className="p-4 text-lg">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player.rank}
                    className={`transition-all ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500`}
                  >
                    <td className="p-4 font-semibold text-center">{player.rank}</td>
                    <td className="p-4 font-semibold">{player.name}</td>
                    <td className="p-4 font-semibold text-center">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <button className="px-6 py-3 text-white bg-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-700">
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  