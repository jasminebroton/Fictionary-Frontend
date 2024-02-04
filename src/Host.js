import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Host() {
    const {roomId} = useParams();
    const navigate = useNavigate();

    function toLobby()
    {   
        const guestName = document.getElementById("name").value;
        if(guestName !== "")
            navigate(`/lobby/${roomId}/${guestName}`);
    }

    function returnHome(){
        navigate('/');
    }

    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-20">Fictionary</div>
            <div className="text-[#6f5643] my-4 my text-4xl">Enter Your Name (Host): </div>
            <div className="text-3xl mx-auto"><input type="text" id="name" size={15}></input></div>
            <div className="bg-[#cc6b49] text-[#ece6c2] w-1/12 my-4 text-4xl mx-auto" onClick={toLobby}>Enter</div> 
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-2 mx-auto" onClick={returnHome} >Return Home</div>
        </div>
    )
}

export default Host;