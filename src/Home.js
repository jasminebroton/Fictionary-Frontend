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
    
    function sendToTest() {
        const roomId = "TEST";
        const userPerms = {
            "host": true
        };
        navigate(`/room/${roomId}`, {replace: true, state: {userPerms}});
        // see issue #16 for why we need this dumb as rocks line of code
        window.location.reload();
    }
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32">Fictionary</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-2 mx-auto" onClick={sendToHost} >Create a Room</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-4 mx-auto" onClick={sendToGuest} >Join a Game</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-6 mx-auto" onClick={sendToRules} >Rules</div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-6 mx-auto" onClick={sendToTest} >TEST</div>
        </div>
    )
}

export default Home;