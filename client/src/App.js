import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';

import NavBar from './components/NavBar';
import LoginAndRegisterPage from './components/LoginAndRegisterPage';
import RecipeForm from './components/RecipeForm';
import LogForm from './components/LogForm';
import Dashboard from './components/Dashboard'
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import MyLogs from './components/MyLogs';
import LogDetails from './components/LogDetails';


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
          <Route path="/user/dashboard" element={ <Dashboard />}/>
          <Route path="/user/recipes/:user_id" element={<div>Display User Recipes </div>} />
          <Route path="/user/recipes/edit/:recipeId" element={<RecipeForm />} />
          <Route path="/user/logs" element={<MyLogs/>}/>
          <Route path="/user/logs/:logId" element={<LogDetails />}/>
          <Route path="/user/recipes/saved/:user_id" element={<div>Display User Saved Recipes </div>} />
          <Route path="/user/recipes/create" element={<RecipeForm/>} />
          <Route path="/user/logs/create" element={<LogForm/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
