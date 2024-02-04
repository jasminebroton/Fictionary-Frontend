import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import Results from './Results';
import Scoreboard from './Scoreboard';
import Categories from './Categories';
import Drawing from './Drawing';
import Voting from'./Voting';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/results/:roomId" element={<Results />} />
          <Route path="/scoreboard/:roomId" element={<Scoreboard />} />
          <Route path="/categories/:roomId" element={<Categories />} />
          <Route path="/drawing/:roomId" element={<Drawing />} />

          {/* placeholder for the voting path, feel free to remove/edit/etc. */}
          <Route path="/voting/:roomId" element={<Voting />} />

          {/* ellen: setup route by adding path (url) and element (react component) */}
          {/* example: <Route path="/my/URL" element={<MyComponent />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;