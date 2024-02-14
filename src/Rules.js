import { useNavigate } from "react-router-dom";

function Rules() {
    const navigate = useNavigate();


    function handleClick() {
        navigate(`/`);
    }
    
    return (
        <div className="background custom-text">
            <div className="header mb-32">Fictionary</div>
            <div className="w-fit p-2 mx-auto text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
            <div className="w-fit p-2 mx-auto text-center">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div> 
            <div className="w-fit p-2 mx-auto text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
            <div className="w-fit p-2 mx-auto text-center">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>
                <button className="red-button" onClick={handleClick} >Return Home</button>
            </div>
        </div>
    )
}

export default Rules;