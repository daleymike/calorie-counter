import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import Detail from './components/Detail';
import NavBar from './components/NavBar';
import LoginAndRegisterPage from './components/LoginAndRegisterPage';
import RecipeForm from './components/RecipeForm';
import LogForm from './components/LogForm';
import Dashboard from './components/Dashboard'
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import MyLogs from './components/MyLogs';


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
          <Route path="/user/recipes/edit/:recipeId" element={<RecipeForm />} />
          <Route path="/user/logs" element={<MyLogs/>}/>
          <Route path="/user/recipes/create" element={<RecipeForm/>} />
          <Route path="/user/logs/create" element={<LogForm/>} />
          <Route path="/user/logs/edit/:logId" element={<LogForm/>} />
          <Route path="/user/recipes/detail/:recipeId" element={<Detail/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
