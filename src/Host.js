import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EXPRESS_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

function Host() {
    const {roomId} = useParams();
    const navigate = useNavigate();

    function toLobby()
    {   
        const guestName = document.getElementById("name").value;
        if(guestName !== "") {
            sendRoomId(roomId);
            navigate(`/room/${roomId}`, {replace: false, state: {"host": true, "name": guestName}});
            // see issue #16
            // window.location.reload();
        }
    }

    function returnHome(){
        navigate('/');
    }
    
    const sendRoomId = async (roomId) => {
        try {
          const response = await fetch(`${EXPRESS_SERVER_URL}/addRoomId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to send roomId to backend');
          }
      
          console.log('RoomId sent to backend successfully');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    return (
        <div className="background custom-text flex flex-col space-y-12">
            <div className="header mb-20">Fictionary</div>
            
            <div className="sub-header">Enter Your Name (Host): </div>
            <div><input type="text" id="name" placeholder='Name' className='text-entry-box'></input></div>
            
            <div>
            <div className="blue-button" onClick={toLobby}>Enter</div> 
            <div className="red-button" onClick={returnHome} >Return Home</div>
            </div>
        </div>
    )
}

export default Host;