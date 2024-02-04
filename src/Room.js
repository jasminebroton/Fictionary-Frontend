import { useParams } from 'react-router-dom';
import './output.css';

function Room() {
    const { roomId } = useParams();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-custom-bg-color">
            <div>
                <p className="text-center text-custom-size">Room: {roomId}</p>
            </div>
        </div>
    );
}

export default Room;