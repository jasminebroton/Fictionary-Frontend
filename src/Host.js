import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Host() {
    const {roomId} = useParams();
    const navigate = useNavigate();

    function toLobby()
    {   
        const guestName = document.getElementById("name").value;
        if(guestName !== "") {
            navigate(`/room/${roomId}`, {replace: true, state: {"host": true, "name": guestName}});
            // see issue #16
            window.location.reload();
        }
    }

    function returnHome(){
        navigate('/');
    }

    return (
        <div className="background custom-text">
            <div className="header mb-20">Fictionary</div>
            <div className="sub-header">Enter Your Name (Host): </div>
            <div className="text-entry-box"><input type="text" id="name" size={15}></input></div>
            <div className="blue-button" onClick={toLobby}>Enter</div> 
            <div className="red-button" onClick={returnHome} >Return Home</div>
        </div>
    )
}

export default Host;