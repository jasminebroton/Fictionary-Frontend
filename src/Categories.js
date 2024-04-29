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
    // submits vote to the backend
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (selectedCategory) {
            setButtonDisabled(true);
            socket.emit('voteCategory', { roomId, category: selectedCategory });
        }
    }, [socket, roomId, selectedCategory]);


    //navigates away from the page
    const handleNextBtn = useCallback(() => {
     socket.emit('endVoting', roomId); // Inform the server when navigating away
    }, [socket, roomId]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (viewCurr) {
                setCounter(counter => counter - 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [viewCurr]);

    useEffect(() => {
        setTimer(() => {
            var minutes = Math.floor(counter / 60);
            var seconds = counter % 60;
            return seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
        });
    }, [counter]);
    //navigates away if timer is over
    // Automatically navigate to the next view when the timer reaches zero
    useEffect(() => {
        if (counter <= 0) {
            handleNextBtn();
        }
    }, [counter, handleNextBtn]);

    useEffect(() => {
        if (socket) {
            socket.on('allVoted', (submits) => {
                handleNextBtn();
            });
    
            return () => {
                socket.off('allVoted');
            };
        }
    }, [socket, handleNextBtn]);
    
    // Handling real-time category selection
    useEffect(() => {
        socket.on('categorySelected', (selectedCategory) => {
            setViewNext(true);
            setViewCurr(false);
            setCounter(60);
        });

        return () => {
            socket.off('categorySelected');
        };
    }, [socket, setViewNext, setViewCurr]);

    // Category retrieval and setting up seed based on room ID and round
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const seed = Array.from(roomId).reduce((acc, char) => acc + char.charCodeAt(0), 0) + round;
                const response = await fetch(`${EXPRESS_SERVER_URL}categories?seed=${seed}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categories = await response.json();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Handle the error case, e.g., display an error message to the user
            }
        };

        if (process.env.NODE_ENV === "test") {
            setCategories(["food", "clothing", "animals"]);
        } else {
            fetchCategories();
        }

    }, [roomId, round]); // Removed isHost, setRound from the dependencies to avoid infinite loop

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
                <div disabled = {isButtonDisabled} onClick={handleSubmit} className="flex justify-center brown-button">Submit</div>
            </form>
        </div>
    );
}

export default Categories;