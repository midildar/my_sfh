import Home from "./Pages/Home";
import {Routes,Route} from "react-router-dom"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
