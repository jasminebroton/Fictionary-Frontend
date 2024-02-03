import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Scoreboard() {
    const navigate = useNavigate();
    const { roomId } = useParams();

    function handleCtnBtn() {
        navigate(`/categories/${roomId}`);
    }
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            {/* display room and page title for testing */}
            <p>room: {roomId} &#40;scoreboard&#41;</p> 
            <p className="text-2xl text-left ml-4">Fictionary</p>
            <div className="border-2 border-solid border-black hover:border-sky-600 hover:text-sky-600 cursor-pointer size-fit px-4 py-2" onClick={handleCtnBtn} >Continue</div>
        </div>
    )
}

export default Scoreboard;