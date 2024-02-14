import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

function Lobby({modalId, nextModalId, socket, setSocket, isHost, setIsHost}) {
  const navigate = useNavigate();
  const { roomId, guestName } = useParams();
  const [players, setPlayers] = useState([]);
  // ellen: moved to Room.js so each game page can access these
  // const [socket, setSocket] = useState(null);
  // const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    let mySocketId = null;
    newSocket.on('yourSocketId', ({ id }) => {
      mySocketId = id;
      newSocket.emit('joinRoom', { userid: mySocketId, room: roomId, userName: guestName });
    });


    // Setup event listeners for socket
    newSocket.on('updateUserList', (Updatedplayers) => {
      setPlayers(Updatedplayers);
      // Update isHost based on the updated players list and mySocketId
      const user = Updatedplayers.find((player) => player.id === mySocketId);
      console.log(Updatedplayers);
      setIsHost(user ? user.isHost : false);
    });

    newSocket.on('gameStarted', () => {
      // Conditional rendering for the game (i.e., Canvas, Results, Scoreboard)
      alert('Game Start');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [navigate, roomId, guestName]); // Removed WebSocketID from the dependency array as it's no longer needed

  
  function handleLeaveClick() {
    // Navigate back to home or the previous page
    navigate('/');
  }

  function handleStartClick() {
    // Emit startGame event if current user is the host
    if (isHost) {
      socket.emit('startGame', roomId);
    } else {
      alert('Only the host can start the game.');
    }
  }

  return (
    <div className="bg-[#ece6c2] font-serif h-screen justify-center">
      <div>
        <h1 className="text-[#6f5643] text-2xl pt-10 mb-0">Fictionary</h1>
        <h1 className="text-[#6f5643] text-5xl pt-10 mb-5">Lobby</h1>
        <p className="text-[#6f5643] text-3xl pt-0 mb-10">Room: {roomId}</p>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-10">
          {players.map((player, i) => (
            <li className="text-[#6f5643] text-2xl pt-0 mb-0" key={i}>
              {player.name} {player.isHost ? '(Host)' : ''}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleLeaveClick} className="bg-[#cc6b49] text-[#ece6c2] w-20 p-2 mx-20 mt-10">Leave</button>
        {isHost && (
          <button data-modal-target={nextModalId} data-modal-show={nextModalId} data-modal-hide={modalId} className="bg-[#cc6b49] text-[#ece6c2] w-20 p-2 mx-20 mt-10">Start</button>
        )}
      </div>
    </div>
  );
}

export default Lobby;