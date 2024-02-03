// Barb: this is just a place holder made from Ellen's Categories.js placeholder, delete when necessary
import { useParams } from "react-router-dom";
import './output.css';

function Lobby() {
    const {roomId} = useParams();
    const {guestName} = useParams();
    return (
        <div>
            Lobby Placeholder &#40;Room: {roomId} | Name: {guestName}&#41;
        </div>
    );
}

export default Lobby;