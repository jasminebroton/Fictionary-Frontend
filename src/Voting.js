import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="text-6xl">
      <h1>Timer</h1>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

const Grid = ({ data }) => {
  // Split the data array into rows
  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(data.slice(i, i + 3));
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="p-5 text-2xl">
          {row.map((element, columnIndex) => (
            <button className="bg-button-color hover:bg-button-darker text-text py-2 px-4  m-12 text-6xl w-64 shadow-2xl">
              {element !== null ? element : 'Empty'}
            </button>
          ))}
        </div>
      ))}
    </div> 
  );
};

const Canvas = () => {
  return (
    <div>
      <canvas
      width={1000}
      height={1000}
      className="bg-white shadow-2xl border-8 border-gray-400 m-10"
      ></canvas>
    </div>
  );
};

// const SubmitButton = ({ onClick }) => {
//  return (
//   <div>
//     <button onClick={onClick} className="bg-button-color hover:bg-button-darker text-text font-bold py-2 px-4 m-12 text-6xl w-64 shadow-2xl">
//       Submit
//     </button>
//   </div>
//  );
// };


function Voting({modalId, nextModalId}) {
    // const navigate = useNavigate();
    const { roomId } = useParams();
    const [data, setData] = useState(["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]);
     
    //  function handeClick() {
    //    navigate(`/results/${roomId}`);
    //  };
    
    const SubmitButton = () => {
      return (
       <div>
         <button data-modal-target={nextModalId} data-modal-show={nextModalId} data-modal-hide={modalId} className="bg-button-color hover:bg-button-darker text-text font-bold py-2 px-4 m-12 text-6xl w-64 shadow-2xl">
           Submit
         </button>
       </div>
      );
     };

    return (
      <div className="bg-background-color min-h-screen text-text">
        <div className= "flex justify-end p-12">
          <Timer />
        </div>
      
        <div className="w-full mx-auto flex flex-row items-center">
            <div className="mx-36 mt-16 basis-1/2">
              <Canvas />
            </div>
            <div className='basis-1/2 mt-56'>
              <p className='text-6xl'>CATEGORY IS</p> <br />
              <p className='text-3xl'>CATEGORY</p>
              <Grid data = {data} />
          </div>
        </div>
        <div className="flex justify-center">
          {/* <SubmitButton onClick={handeClick}/> */}
          <SubmitButton />
        </div>
      </div>

    );
}

export default Voting;