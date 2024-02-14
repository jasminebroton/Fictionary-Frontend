import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import "flowbite";

function Home() {
    const navigate = useNavigate();
    const uid = new ShortUniqueId({ length: 4 });

    function sendToGuest() {
        // const roomId = uid.rnd();
        navigate(`/guest/`);
    }

    function sendToHost()
    {
        const roomId = uid.rnd();
        navigate(`/host/${roomId}`);
    }

    function sendToRules(){
        navigate(`/rules`);
    }
    
    return (
        <div className="background custom-text">
            <div className="header mb-32">Fictionary</div>
            <div className="red-button" onClick={sendToHost} >Create a Room</div>
            <div className="yellow-button" onClick={sendToGuest} >Join a Game</div>
            <div className="blue-button" onClick={sendToRules} >Rules</div>
        </div>
    )
}

export default Home;