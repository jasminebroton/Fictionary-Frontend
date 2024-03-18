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

function Room() {
    const location = useLocation();
    const [isHost, setIsHost] = useState(location.state?.host ? true : false);
    const [guestName] = useState(location.state?.name);
    const [socket, setSocket] = useState(null);
    const [players, setPlayers] = useState([]);
    const [guesses, setGuesses] = useState([]);

    // modals powered by friendship and GOD
    const [viewLobby, setViewLobby] = useState(true);
    const [viewCategories, setViewCategories] = useState(false);
    const [viewDrawing, setViewDrawing] = useState(false);
    const [viewVoting, setViewVoting] = useState(false);
    const [viewResults, setViewResults] = useState(false);
    const [viewScoreboard, setViewScoreboard] = useState(false);

    return (
        <div>
            {viewLobby && <Lobby players={players} setPlayers={setPlayers} socket={socket} setSocket={setSocket} isHost={isHost} setIsHost={setIsHost} guestName={guestName} setViewCurr={setViewLobby} setViewNext={setViewCategories} />}
            {viewCategories && <Categories viewCurr={viewCategories} setViewCurr={setViewCategories} setViewNext={setViewDrawing} />}
            {viewDrawing && <Drawing viewCurr={viewDrawing} setViewCurr={setViewDrawing} setViewNext={setViewVoting} />}
            {viewVoting && <Voting viewCurr={viewVoting} setViewCurr={setViewVoting} setViewNext={setViewResults} /> }
            {viewResults && <Results players={players} setPlayers={setPlayers} guesses={guesses} setGuesses={setGuesses} socket={socket} setSocket={setSocket} setViewCurr={setViewResults} setViewNext={setViewScoreboard} /> }
            {viewScoreboard && <Scoreboard players={players} setPlayers={setPlayers} setViewCurr={setViewScoreboard} setViewNext={setViewCategories} /> }
        </div>
    );
}

export default Room;