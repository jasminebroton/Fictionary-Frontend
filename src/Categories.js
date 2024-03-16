import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

function Categories({viewCurr, setViewCurr, setViewNext, isHost, setIsHost,round, setRound}) {
    const { roomId } = useParams();
    //const [categories, setCategories] = useState([{category: "Animals"}, {category: "Objects"}, {category: "Buildings"}]);
    const [categories, setCategories] = useState(["1", "2", "3"]);
    const [counter, setCounter] = useState(60);
    /* FOR TESTING COMMENT OUT ABOVE LINE, UNCOMMENT BELOW LINE */
    // const [counter, setCounter] = useState(10);
    const [timer, setTimer] = useState("0:00");

    const handleNextBtn = useCallback (() => {
        setViewNext(true);
        setViewCurr(false);
        setCounter(60);
        /* FOR TESTING COMMENT OUT ABOVE LINE, UNCOMMENT BELOW LINE */
        // setCounter(10);
    }, [setViewCurr, setViewNext, setCounter]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (viewCurr) {
                setCounter(counter => counter - 1)
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [viewCurr, setCounter]);

    useEffect(() => {
        setTimer(() => {
            var minutes = Math.floor(counter / 60);
            var seconds = counter % 60;
            if(seconds > 9){
                return (minutes + ":" + seconds);
            }
            return (minutes + ":0" + seconds);
        });
    }, [counter, setTimer]);

    //placeholder until votes can be sent to the backend
    useEffect(() => {
        if (counter <= 0) {
            handleNextBtn();
        }
    }, [counter, viewCurr, handleNextBtn]);

    //Category retrieval 
    useEffect(() => {
        setRound(round+1);
        //converts roomID to a number, add round
        function seedGeneration() {
            
            let num = "";
            for (let i = 0; i < roomId.length; i++) {
              num += roomId.charCodeAt(i);
            }
            let number = parseInt(num);
            return number+round;
        }
        let seed = seedGeneration();
        //request function IF HOST
        //if(isHost){
            console.log("THIS IS BEING CALLED");
            async function fetchCategories() {
                //swap Url on deployment (back end url)
                const response = await fetch(`http://localhost:8000/categories?seed=${seed}`);
                const categories = await response.json();
    
                setCategories(categories);
                console.log(categories);
            }
            fetchCategories().catch(console.dir);
        //}

    },[isHost,roomId]);

    return (
        <div className="background custom-text">
            <button type="button" onClick={handleNextBtn} className="" >&#40;this should not be visible&#41;</button>
            <div className="grid grid-cols-5 grid-rows-2 justify-center">
                <p className="header col-start-2 col-span-3">Fictionary</p>
                <p className="timer">{timer}</p>
                <p className="text-1xl col-start-2 col-span-3 row-start-2">Room: {roomId}</p>
            </div>
            <form className="bg-[#6f5643] p-4">
                <fieldset className="grid grid-cols-3 grid-rows-2 gap-x-3">
                    <legend className="header text-[#ece6c2] col-span-3">Vote for a Category</legend>
                    <p className="grid col-start-1 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_1">{categories[0]}</label>
                        <input type="radio" name="category" id="category_1" value={categories[0]} />
                    </p>
                    <p className="grid col-start-2 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_2">{categories[1]}</label>
                        <input type="radio" name="category" id="category_2" value={categories[1]} />
                    </p>
                    <p className="grid col-start-3 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_3">{categories[2]}</label>
                        <input type="radio" name="category" id="category_3" value={categories[2]} />
                    </p>
                </fieldset>
            </form>
        </div>
    );
}

export default Categories;