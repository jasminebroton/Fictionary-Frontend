import { useNavigate } from "react-router-dom";

function Rules() {
    const navigate = useNavigate();


    function handleClick() {
        navigate(`/`);
    }
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10 mb-32">Fictionary</div>
            <div className="w-fit p-2 mx-auto text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
            <div className="w-fit p-2 mx-auto text-center">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div> 
            <div className="w-fit p-2 mx-auto text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
            <div className="w-fit p-2 mx-auto text-center">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>
                <button className="bg-[#cc6b49] hover:bg-[#6b3927] text-[#ece6c2] w-fit p-2 mx-auto" onClick={handleClick} >Return Home</button>
            </div>
        </div>
    )
}

export default Rules;