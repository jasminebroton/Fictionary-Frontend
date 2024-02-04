import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Categories() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [categories, setCategories] = useState([{category: "Animals"}, {category: "Objects"}, {category: "Buildings"}]);
    const [counter, setCounter] = useState(60)
    const [timer, setTimer] = useState("0:00")

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
        navigate(`/drawing/${roomId}`);
    }

    return (
        <div className="bg-[#ece6c2] text-[#6f5643] font-serif h-screen pt-10">
            <div className="grid grid-cols-5 grid-rows-2 justify-center">
                <p className="col-start-2 col-span-3 text-4xl">Fictionary</p>
                <p className="bg-[#cc6b49] text-[#ece6c2] text-3xl px-5 py-2 justify-self-center">{timer}</p>
                <p className="text-1xl col-start-2 col-span-3 row-start-2">Room: {roomId}</p>
            </div>
            <form>
                <fieldset className="grid grid-cols-3 grid-rows-2 gap-x-3">
                    <legend className="bg-[#6f5643] text-[#ece6c2] col-span-3 text-6xl p-4 mx-auto mt-10">Vote for a Category</legend>
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
        </div>
    );
}

export default Categories;