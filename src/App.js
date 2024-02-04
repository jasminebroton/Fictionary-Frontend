import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import Voting from "./Voting"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/voting" element= {<Voting />} />
          {/* ellen: setup route by adding path (url) and element (react component) */}
          {/* example: <Route path="my/URL" element={<MyComponent />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

