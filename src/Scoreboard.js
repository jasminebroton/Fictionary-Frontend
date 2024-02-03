import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Scoreboard() {
    const navigate = useNavigate();
    const { roomId } = useParams();

    function handleCtnBtn() {
        navigate(`/categories/${roomId}`);
    }
    return (
        <div>
            <p>room: {roomId} &#40;scoreboard&#41;</p>
            <div onClick={handleCtnBtn} >Continue</div>
        </div>
    )
}

export default Scoreboard;