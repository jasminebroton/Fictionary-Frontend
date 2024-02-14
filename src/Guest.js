import './output.css';
import { useNavigate } from "react-router-dom";


function Guest() {
    // const { roomId } = useParams();
    const navigate = useNavigate();
    

    

    function toLobby()
    {
        const guestName = document.getElementById("name").value;
        const roomId = document.getElementById("id").value;
        
        if(roomId.length === 4 && guestName !== "")
            navigate(`/room/${roomId}`, {replace: true, state: {"name": guestName}});
            // see issue #16
            window.location.reload();
    }
    function returnHome(){
        navigate('/');
    }

    return (
        <div className="background custom-text">
            <div>
                <div className="header mb-5">Fictionary</div>
                <div className="sub-header">Join a Game </div>
                <div className="text-entry-box"><input type="text" size={10} placeholder="Your Name" id="name" name="name"></input></div>
                <div className="text-entry-box my-8"><input type="text" size={14} placeholder="Your Room Code" id="id" name="id" required minlength="4" maxlength="4"></input></div>
                <div className="blue-button" onClick={toLobby}>Join</div>
                <div className="red-button" onClick={returnHome} >Return Home</div>
            </div>
        </div>
    );
}

export default Guest;