import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/home/home';
import LandingPage from './components/landing-page/landing-page';
import VideogameDetails from './components/details-videogame/details-videogame'
import AddVideogame from './components/add-videogame/add-videogame';
import axios from 'axios';

axios.defaults.baseURL = "https://pi-videogames-production-26de.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/addVideogame' element={<AddVideogame/>}/> 
        <Route path='/videogames/:id' element={<VideogameDetails/>}/> 
      </Routes>
    </div>
  );
}

export default App;
