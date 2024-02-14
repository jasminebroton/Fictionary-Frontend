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
    <div>
      <h1 className="large-text">Timer</h1>
      <p className="timer">{formatTime(seconds)}</p>
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
        <div>
          {row.map((element, columnIndex) => (
            <button className="yellow-button m-2">
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
      className="canvas"
      ></canvas>
    </div>
  );
};

const SubmitButton = ({ onClick }) => {
 return (
  <div>
    <button onClick={onClick}>
      Submit
    </button>
  </div>
 );
};


function Voting() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [data, setData] = useState(["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]);
   
   function handeClick() {
     navigate(`/results/${roomId}`);
   };
   
  return (
    <div className="background custom-text">
      <div className= "flex justify-end">
        <Timer />
      </div>
    
      <div className="w-full mx-auto flex flex-row items-center">
          <div className="basis-1/2">
            <Canvas />
          </div>
          <div className='basis-1/2'>
            <p className='header'>CATEGORY IS</p> <br />
            <p className='sub-header'>CATEGORY</p>
            <Grid data = {data} />
        </div>
      </div>
      <div className="flex justify-center brown-button">
        <SubmitButton onClick={handeClick}/>
      </div>
    </div>

  );
}

export default Voting;