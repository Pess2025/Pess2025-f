import './App.css';
import TopHeader from "./Common/TopHeader/TopHeader";
import Decode from './Pages/Decode/decode.jsx';
import Main from "./Pages/Main/Main";
import Result from "./Pages/Result/Result";
import DecodeReady from './Pages/DecodeReady/DecodeReady.jsx';
import DecodeDo from './Pages/DecodeDo/DecodeDo.jsx';
import Search from "./Pages/Search/Search.jsx";
import Encode from './Pages/Encode/Encode.jsx';
import EncodeMakePrivate from './Pages/MakePrivate/EncodeMakePrivate.jsx';
import EncodeMakePublic from './Pages/MakePublic/EncodeMakePublic.jsx';
import EncodeDo from './Pages/EncodeDo/EncodeDo.jsx';
import EncodeReady from './Pages/EncodeReady/EncodeReady.jsx';
import EncodeDownload from './Pages/EncodeDownload/EncodeDownload.jsx';

import {ROUTES} from "./Common/Routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <TopHeader/>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main/>}/>
        <Route path={ROUTES.ENCODE} element={<Encode/>}/>
        <Route path={ROUTES.ENCODE_MAKE_PRIVATE} element={<EncodeMakePrivate/>}/>
        <Route path={ROUTES.ENCODE_MAKE_PUBLIC} element={<EncodeMakePublic/>}/>
        <Route path={ROUTES.ENCODE_READY} element={<EncodeReady/>}/>
        <Route path={ROUTES.ENCODE_DO} element={<EncodeDo/>}/>
        <Route path={ROUTES.ENCODE_DOWNLOAD} element={<EncodeDownload/>}/>
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
