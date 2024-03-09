import { useState } from "react";
import { useParams } from "react-router-dom";

function Results({setViewCurr, setViewNext }) {
    const { roomId } = useParams();
    const category = "a nothingburger";
    const [guesses, setGuesses] = useState(["user_1", "user_2", "user_3", "user_4", "user_5", "user_6", "user_7", "user_8", "user_9"]);
    const [votes, setVotes] = useState([{user: "user_9", points: 4, role: "trickster"}, {user: "user_1", points: 3, role: "artist"}, {user: "user_6", points: 1, role: "trickster"}]);
    const [correct, setCorrect] = useState(["user_3", "user_6", "user_9"]);
    const [score, setScore] = useState(0);

    function MyCanvas() {
        return (
            <canvas
                // width={996}
                // height={468}
                className="canvas"
            ></canvas>
        );
    }

    function handleNextBtn() {
        setViewCurr(false);
        setViewNext(true);
    }
    return(
        <div className="background custom-text min-h-screen max-h-max">
            {/* display room and page title for testing */}
            <p>room: {roomId} &#40;results&#41;</p> 
            <p className="large-text text-left ml-4">Fictionary</p>
            <div className="grid lg:grid-cols-2 lg:grid-rows-1 sm:grid-rows-2 p-0 m-0 justify-items-stretch">
                <div className="flex flex-col justify-center items-center max-h-[80vh] p-0 m-4">
                    <MyCanvas />
                    <p className="my-2">Category was</p>
                    <p className="laege-text">{category}</p>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <p className="large-text">Everyone's Guesses</p>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 shrink justify-center items-center">
                        {guesses.map(guess => <div className="large-text bg-[#499b83] text-[#ece6c2] p-2" key={guess}> {guess}</div> )}
                    </div>
                    {/* status board(?) */}
                    <div className="flex flex-col shrink text-left bg-[#6f5643] text-[#ece6c2] px-4 py-2 max-w-96">
                        <div className="mb-4">
                            {votes.map(vote => <div key={vote.user}>{vote.user} scored {vote.points} {vote.role} points.</div> )}
                        </div>
                        <p className="flex shrink">users: {correct.join(", ")} earned 1 bonus point for guessing correctly.</p>
                    </div>
                    <p className="sub-header">Your Score: {score}</p>
                    <button onClick={handleNextBtn} type="button" className="blue-button size-fit px-4 py-2 mt-0" data-testid="results-ctn-btn" >Continue</button>
                </div>
            </div>
        </div>
    );
}

export default Results;