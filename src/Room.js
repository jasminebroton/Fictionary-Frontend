import { useParams } from 'react-router-dom';
import './output.css';

import Results from "./Results.js";
import Scoreboard from './Scoreboard';

function Room() {
    const { roomId } = useParams();
    return (
        // <div className="flex flex-col items-center justify-center h-screen bg-custom-bg-color">
        //     <div>
        //         <p className="text-center text-custom-size">Room: {roomId}</p>
        //     </div>
        // </div>
        <div className="">
            <Results modalId="results-modal" nextModalId="scoreboard-modal" display="hidden" />
            <Scoreboard modalId="scoreboard-modal" nextModalId="categories-modal" display="hidden" />

            <button data-modal-target="test-modal" data-modal-toggle="test-modal" type="button" >show</button>
            <div id="test-modal" className="bg-sky-800 hidden" aria-hidden="true">
                hi mom
                <button data-modal-hide="test-modal" type="button">hide</button>
            </div>
            
        </div>
    );
}

export default Room;