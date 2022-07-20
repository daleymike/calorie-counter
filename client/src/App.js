import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import RecipeForm from './components/RecipeForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<div>Login and Reg</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/recipes/:user_id" element={<div>Display User Recipes </div>} />
        <Route path="/logs/:user_id" element={<div>Display User Logs </div>}/>
        <Route path="/recipes/saved/:user_id" element={<div>Display User Saved Recipes </div>} />
        <Route path="/recipes/create" element={<RecipeForm/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
