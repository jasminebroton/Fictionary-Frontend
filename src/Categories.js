import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Categories({setViewCurr, setViewNext, players, setPlayers}) {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [categories, setCategories] = useState([{category: "Animals"}, {category: "Objects"}, {category: "Buildings"}]);
    const [counter, setCounter] = useState(60)
    const [timer, setTimer] = useState("0:00")
    const [playersInt, setPlayersInt] = useState(players.length);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(counter => counter - 1)
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setTimer(() => {
            var minutes = Math.floor(counter / 60);
            var seconds = counter % 60;
            if(seconds > 9){
                return (minutes + ":" + seconds);
            }
            return (minutes + ":0" + seconds);
        });
    });

    //placeholder until votes can be sent to the backend
    if(counter <= 0){
        // navigate(`/drawing/${roomId}`);
        //handleNextBtn();
        setViewCurr(false);
        setViewNext(true);
    }
    const handleClick = () => {
        //decrement player
        setPlayersInt(playersInt-1);
        //add additional var so we can use it in real time
        const updatedPlayersInt = playersInt-1;
        console.log(updatedPlayersInt);
        //disable buttons
        setButtonDisabled(true);
        if (updatedPlayersInt <= 0) {
            console.log("getting stuck 1");
            setViewCurr(false);
            console.log("getting stuck 2");
            setViewNext(true);
            console.log("getting stuck 3 ");
        }
    };
    //function handleNextBtn() {
      //  setViewCurr(false);
        //setViewNext(true);
    //}

    return (
        <div className="background custom-text">
            <div className="grid grid-cols-5 grid-rows-2 justify-center">
                <p className="header col-start-2 col-span-3">Fictionary</p>
                <p className="timer">{timer}</p>
                <p className="text-1xl col-start-2 col-span-3 row-start-2">Room: {roomId}</p>
            </div>
            <form className="bg-[#6f5643] p-4">
                <fieldset className="grid grid-cols-3 grid-rows-2 gap-x-3">
                    <legend className="header text-[#ece6c2] col-span-3">Vote for a Category</legend>
                    <p className="grid col-start-1 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_1">{categories[0].category}</label>
                        <input type="radio" name="category" id="category_1" value={categories[0].category} />
                    </p>
                    <p className="grid col-start-2 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_2">{categories[1].category}</label>
                        <input type="radio" name="category" id="category_2" value={categories[1].category} />
                    </p>
                    <p className="grid col-start-3 row-start-2">
                        <label className="bg-[#73bda8] p-4 mx-auto text-3xl" for="category_3">{categories[2].category}</label>
                        <input type="radio" name="category" id="category_3" value={categories[2].category} />
                    </p>
                </fieldset>
            </form>
            <div className = "flex justify-center brown-button">
                <div>
                    <button type="button" 
                    onClick={handleClick} 
                    disabled={isButtonDisabled}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Categories;