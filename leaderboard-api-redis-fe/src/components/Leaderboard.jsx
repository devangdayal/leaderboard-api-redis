import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../services/websocket";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/leaderboard/");
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    connectWebSocket((data) => setLeaderboard(data));
    return () => disconnectWebSocket();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">
            🏆 Leaderboard
          </h1>
          <button
            onClick={fetchLeaderboard}
            className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition font-semibold shadow-md"
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg py-10 animate-pulse">
            Loading...
          </p>
        ) : leaderboard.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-10 italic">
            No entries found
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm uppercase font-semibold">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center tracking-wide rounded-tl-xl"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center tracking-wide"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center tracking-wide rounded-tr-xl"
                  >
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50/60"
                    } hover:bg-blue-100 transition-all duration-300`}
                  >
                    <td className="px-6 py-4 text-center font-bold text-gray-700">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-800">
                      {entry.username}
                    </td>
                    <td className="px-6 py-4 text-center font-extrabold text-blue-600">
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
