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

// import TestModal from "./TestModal";
// import Testvas from "./Testvas";

function Room() {
    const { roomId } = useParams();
    const location = useLocation();
    const [host] = useState(location.state?.userPerms?.host ? true : false);

    const socket = useRef(null);

    function MyCanvas({ roomId }) {
        const canvasRef = useRef(null);
        const [drawing, setDrawing] = useState(false);
        const [canDraw, setCanDraw] = useState(host);
        console.log(`canDraw: ${canDraw}`);
        const [lastPos, setLastPos] = useState(null);

        useEffect(() => {
            socket.current = io('http://localhost:8000');
            socket.current.on('connect', () => {
                console.log("Connected to Socket.IO server");
                socket.current.emit('joinRoom', roomId);
            });
    
            socket.current.on('drawing', (data) => {
                drawLine(data.x0, data.y0, data.x1, data.y1);
            });
    
            return () => {
                socket.current.disconnect();
            };
        }, [roomId]);
    
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
    
            context.lineWidth = 2;
            context.strokeStyle = 'black';
        }, []);
    
        const getMousePos = (canvas, evt) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        };
    
        const drawLine = (x0, y0, x1, y1) => {
            const context = canvasRef.current.getContext('2d');
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.stroke();
            context.closePath();
        };
    
        const handleMouseDown = (e) => {
            if (!canDraw) return;
            const pos = getMousePos(canvasRef.current, e);
            setLastPos(pos);
            setDrawing(true);
        };
    
        const handleMouseMove = (e) => {
            if (!drawing || !canDraw) return;
            const pos = getMousePos(canvasRef.current, e);
            if (lastPos) {
                drawLine(lastPos.x, lastPos.y, pos.x, pos.y);
                const drawData = { room: roomId, x0: lastPos.x, y0: lastPos.y, x1: pos.x, y1: pos.y };
                console.log('Emitting draw event', drawData);
                socket.current.emit('draw', drawData);
                setLastPos(pos);
            }
        };
    
        const handleMouseUp = () => {
            setDrawing(false);
            setLastPos(null);
        };
    
        const handleMouseOut = () => {
            if (drawing) {
                setDrawing(false);
                setLastPos(null);
            }
        };
        
        return (
            <canvas
                ref={canvasRef}
                className="bg-white shadow-lg border-2 border-gray-300 size-11/12"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
            ></canvas>
        );
    }

    return (
        <div>
            {/* <button data-modal-target="lobby-modal" data-modal-show="lobby-modal" type="button" >show</button> */}

            <div data-modal-target="lobby-modal" id="lobby-modal" className=" sbg-[#ece6c2] font-serif h-screen justify-center">
                <Lobby modalId="lobby-modal" nextModalId="categories-modal" />
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
                <Results modalId="results-modal" nextModalId="scoreboard-modal" MyCanvas={MyCanvas} />
            </div>
            <div data-modal-target="scoreboard-modal" id="scoreboard-modal" className={`hidden bg-[#ece6c2] font-serif pb-4 px-6 min-h-screen max-h-max`} >
                <Scoreboard modalId="scoreboard-modal" nextModalId="categories-modal" />
            </div>

            {/* <button data-modal-target="modal-1" data-modal-toggle="modal-1" type="button">show</button>

            <div id="modal-1" className="hidden">
                <TestModal modalId="modal-1" nextModalId="modal-2" />
            </div>

            <div id="modal-2" className="hidden" >
                <Testvas MyCanvas={MyCanvas} />
            </div> */}
        </div>
    );  
}

export default Room;