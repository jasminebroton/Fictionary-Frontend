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

    function sendToRules(){
        navigate(`/rules`);
    }
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen space-y-3">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32 ">Fictionary</div>
            <div>
                <button className="fic-button w-fit p-4 mx-auto" onClick={sendToHost} >Create a Room</button>
            </div>
            <div>
                <button className="fic-button w-fit p-4 mx-auto" onClick={sendToGuest} >Join a Game</button>
            </div>
            <div>
                <button className="fic-button w-fit p-4 mx-auto" onClick={sendToRules} >Rules</button>
            </div>
        </div>
    )
}

export default Home;