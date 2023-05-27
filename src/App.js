import './App.css';
import {SearchFetch,Detail} from '../src/components/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Routes>
        <Route path="/" element={<SearchFetch />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
  );
}


export default App;