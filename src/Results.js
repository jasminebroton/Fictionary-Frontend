import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Results() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const category = "a nothingburger";
    const [guesses, setGuesses] = useState(["user_1", "user_2", "user_3", "user_4", "user_5", "user_6", "user_7", "user_8", "user_9"]);
    const [votes, setVotes] = useState([{user: "user_9", points: 4, role: "trickster"}, {user: "user_1", points: 3, role: "artist"}, {user: "user_6", points: 1, role: "trickster"}]);
    const [correct, setCorrect] = useState(["user_3", "user_6", "user_9"]);
    const [score, setScore] = useState(0);

    function handleCtnBtn() {
        navigate(`/scoreboard/${roomId}`);
    }

    function MyCanvas() {
        return (
            <canvas
                // width={996}
                // height={468}
                className="bg-white shadow-lg border-2 border-gray-300 size-11/12"
            ></canvas>
        );
    }

    return(
        <div className="bg-[#ece6c2] font-serif pb-4 px-6 min-h-screen max-h-max">
            {/* display room and page title for testing */}
            <p>room: {roomId} &#40;results&#41;</p> 
            <p className="text-2xl text-left ml-4">Fictionary</p>
            <div className="grid lg:grid-cols-2 lg:grid-rows-1 sm:grid-rows-2 p-0 m-0 justify-items-stretch">
                <div className="flex flex-col justify-center items-center aspect-square max-h-[80vh] p-0 m-4">
                    <MyCanvas />
                    <p className="my-2">Category was</p>
                    <p className="text-2xl">{category}</p>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <p className="text-2xl">Everyone's Guesses</p>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 shrink justify-center items-center">
                        {guesses.map(guess => <div className="text-2xl px-4 py-2 border-2 border-solid border-black size-fit" key={guess}> {guess}</div> )}
                    </div>
                    {/* status board(?) */}
                    <div className="flex flex-col shrink text-left border-2 border-solid border-black px-4 py-2 max-w-96">
                        <div className="mb-4">
                            {votes.map(vote => <div key={vote.user}>{vote.user} scored {vote.points} {vote.role} points.</div> )}
                        </div>
                        <p className="flex shrink">users: {correct.join(", ")} earned 1 bonus point for guessing correctly.</p>
                    </div>
                    <p>Your Score: {score}</p>
                    <div className="border-2 border-solid border-black hover:border-sky-600 hover:text-sky-600 cursor-pointer size-fit px-4 py-2" onClick={handleCtnBtn} >Continue</div>
                </div>
            </div>
        </div>
    );
}

export default Results;