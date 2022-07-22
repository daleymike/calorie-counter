import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';

import NavBar from './components/NavBar';
import LoginAndRegisterPage from './components/LoginAndRegisterPage';
import RecipeForm from './components/RecipeForm';
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<PublicRoutes redirectTo="/user/dashboard" />}>
          <Route exact path="/" element={<LoginAndRegisterPage />} />
        </Route>
        <Route path='/user' element={<PrivateRoutes redirectTo='/' />} >
          <Route path="/user/dashboard" element={<div>Dashboard</div>} />
          <Route path="/user/recipes/:user_id" element={<div>Display User Recipes </div>} />
          <Route path="/user/logs/:user_id" element={<div>Display User Logs </div>}/>
          <Route path="/user/recipes/saved/:user_id" element={<div>Display User Saved Recipes </div>} />
          <Route path="/user/recipes/create" element={<RecipeForm/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
