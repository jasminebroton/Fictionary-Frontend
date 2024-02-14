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
            navigate(`/lobby/${roomId}/${guestName}`);
    }
    function returnHome(){
        navigate('/');
    }

    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div>
                <div className="text-[#6f5643] text-5xl pt-10 mb-5">Fictionary</div>
                <div className="text-[#6f5643] mb-20 my text-3xl">Join a Game </div>
                <div className="text-3xl mx-auto"><input type="text" size={10} placeholder="Your Name" id="name" name="name"></input></div>
                <div className="text-3xl my-8 mx-auto"><input type="text" size={14} placeholder="Your Room Code" id="id" name="id" required Minlength="4" Maxlength="4"></input></div>
                <div className="bg-[#cc6b49] text-[#ece6c2] w-1/12 my-4 text-4xl mx-auto" onClick={toLobby}>Join</div>
                <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-2 mx-auto" onClick={returnHome} >Return Home</div>
            </div>
        </div>
    );
}

export default Guest;