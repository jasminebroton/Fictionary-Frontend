import { useState } from "react";
import { useParams } from "react-router-dom";

function Scoreboard({setViewCurr, setViewNext, setViewNextRound, setViewFinalScore, setViewThisRound, roundCount, usedIndexes, players, setRoundCount, setUsedIndexes}) {
    const { roomId } = useParams();
    const [data, setData] = useState([{user: "user_9", points: 5, rank: "1st"}, {user: "user_1", points: 3, rank: "2nd"}, {user: "user_6", points: 2, rank: "3rd"}, {user: "user_3", points: 1, rank: "4th"}, {user: "user_2", points: 0, rank: "5th"}, {user: "user_4", points: 0, rank: "5th"}, {user: "user_5", points: 0, rank: "5th"}, {user: "user_7", points: 0, rank: "5th"}, {user: "user_8", points: 0, rank: "5th"}]);
    const [nextArtist, setNextArtist] = useState("user_4");

    function handleNextBtn() {
        setViewCurr(false);
        // if 3 rounds have occured
        if(roundCount == 3) {
            setViewFinalScore(true);
        // if ever player has gotten a turn to draw, start next round 
        } else if(players.length == usedIndexes.length) {
            setRoundCount(roundCount + 1);
            setUsedIndexes([]);
            setViewNextRound(true);
        } else {
            setViewNext(true);
        }
        }
    

    return (
        <div className="background custom-text pb-4 px-6 min-h-screen max-h-max">
            {/* display room and page title for testing */}
            <p>room: {roomId} &#40;scoreboard&#41;</p> 
            <p className="large-text text-center ml-4">Fictionary</p>
            <div className="grid lg:grid-cols-2 lg:grid-rows-1 sm:grid-rows-2 p-0 m-0 justify-center items-center justify-items-stretch">
                <div className="flex flex-col justify-center items-center">
                    <p className="large-text pb-2">Scores:</p>
                    <table className="table">
                        <tr className="borders">
                            <th className="borders table-header">Player</th>
                            <th className="borders table-header">Place</th>
                            <th className="borders table-header">Score</th>
                        </tr>
                        {data.map(d => <tr className="borders">
                            <td className="borders table-data">{d.user}</td>
                            <td className="borders table-data">{d.rank}</td>
                            <td className="borders table-data">{d.points} {d.points == 1 ? `pt` : `pts`}</td>
                        </tr>)}
                    </table>
                    <button onClick={handleNextBtn} type="button" className="blue-button cursor-pointer size-fit px-4 py-2" data-testid="scoreboard-ctn-btn" >Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard;