import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

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
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32">Fictionary</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-2 mx-auto" onClick={sendToHost} >Create a Room</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-4 mx-auto" onClick={sendToGuest} >Join a Game</div>
        </div>
    )
}

export default Home;