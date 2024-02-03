import { useNavigate } from "react-router-dom";

function Join() {
    const navigate = useNavigate();


    function handleClick() {
        navigate(`/`);
    }
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32">Fictionary</div>
            {/* "button" is a div with onClick property bc having to prevent default on a button html element is annoying */}
            <div className="bg-[#cc6b49] text-[#ece6c2] w-fit p-2 mx-auto" onClick={handleClick} >Return Home</div>
        </div>
    )
}

export default Join;