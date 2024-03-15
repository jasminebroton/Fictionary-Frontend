import React from 'react';
import { useState, useEffect, useCallback } from "react";


function Artist({viewCurr, setViewCurr, setViewNext, players, setPlayers, isHost, setIsHost, usedIndexes, setUsedIndexes, artist, setArtist}) {
    const [count, setCount] = useState(null);
    const playersCopy = [...players];

    const handleNext = useCallback(() => {
      setViewNext(true);
      setViewCurr(false);
  }, [setViewCurr, setViewNext]);

    const getRandomIndex = (maxIndex) => {
        let ranNum;
        do {
        ranNum = Math.floor(Math.random() * maxIndex) + 1;
        } while (usedIndexes.includes(ranNum));

        setUsedIndexes(usedIndexes => [...usedIndexes, ranNum]);
        return ranNum;
      };

    const artistPicker = () => {
        let randomNum = getRandomIndex(playersCopy.length);
        let newArtist = playersCopy[randomNum-1]; 
        let previousHost = playersCopy.find((player) => player.isHost);
        setArtist(newArtist);
        if (newArtist) {
          newArtist.isHost = true;
          setIsHost(newArtist ? newArtist.isHost : false);
        }
        
        //take away previous host rights
        if (previousHost) {
          previousHost.isHost = false;
          setIsHost(previousHost.isHost);
        }
        //update players array to be accurate
        setPlayers([...playersCopy]);
    };

    useEffect(() => {
        artistPicker();
      }, []);

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
      return() => clearTimeout(countdown);
    }, [count]);

    return(
        <div class="background custom-text flex flex-col space-y-44 text-center py-12 text-6xl ">
           <button id="nextButton" data-testid= "next" onClick={handleNext} style={{ display: 'none' }}>next</button>
          <div>
            <div> NEXT ARTIST IS <br /> <br /> </div>
               <div class="animate-bounce">{artist && artist.name} </div>
            </div>
               {count !== null && (
                <>
                <div>
                  GET READY TO DRAW IN
                  <div>
                  {count}
                  </div>
                </div>
                </>
               )}

        </div>
    );

}

export default Artist;