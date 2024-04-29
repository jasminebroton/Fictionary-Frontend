import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useSocket } from './context/SocketContext';
import './output.css';

var theView;
var globalBrushSize;
var globalPaintColor;

const EXPRESS_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;


function Drawing({viewCurr, setViewCurr, setViewNext,isHost, setIsHost, players, setPlayers, guesses, setGuesses, usedIndexes, setUsedIndexes, round, setRound}){
    const { roomId } = useParams();
    // const [tricksters, setTricksters] = useState(["user_1", "user_2", "user_4", "user_5", "user_6", "user_7", "user_8", "user_9"]);
    const [category, setCategory] = useState({ category: "Animals" });
    const [view, setView] = useState(isHost);
    const [artist, setArtist] = useState({});
    const { socket } = useSocket();
    const [word, setWord] = useState();

    theView = view;
    const [paintColor, setPaintColor] = useState('black');
    const [brushSize, setBrushSize] = useState(2);
    const [counter, setCounter] = useState(180);
    const [timer, setTimer] = useState("0:00");
    const [isDrawingDisabled, setIsDrawingDisabled] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isDrawingSubmitted, setIsDrawingSubmitted] = useState(false);
    const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', { userid: socket.id, room: roomId, userName: 'User' });

            socket.on('updateUserList', (users) => {
                setPlayers(users);
                const currentArtist = users.find((user) => user.isHost);
                setArtist(currentArtist);
            });
    
            socket.on('drawingPrivilege', (hasPrivilege) => {
                setIsHost(hasPrivilege);
            });
            
            socket.on('currentCategory', (selectedCategory) => {
                setCategory({ category: selectedCategory });
              });
    
            socket.on('gameStarted', () => {
                // Handle game start logic
            });
    
            socket.on('error', (errorMessage) => {
                console.error(errorMessage);
            });
    
            socket.on('currentCategory', (selectedCategory) => {
  setCategory({ category: selectedCategory });
});
            // Request the current category when the component mounts
            socket.emit('requestCurrentCategory', roomId);
    
            return () => {
                socket.off('updateUserList');
                socket.off('drawingPrivilege');
                socket.off('currentCategory');
                socket.off('gameStarted');
                socket.off('error');
            };
        }
    }, [socket, roomId, setIsHost]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (viewCurr) {
                setCounter(counter => counter - 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [viewCurr, setCounter]);

    useEffect(() => {
        setTimer(() => {
            var minutes = Math.floor(counter / 60);
            var seconds = counter % 60;
            if (seconds > 9) {
                return (minutes + ":" + seconds);
            }
            return (minutes + ":0" + seconds);
        });
    }, [counter, setTimer]);

    //temporary function to test both views at once
    function swapView() {
        setView(() => {
            theView = !view;
            return !view;
        });
    }
    const handleNextBtn = useCallback(() => {
        setViewNext(true);
        setViewCurr(false);
        setCounter(180);
    }, [setViewCurr, setViewNext, setCounter]);
    //Word retrieval 
    useEffect(() => {

        setRound(round+1);
        //converts roomID to a number, add round
        function seedGeneration() {
            let num = "";
            for (let i = 0; i < roomId.length; i++) {
              num += roomId.charCodeAt(i);
            }
            let number = parseInt(num);
            return number+round;
        }
        let seed = seedGeneration();

        //let theCategory="animals";
        let theCategory= category.category;
        

        async function fetchWord() {
            //swap Url on deployment (back end url)
            const response = await fetch(`${EXPRESS_SERVER_URL}words?seed=${seed}&category=${theCategory}`);
            console.log(response);

            const word = await response.json();
            console.log(word);
            setWord(word);
        }
        fetchWord().catch(console.dir);
        // console.log("THIS IS BEING CALLED");
        //}

    },[isHost,roomId,category]);


    // Note for testing: make sure you only try to submit the drawing of the current artist
    function submitGuess(){
        //do{
            if(socket){
                if(view){
                    setGuesses([...guesses, {text: category.category, userId: socket.id, voterIds: []}]);
                }
                else { 
                const guess = document.getElementById("guess").value;
                  if(isDrawingSubmitted && !isGuessSubmitted) {
                   setGuesses([...guesses, {text: guess, userId: socket.id, voterIds: []}]);
                    setIsGuessSubmitted(true);
                    setIsButtonDisabled(true);
                   socket.emit('guessSubmitted', { room: roomId });
                }
                  
             
        }
    }
    //} while (!socket);
    }

    //placeholder until the drawing can actually be sent to the backend
    const submitDrawing = () => {
        submitGuess();
        setIsDrawingDisabled(true);
        setIsButtonDisabled(false);
        socket.emit('drawingSubmitted', { room: roomId })
    };

   
    useEffect(() => {
        if (counter <= 90) {
            submitDrawing();
        }
    }, [counter, viewCurr, submitDrawing]);

    useEffect(() => {
        if (socket) {
            socket.on('timeToGuess', (status) => {
                setIsDrawingDisabled(status);
                setIsButtonDisabled(!status);
                setIsDrawingSubmitted(status);
            });
            return () => {
                socket.off('timeToGuess');
            };
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('allGuessed', (data) => {
                handleNextBtn();
            });
    
            return () => {
                socket.off('allGuessed');
            };
        }
    }, [socket, handleNextBtn]);
    
    function sendMessage() { 
        const messageInput = document.getElementById("message");
        const message = messageInput.value;
        if (message.trim() !== '') {
            socket.emit('sendMessage', { room: roomId, message });
            messageInput.value = '';
        }
    }
     // Used for changing brushSize and paintColor
    function onOptionChange(e) {
        const theData = e.target.value;
        if (theData === "1" || theData === "2" || theData === "4" || theData === "32")
            setBrushSize(parseInt(theData));
        else
            setPaintColor(theData);
    }

    // Allows globalPaintColor and globalBrushSize to update outside of when the values are changed
    // via their respective buttons
    useEffect(() => {
        globalPaintColor = paintColor;
        globalBrushSize = brushSize;
    });

    if (view) {
        return (
            <div>
                {/* button for testing both views */}
                <div className="bg-[#cc6b49] text-[#ece6c2] font-sans" onClick={swapView}>Switch to "Trickster" View</div>
                {/* <div className="col-start-2 col-span-2 row-start-2 row-span-2"><MyCanvas/></div> */}
                <div className="background custom-text grid grid-cols-4 grid-rows-3">
                    <div className="col-start-2 col-span-2 px-12">
                        <p className="sub-header">Fictionary</p>
                        <p className="pb-4">Room: {roomId}</p>
                        <p className="header">WORD IS:</p>{/*Change to word -> return word */}
                        <p className="large-text">{word}</p>
                    </div>
                    <p className="timer">{timer}</p>
                    <form>
                        <section className="row-start-2">
                            <fieldset>
                                <legend className="text-5xl py-8">Drawing Tools</legend>
                                <p>
                                    <label htmlFor="tool_1">Small </label>
                                    <input type="radio" name="tool" id="tool_1" value="1" onChange={onOptionChange} />
                                </p>
                                <p>
                                    <label htmlFor="tool_2">Medium </label>
                                    <input type="radio" name="tool" id="tool_2" value="2" onChange={onOptionChange} />
                                </p>
                                <p>
                                    <label htmlFor="tool_3">Large </label>
                                    <input type="radio" name="tool" id="tool_3" value="4" onChange={onOptionChange} />
                                </p>
                                <p>
                                    <label htmlFor="tool_4">Ultra Larger </label>
                                    <input type="radio" name="tool" id="tool_4" value="32" onChange={onOptionChange} />
                                </p>
                            </fieldset>
                        </section>
                        <section className="row-start-3 pt-5 ">
                            <p>
                                <label className="text-5xl" htmlFor="colorPicker">Color Picker &nbsp;</label>
                                <br /> <br />
                                <select id="colorPicker" name="color" onChange={onOptionChange}>
                                    <option id="black" value="black">Black</option>
                                    <option id="red" value="red">Red</option>
                                    <option id="orange" value="orange">Orange</option>
                                    <option id="yellow" value="yellow">Yellow</option>
                                    <option id="green" value="green">Green</option>
                                    <option id="blue" value="blue">Blue</option>
                                    <option id="purple" value="purple">Purple</option>
                                    <option id="white" value="white">Eraser</option>
                                </select>
                            </p>
                        </section>
                    </form>

                    <div className="col-start-2 col-span-2 row-start-2 row-span-2"><MyCanvas/></div>

                    <div onClick={submitDrawing} disabled={isDrawingDisabled} className="brown-button w-fit col-start-4 row-start-3" >Submit Drawing</div>
                </div>
            </div>
        );
    }
    return (
        <div>
            {/* button for testing both views */}
            {/*<div className="bg-[#73bda8] text-[#6f5643] font-sans" onClick={swapView}>Switch to "Artist" View</div>*/}

            <div className="background custom-text grid grid-cols-4 grid-rows-4">
                <div>
                    <p className="sub-header">Fictionary</p>
                    <p>Room: {roomId}</p>
                </div>
                <div className="row-start-2">
                    <p className="header">CATEGORY IS:</p>
                    <p className="large-text">{category.category}</p>
                </div>
                <p className="timer row-start-3">{timer}</p>

                <div className="col-start-2 col-span-2 row-span-3">
                    <div className="col-start-2 col-span-2 row-start-2 row-span-2"><MyCanvas /></div>
                </div>
                

                
                <div className = "col-start-4 row-span-2">
                    {/*placeholder until the actual chatroom can be displayed*/}
                    <p className="bg-[#6f5643] text-[#ece6c2] size-full">Chat Room</p>
                    <div>
                        <form>
                            <p>
                                <input className="text-entry-box w-full" type="text" id="message" name="message" placeholder="Message..." />
                            </p>
                        </form>
                        <div className="blue-button" onClick={sendMessage}>Send</div>
                    </div>
                </div>
                <form className="row-start-4 col-span-4">
                    <p>
                        <input className="text-entry-box w-1/3" type="text" id="guess" name="guess" maxlength="15" placeholder="Enter Your Guess Here" />
                    </p>
                    <div className="blue-button" onClick={submitGuess} disabled={isButtonDisabled}>Submit Guess</div>
                </form>
            </div>
        </div>
    );
}

function MyCanvas() {
    const { roomId } = useParams();
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const [lastPos, setLastPos] = useState(null);
    const { socket } = useSocket();

    useEffect(() => {
        // socket.current = io('http://localhost:8000');
        // socket.current.on('connect', () => {
        //     console.log("Connected to Socket.IO server");
        //     // socket.current.emit('joinRoom', roomId);
        // });

        // socket.current.on('drawingPrivilege', (hasPrivilege) => {
        //     setCanDraw(hasPrivilege);
        //     console.log(`Received drawing privilege: ${hasPrivilege}`);
        // });

        socket.on('drawing', (data) => {
            drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
        });

        return () => {
            socket.off('drawing');
        };
    }, [socket]);

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };

    const drawLine = (x0, y0, x1, y1, color, size) => {
        const context = canvasRef.current.getContext('2d');
        context.lineWidth = size;
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
        context.closePath();
    };

    const handleMouseDown = (e) => {
        if (!theView) return;
        const pos = getMousePos(canvasRef.current, e);
        setLastPos(pos);
        setDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!drawing || !theView) return;
        const pos = getMousePos(canvasRef.current, e);
        if (lastPos) {
            drawLine(lastPos.x, lastPos.y, pos.x, pos.y, globalPaintColor, globalBrushSize);
            const drawData = { room: roomId, x0: lastPos.x, y0: lastPos.y, x1: pos.x, y1: pos.y, color: globalPaintColor, size: globalBrushSize };
            socket.emit('draw', drawData);
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
            width={443}
            height={350}
            className="bg-white shadow-lg border-2 border-gray-300 m-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
        ></canvas>
    );
}

export default Drawing;