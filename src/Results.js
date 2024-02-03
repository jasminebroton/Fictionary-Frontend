import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Results() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const category = "a nothingburger";
    const [guesses, setGuesses] = useState(["guess_1", "guess_2", "guess_3", "guess_4", "guess_5", "guess_6", "guess_7", "guess_8", "guess_9"]);
    const [votes, setVotes] = useState({"guess_9": "4", "guess_1": "3", "guess_6": "1"});

    function handleCtnBtn() {
        navigate(`/scoreboard/${roomId}`);
    }

    function MyCanvas() {
        return (
            <canvas
                // width={996}
                // height={468}
                className="bg-white shadow-lg border-2 border-gray-300 m-6 size-11/12"
            ></canvas>
        );
    }

    return(
        <>
            {/* display room and page title for testing */}
            <p>room: {roomId} &#40;results&#41;</p> 
            <p className="text-2xl text-left ml-4">Fictionary</p>
            <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col shrink justify-center items-center aspect-square">
                    <MyCanvas />
                    <p>Category was</p>
                    <p className="text-2xl">{category}</p>
                </div>
                <div className="flex flex-col items-center px-4 gap-4">
                    <p className="text-2xl">Everyone's Guesses</p>
                    <div className="flex flex-row flex-wrap gap-4 shrink justify-center items-center">
                        {guesses.map(guess => <div className="text-2xl px-4 py-2 border-2 border-solid border-black size-fit" key={guess}> {guess}</div> )}
                    </div>
                    {/* status board(?) */}
                    <div></div>
                    <div className="border-2 border-solid border-black hover:border-sky-600 hover:text-sky-600 cursor-pointer size-fit px-4 py-2" onClick={handleCtnBtn} >Continue</div>
                </div>
            </div>
        </>
    );
}

export default Results;