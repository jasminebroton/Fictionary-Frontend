import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();


    function handleHostClick() {
        navigate(`/host/`);
    }
    function handleJoinClick(){
        navigate(`/join/`);
    }
    function handleRulesClick(){
        navigate(`/rules/`);
    }
    
    return (
        <div className="bg-[#ece6c2] space-y-2 font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32">Fictionary</div>
            <div>
                <button className="bg-[#cc6b49] hover:bg-[#6b3927] text-[#ece6c2] w-fit p-2 mx-auto" onClick={handleHostClick} >Create a Room</button>
            </div>
            <div> 
                <button className="bg-[#cc6b49] hover:bg-[#6b3927] text-[#ece6c2] w-fit p-2 mx-auto" onClick={handleJoinClick} >Join a Room</button>
            </div>
            <div> 
                <button className="bg-[#cc6b49] hover:bg-[#6b3927] text-[#ece6c2] w-fit p-2 mx-auto" onClick={handleRulesClick} >Rules</button>
            </div>
        </div>
    )
}

export default Home;