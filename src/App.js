import logo from './logo.svg';
import './App.css';
import TopHeader from "./Common/TopHeader/TopHeader";
import Main from "./Pages/Main/Main";
import {ROUTES} from "./Common/Routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <TopHeader/>
        <Routes>
            <Route path={ROUTES.MAIN} element={<Main/>}/>
        </Routes>
      </Router>
  );
}

export default App;
