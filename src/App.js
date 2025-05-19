import logo from './logo.svg';
import './App.css';
import TopHeader from "./Common/TopHeader/TopHeader";
import Main from './Pages/Main/Main.jsx';
import Decode from './Pages/Decode/decode.jsx';
import {ROUTES} from "./Common/Routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <TopHeader/>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main/>}/>
        <Route path={ROUTES.DECODE} element={<Decode/>}/>
      </Routes>
    </Router>
  );
}

export default App;
