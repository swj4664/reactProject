import './App.css';
import {SearchFetch,Detail} from '../src/components/Search';
import Join from '../src/components/Join';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Routes>
        <Route path="/" element={<SearchFetch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
      </Routes>
  );
}


export default App;