import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import LoginAndRegisterPage from './components/LoginAndRegisterPage';
import RecipeForm from './components/RecipeForm';
import LogForm from './components/LogForm';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<LoginAndRegisterPage />} />
          <Route path="/dashboard" element={ <Dashboard />}/>
          <Route path="/recipes/:user_id" element={<div>Display User Recipes </div>} />
          <Route path="/logs/:user_id" element={<div>Display User Logs </div>}/>
          <Route path="/recipes/saved/:user_id" element={<div>Display User Saved Recipes </div>} />
          <Route path="/recipes/create" element={<RecipeForm/>} />
          <Route path="/logs/create" element={<LogForm/>} />

          {/* Routes I added */}
          <Route path="/recipe/edit/:recipe._id" element={<div>Display Edit Recipe</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
