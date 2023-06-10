import React from 'react';
import '../css/Header.css'
import { Link, useNavigate } from 'react-router-dom';

function Header({ userId, myPage }) {
  const navigate = useNavigate();
  async function post() {
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <div>
        <header id='header'>
          <div className='header_menu'>
            <div className='logo'>
              {/* <img src="" alt="" /> */}
              <a href="/">logo</a>
            </div>
            {userId ? (
              <>
                <div className='welcome'><p><b>{userId}</b>님 환영합니다.</p></div>
                <div className='login_menu log_menu'>
                  <div className='out_btn header_btn' onClick={post}>로그아웃</div>
                  <div className='my_btn header_btn' onClick={myPage}>마이페이지</div>
                </div>
              </>
            ) : (
              <div className='logout_menu log_menu'>
                <Link to="/login">로그인</Link>
              </div>)
            }
          </div>
        </header>
      </div>
    </>
  );
}


export default Header;
