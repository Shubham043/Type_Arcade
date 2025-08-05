"use client";
import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState({
    isConnected: false,
    isReady: false,
    opponentReady: false,
    countdown: null,
    gameStarted: false,
    waiting: true,
    opponent: null,
    username: null,
    opponentScore: null, 
  });

  useEffect(() => {
   const newSocket = io("https://typearcade-backend.onrender.com", {
  transports: ["websocket"], 
});

    setSocket(newSocket);

    newSocket.on("match_found", ({ players }) => {
      setGameState((prev) => ({
        ...prev,
        isConnected: true,
        waiting: false,
        opponent: players.find((p) => p !== prev.username),
      }));
    });

    newSocket.on("update_ready_status", (readyStatus) => {
      setGameState((prev) => ({ ...prev, opponentReady: readyStatus }));
    });

    newSocket.on("start_countdown", () => {
      let counter = 4;

      setGameState((prev) => ({ ...prev, countdown: counter }));

      const interval = setInterval(() => {
        counter -= 1;

        if (counter > 0) {
          setGameState((prev) => ({ ...prev, countdown: counter }));
        } else {
          clearInterval(interval);
          setGameState((prev) => ({
            ...prev,
            countdown: null,
            gameStarted: true,
          }));
        }
      }, 1000);
    });

    // NEW: opponent score listener
    newSocket.on("opponent_score", ({ score }) => {
      setGameState((prev) => ({
        ...prev,
        opponentScore: score,
      }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinCompetition = (username) => {
    socket?.emit("join_competition", { username });
    setGameState((prev) => ({ ...prev, username }));
  };

  const setReady = () => {
    socket?.emit("player_ready");
    setGameState((prev) => ({ ...prev, isReady: true }));
  };

  const sendScore = (score) => {
    socket?.emit("player_score", { score });
  };

  // const getOpponentScore= ()=>{
  //  const res =  socket.on("get_score");
  //  setGameState((prev)=> ({...prev,opponentScore:res}));
  // }

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        joinCompetition,
        setReady,
        sendScore, 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
