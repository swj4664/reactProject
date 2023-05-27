import './App.css';
import Search from '../src/components/Search';
import KakaoMap from '../src/components/KakaoMap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';

let libraryData = [];

function App() {
  const receiveData = (data) => {
    libraryData = data
  }
  
  let use = useNavigate();
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Link to="/detail"><Search receiveData={receiveData}/></Link>
        }>
        </Route>
        <Route path='/detail' element={<div>
          <Detail libraryData={libraryData}/>
          <KakaoMap/>
        </div>}></Route>
      </Routes>
    </>
  );
}

function Detail(props) {
  console.log(props.libraryData[0].lbrryNm)
  return(
    <>
    도서관내용
    <h4>{props}</h4>
    </>
  )
}



export default App;
