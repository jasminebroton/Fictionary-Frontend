import { useParams, useLocation } from 'react-router-dom';
import './output.css';
import React, { useState } from 'react';
import "flowbite";

import Lobby from "./Lobby.js";
import Categories from "./Categories.js";
import Drawing from "./Drawing.js";
import Voting from "./Voting.js";
import Results from "./Results.js";
import Scoreboard from './Scoreboard';

function Room() {
    const { roomId } = useParams();
    const location = useLocation();
    const [isHost, setIsHost] = useState(location.state?.host ? true : false);
    const [socket, setSocket] = useState(null);

    return (
        // we have to wrap each component into a div with an ID so other components can find the ID and hide/show modals depending on game state
        <div>
            <div data-modal-target="lobby-modal" id="lobby-modal" className=" background custom-text">
                <Lobby modalId="lobby-modal" nextModalId="categories-modal" socket={socket} setSocket={setSocket} isHost={isHost} setIsHost={setIsHost} />
            </div>
            <div data-modal-target="categories-modal" id="categories-modal" className="hidden background custom-text">
                <Categories modalId="categories-modal" nextModalId="drawing-modal" />
            </div>
            <div data-modal-target="drawing-modal" id="drawing-modal" className="hidden background custom-text">
                <Drawing modalId="drawing-modal" nextModalId="voting-modal" />
            </div>
            <div data-modal-target="voting-modal" id="voting-modal" className="hidden background custom-text" >
                <Voting modalId="voting-modal" nextModalId="results-modal" />
            </div>
            <div data-modal-target="results-modal" id="results-modal" className="hidden background custom-text min-h-screen max-h-max" >
                <Results modalId="results-modal" nextModalId="scoreboard-modal" />
            </div>
            <div data-modal-target="scoreboard-modal" id="scoreboard-modal" className="hidden background custom-text pb-4 px-6 min-h-screen max-h-max" >
                <Scoreboard modalId="scoreboard-modal" nextModalId="categories-modal" />
            </div>
        </div>
    );  
}

export default Room;