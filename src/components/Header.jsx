import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ userId, onLogout }) {
    return (
      <div>
        {userId ? (
            <>
                <p>{userId}님 환영합니다.</p>
                <button onClick={onLogout}>로그아웃</button>
            </>
        ) : (
          <Link to="/login">헤더로그인</Link>
        )}
      </div>
    );
  }
  

export default Header;