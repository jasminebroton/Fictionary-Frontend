import { useParams, useLocation } from 'react-router-dom';
import './output.css';
import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import "flowbite";

import Results from "./Results.js";
import Scoreboard from './Scoreboard';

import TestModal from "./TestModal";
import Testvas from "./Testvas";

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
        // const [canDraw, setCanDraw] = useState(true);
        const [lastPos, setLastPos] = useState(null);

        useEffect(() => {
            socket.current = io('http://localhost:8000');
            socket.current.on('connect', () => {
                console.log("Connected to Socket.IO server");
                socket.current.emit('joinRoom', roomId);
            });
    
            // socket.current.on('drawingPrivilege', (hasPrivilege) => {
            //     setCanDraw(hasPrivilege);
            //     console.log(`Received drawing privilege: ${hasPrivilege}`);
            // });
    
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
                width={996}
                height={468}
                className="bg-white shadow-lg border-2 border-gray-300 m-10"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
            ></canvas>
        );
    }

    return (
        // <div className="flex flex-col items-center justify-center h-screen bg-custom-bg-color">
        //     <div>
        //         <p className="text-center text-custom-size">Room: {roomId}</p>
        //     </div>
        // </div>
        <div>
            {/* <Results modalId="results-modal" nextModalId="scoreboard-modal" display="hidden" /> */}
            {/* <Scoreboard modalId="scoreboard-modal" nextModalId="categories-modal" display="hidden" /> */}

            {/* <button data-modal-target="test-modal" data-modal-toggle="test-modal" type="button" >show</button>
            <div id="test-modal" className="bg-sky-800 hidden" aria-hidden="true">
                hi mom
                <button data-modal-target="modal-2" data-modal-show="modal-2" data-modal-hide="test-modal" type="button">hide</button>
            </div> */}
            <button data-modal-target="modal-1" data-modal-toggle="modal-1" type="button">show</button>

            <div id="modal-1" className="hidden">
                <TestModal modalId="modal-1" nextModalId="modal-2" />
            </div>

            <div id="modal-2" className="hidden" >
                <Testvas MyCanvas={MyCanvas} />
            </div>
        </div>
    );  
}

export default Room;