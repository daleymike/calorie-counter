import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<div>Login and Reg</div>} />
        <Route path="/dashboard" element={<NavBar/>} />
        <Route path="/recipes/:user_id" element={<div>Display User Recipes NAV</div>} />
        <Route path="/logs/:user_id" element={<div>Display User Logs NAV</div>}/>
        <Route path="/recipes/saved/:user_id" element={<div>Display User Saved Recipes NAV</div>} />
        <Route path="/recipes/create" element={<div>Recipe Form NAV</div>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
