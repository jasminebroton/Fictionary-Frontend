import { useParams, useLocation } from 'react-router-dom';
import './index.css';
import "./output.css";
import React, { useState } from 'react';
import Lobby from "./Lobby.js";
import Categories from "./Categories.js";
import Drawing from "./Drawing.js";
import Voting from "./Voting.js";
import Results from "./Results.js";
import Scoreboard from './Scoreboard';
import FinalScore from './FinalScore.js';


function Room() {
    const location = useLocation();
    const [isHost, setIsHost] = useState(location.state?.host ? true : false);
    const [guestName] = useState(location.state?.name);
    const [socket, setSocket] = useState(null);
    //const[players, setPlayers] = useState([]);
    const [players, setPlayers] = useState([
        { name: 'Player 1', isHost: true },
        { name: 'Player 2', isHost: false },
        { name: 'Player 3', isHost: false },
        { name: 'Player 4', isHost: false },
        { name: 'Player 5', isHost: false },
        { name: 'Player 6', isHost: false },
        { name: 'Player 7', isHost: false },
        { name: 'Player 8', isHost: false },
        { name: 'Player 9', isHost: false },
      ]);
    // modals powered by friendship and GOD
    const [viewLobby, setViewLobby] = useState(true);
    const [viewCategories, setViewCategories] = useState(false);
    const [viewDrawing, setViewDrawing] = useState(false);
    const [viewVoting, setViewVoting] = useState(false);
    const [viewResults, setViewResults] = useState(false);
    const [viewScoreboard, setViewScoreboard] = useState(false);
    const [viewFinal, setViewFinalScore] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [usedIndexes, setUsedIndexes] = useState([]);

    return (
        <div>

            {viewLobby && <Lobby socket={socket} setSocket={setSocket} isHost={isHost} setIsHost={setIsHost} guestName={guestName} setViewCurr={setViewLobby} setViewNext={setViewCategories} players={players} setPlayers={setPlayers}/>}
            {viewCategories && <Categories viewCurr={viewCategories} setViewCurr={setViewCategories} setViewNext={setViewDrawing} players={players} setPlayers={setPlayers} isHost={isHost} setIsHost={setIsHost} />}
            {viewDrawing && <Drawing viewCurr={viewDrawing} setViewCurr={setViewDrawing} setViewNext={setViewVoting} players={players} setPlayers={setPlayers} isHost={isHost} setIsHost={setIsHost} usedIndexes={usedIndexes} setUsedIndexes={setUsedIndexes}/>}
            {viewVoting && <Voting viewCurr={viewVoting} setViewCurr={setViewVoting} setViewNext={setViewResults} /> }
            {viewResults && <Results setViewCurr={setViewResults} setViewNext={setViewScoreboard} roundCount={roundCount} setRoundCount={setRoundCount} /> }
            {viewScoreboard && <Scoreboard setViewCurr={setViewScoreboard} setViewNext= {setViewDrawing} setViewNextRound={setViewCategories} setViewNextFinalScore={setViewFinalScore} roundCount={roundCount} usedIndexes={usedIndexes} players={players} setRoundCount={setRoundCount} setUsedIndexes={setUsedIndexes} /> }
            {viewFinal && <FinalScore setViewCurr={setViewFinalScore} setViewNext={setViewLobby} />}
        </div>
    );  
}

export default Room;