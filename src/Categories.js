import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSocket } from './context/SocketContext';

const EXPRESS_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

function Categories({ viewCurr, setViewCurr, setViewNext, players, setPlayers, isHost, setIsHost, round, setRound }) {
    const { roomId } = useParams();
    const [categories, setCategories] = useState(["1", "2", "3"]);
    const [counter, setCounter] = useState(60);
    const [timer, setTimer] = useState("0:00");
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { socket } = useSocket(); // Assume socket context is provided

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (selectedCategory) {
            socket.emit('voteCategory', { roomId, category: selectedCategory });
        }
    }, [socket, roomId, selectedCategory]);

    const handleNextBtn = useCallback(() => {
        setViewNext(true);
        setViewCurr(false);
        setCounter(60);
        socket.emit('endVoting', roomId); // Inform the server when navigating away
    }, [setViewCurr, setViewNext, setCounter, socket, roomId]);

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
            return seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
        });
    }, [counter]);

    // Automatically navigate to the next view when the timer reaches zero
    useEffect(() => {
        if (counter <= 0) {
            handleNextBtn();
        }
    }, [counter, handleNextBtn]);

    // Handling real-time category selection
    useEffect(() => {
        socket.on('categorySelected', (selectedCategory) => {
            setViewNext(true);
            setViewCurr(false);
        });

        return () => {
            socket.off('categorySelected');
        };
    }, [socket, setViewNext, setViewCurr]);

    // Category retrieval and setting up seed based on room ID and round
    useEffect(() => {
        if (process.env.NODE_ENV === "test") {
            setCategories(["food", "clothing", "animals"]);
        } else {
            setRound(round + 1);
            const seed = Array.from(roomId).reduce((acc, char) => acc + char.charCodeAt(0), 0) + round;
            async function fetchCategories() {
                const response = await fetch(`${EXPRESS_SERVER_URL}categories?seed=${seed}`);
                const categories = await response.json();
                setCategories(categories);
            }
            fetchCategories().catch(console.error);
        }
    }, [isHost, roomId, round, setRound]);

    return (
        <div className="background custom-text">
            <div className="grid grid-cols-5 grid-rows-2 justify-center">
                <p className="header col-start-2 col-span-3">Fictionary</p>
                <p className="timer">{timer}</p>
                <p className="text-1xl col-start-2 col-span-3 row-start-2">Room: {roomId}</p>
            </div>
            <form className="bg-[#6f5643] p-4" onSubmit={handleSubmit}>
                <fieldset className="grid grid-cols-3 grid-rows-2 gap-x-3">
                    <legend className="header text-[#ece6c2] col-span-3">Vote for a Category</legend>
                    {categories.map((category, index) => (
                        <div className="grid" key={index}>
                            <label className="bg-[#73bda8] p-4 mx-auto text-3xl" htmlFor={`category_${index}`}>
                                {category}
                            </label>
                            <input
                                type="radio"
                                name="category"
                                id={`category_${index}`}
                                value={category}
                                onChange={() => setSelectedCategory(category)}
                            />
                        </div>
                    ))}
                </fieldset>
                <div className="flex justify-center brown-button">
                    <div>
                        <button
                            type="submit"
                            disabled={isButtonDisabled || !selectedCategory}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Categories;