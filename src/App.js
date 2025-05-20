import logo from './logo.svg';
import './App.css';
import TopHeader from "./Common/TopHeader/TopHeader";
import Decode from './Pages/Decode/decode.jsx';
import Main from "./Pages/Main/Main";
import Result from "./Pages/Result/Result";
import DecodeReady from './Pages/Decode/DecodeReady.jsx';
import DecodeDo from './Pages/Decode/DecodeDo.jsx';
import Search from "./Pages/Search/Search.jsx";

import {ROUTES} from "./Common/Routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <TopHeader/>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main/>}/>
        <Route path={ROUTES.DECODE} element={<Decode/>}/>
        <Route path={ROUTES.DECODE_READY} element={<DecodeReady/>}/>
        <Route path={ROUTES.DECODE_DO} element={<DecodeDo/>}/>
        <Route path={ROUTES.RESULT} element={<Result/>}/>
        <Route path={ROUTES.SEARCH} element={<Search/>}/>
      </Routes>
    </Router>
  );
}

export default App;
