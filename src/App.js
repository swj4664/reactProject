import './App.css';
import { useState } from 'react';
import { SearchFetch, Detail } from '../src/components/Search';
import Join from '../src/components/Join';
import Login from '../src/components/Login';
import Header from '../src/components/Header';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';


function App() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // 로그인 성공 시 처리하는 함수 userId 상태를 업데이트 후 경로('/')로 리다이렉트
  const handleLoginSuccess = (id) => {
    setUserId(id);
    navigate('/'); // 로그인 성공 후 홈 경로('/')로 리다이렉트
  };
  const handleLogout = () => {
    setUserId(null);
    navigate('/login');
  };

  return (
    <>
      <Header userId={userId} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<SearchFetch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login"  element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </>
  );
}


export default App;