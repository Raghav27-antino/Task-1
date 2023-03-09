import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
