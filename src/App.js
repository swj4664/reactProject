import './App.css';
import { useState } from 'react';
import { SearchFetch, Detail } from '../src/components/Search';
import Join from '../src/components/Join';
import MyPage from '../src/components/MyPage';
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

  const myPage = () => {
    navigate('/mypage');
  };

  return (
    <>
      <Header userId={JSON.stringify(sessionStorage.loginId)} onLogout={handleLogout} myPage={myPage}/>
      <Routes>
        <Route path="/" element={<SearchFetch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login"  element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/mypage"  element={<MyPage userId={JSON.stringify(sessionStorage.loginId)} userPw={JSON.stringify(sessionStorage.loginPw)} />} />
      </Routes>
    </>
  );
}

export default App;