
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Lobby(){
    const navigate = useNavigate();
    const { roomId } = useParams(); //get room ID from URL
    //have user list
    const [players, setPlayers] = useState(["user1","user2","user3","user4","user5","user6","user7","user8","user9","user10"])

    //functions for buttons
    function handleLeaveClick() { //leave
        navigate(`/`);//(home)
    }
    function handleStartClick() { //start
        navigate(`/categories/${roomId}`);
    }
    
    //procedurally generate table/list for users 
    return (
        <div className="background custom-text">
            <div>
                <h1 className="large-text">Fictionary</h1>
                <h1 className="header mb-5">Lobby</h1>
                <p className="sub-header pt-0 mb-10">Room: {roomId}</p>
            </div>
            <div>
                <ul className = "grid grid-cols-2 gap-10" > 
                    {players.map((name,i) =>(
                        <li className="large-text pt-0 mb-0" key={i}>{name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={handleLeaveClick} className="red-button mx-20 mt-10">Leave</button>
                <button onClick={handleStartClick} className="blue-button mx-20 mt-10">Start</button>
            </div>
        </div>
    );
}

export default Lobby;