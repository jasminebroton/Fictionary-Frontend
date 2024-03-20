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
            navigate(`/room/${roomId}`, {replace: false, state: {"name": guestName}});
            // see issue #16
            // window.location.reload();
    }
    function returnHome(){
        navigate('/');
    }

    return (
        <div className="background custom-text flex flex-col space-y-12">
            <div>
                <div className="header mb-20">Fictionary</div>
                <div className="sub-header">Join a Game </div> <br /> <br />
                <div>
                <div><input type="text" placeholder="Your Name" id="name" name="name" className="text-entry-box"></input></div>
                <div><input type="text" placeholder="Your Room Code" id="id" name="id" required minlength="4" maxlength="4" className="text-entry-box my-8"></input></div>
                </div>
                <div>
                <div className="blue-button" onClick={toLobby}>Join</div>
                <div className="red-button" onClick={returnHome} >Return Home</div>
                </div>
            </div>
        </div>
    );
}

export default Guest;