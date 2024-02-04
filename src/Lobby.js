
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
        <div className="bg-[#ece6c2] font-serif h-screen justify-center">
            <div>
                <h1 className="text-[#6f5643] text-2xl pt-10 mb-0">Fictionary</h1>
                <h1 className="text-[#6f5643] text-5xl pt-10 mb-5">Lobby</h1>
                <p className="text-[#6f5643] text-3xl pt-0 mb-10">Room: {roomId}</p>
            </div>
            <div>
                <ul className = "grid grid-cols-2 gap-10" > 
                    {players.map((name,i) =>(
                        <li className="text-[#6f5643] text-2xl pt-0 mb-0" key={i}>{name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={handleLeaveClick} className="bg-[#cc6b49] text-[#ece6c2] w-20 p-2 mx-20 mt-10">Leave</button>
                <button onClick={handleStartClick} className="bg-[#cc6b49] text-[#ece6c2] w-20 p-2 mx-20 mt-10">Start</button>
            </div>
        </div>
    );
}

export default Lobby;