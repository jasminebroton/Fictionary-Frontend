import { useParams, useLocation } from 'react-router-dom';
import './output.css';
import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
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
        <div>
            <div data-modal-target="lobby-modal" id="lobby-modal" className="bg-[#ece6c2] font-serif h-screen justify-center">
                <Lobby modalId="lobby-modal" nextModalId="categories-modal" socket={socket} setSocket={setSocket} isHost={isHost} setIsHost={setIsHost} />
            </div>
            <div data-modal-target="categories-modal" id="categories-modal" className="hidden bg-[#ece6c2] text-[#6f5643] font-serif h-screen pt-10">
                <Categories modalId="categories-modal" nextModalId="drawing-modal" />
            </div>
            <div data-modal-target="drawing-modal" id="drawing-modal" className="hidden bg-[#ece6c2] text-[#6f5643] font-serif h-screen pt-10">
                <Drawing modalId="drawing-modal" nextModalId="voting-modal" />
            </div>
            <div data-modal-target="voting-modal" id="voting-modal" className="hidden bg-background-color min-h-screen text-text">
                <Voting modalId="voting-modal" nextModalId="results-modal" />
            </div>
            <div data-modal-target="results-modal" id="results-modal" className={`hidden bg-[#ece6c2] font-serif pb-4 px-6 min-h-screen max-h-max`} >
                <Results modalId="results-modal" nextModalId="scoreboard-modal" />
            </div>
            <div data-modal-target="scoreboard-modal" id="scoreboard-modal" className={`hidden bg-[#ece6c2] font-serif pb-4 px-6 min-h-screen max-h-max`} >
                <Scoreboard modalId="scoreboard-modal" nextModalId="categories-modal" />
            </div>
        </div>
    );  
}

export default Room;