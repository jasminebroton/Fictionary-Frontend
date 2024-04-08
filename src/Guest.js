import './output.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const EXPRESS_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

function Guest() {
    // const { roomId } = useParams();
    console.log(EXPRESS_SERVER_URL);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    

    async function toLobby()
    {
        const guestName = document.getElementById("name").value;
        const roomId = document.getElementById("id").value;
        
        if(roomId.length === 4 && guestName !== "") {
            try {
                const response = await fetch(`${EXPRESS_SERVER_URL}/validateRoom/${roomId}`);
                const data = await response.json();
                if (response.ok) {
                navigate(`/room/${roomId}`, {replace: false, state: {"name": guestName}});
                } else {
                    setError(data.error);
                    alert('Invalid Room ID');
                }
            } catch (error) {
                console.error('Error validating room ID:', error);
                setError('Error validating room ID. Please try again.');
            }
        }
    }
    function returnHome(){
        navigate('/');
    }
    function validateRoomId() {

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