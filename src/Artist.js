import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from './context/SocketContext';

function Artist({ viewCurr, setViewCurr, setViewNext }) {
    const { roomId } = useParams();
    const [count, setCount] = useState(null);
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState(null);
    const { socket } = useSocket();

    const handleNext = useCallback(() => {
        setViewNext(true);
        setViewCurr(false);
    }, [setViewCurr, setViewNext]);

    useEffect(() => {
        if (socket) {
            socket.emit('requestUserList', roomId);
            console.log('Requesting user list for room:', roomId);

            const updateUserList = (users) => {
                console.log('Received user list:', users);
                const host = users.find(user => user.isHost);
                if (host) {
                    console.log('Setting artist as:', host.name);
                    setArtist(host.name);
                } else {
                    console.log('No host found in the user list');
                    setError('No host found in the user list');
                }
            };

            const handleError = (error) => {
                console.error('Error:', error);
                setError(error);
            };

            socket.on('updateUserList', updateUserList);
            socket.on('error', handleError);

            return () => {
                console.log('Cleaning up');
                socket.off('updateUserList', updateUserList);
                socket.off('error', handleError);
            };
        }
    }, [socket, roomId]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setCount(3);
        }, 2000);
        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        if (count === null) return;
        const countdown = setTimeout(() => {
            if (count > 1) {
                setCount(count - 1);
            } else {
                handleNext();
            }
        }, 1000);
        return () => clearTimeout(countdown);
    }, [count, handleNext]);

    return (
        <div className="background custom-text flex flex-col space-y-44 text-center py-12 text-6xl">
            <button id="nextButton" data-testid="next" onClick={handleNext} style={{ display: 'none' }}>
                next
            </button>
            <div>
                <div>
                    THE ARTIST IS <br /> <br />
                </div>
                <div className="animate-bounce">
                    {artist ? (
                        artist
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
            {count !== null && (
                <div>
                    GET READY TO DRAW IN
                    <div>{count}</div>
                </div>
            )}
        </div>
    );
}

export default Artist;