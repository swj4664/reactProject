import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ userId, onLogout, myPage }) {
    const navigate = useNavigate();
    async function post() {
        sessionStorage.clear();
        navigate('/login');
    }
    // async function myPageGo() {
    //     navigate('/mypage');
    // }
    return (
      <div>
        {userId ? (
            <>
                <p>{userId}님 환영합니다.</p>
                <button onClick={post}>로그아웃</button>
                <button onClick={myPage}>마이페이지</button>
            </>
        ) : (
          <Link to="/login">헤더로그인</Link>
        )}
      </div>
    );
  }
  

export default Header;
