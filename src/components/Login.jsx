import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Login.css'

function Login({ onLoginSuccess }) {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')
  let [loginId, setloginId] = useState('')
  let [currentId, setCurrentId] = useState('')

  // id 유효성체크
  const isValidId = () => {
    const re = /^[a-zA-Z0-9]{6,10}$/;
    return re.test(id);
  }
    // pw 유효성체크
  const isValidPw = () => {
    const re = /^[a-zA-Z0-9!@#$%^&*()_+{}:"<>?,.\/;'[]|`~]{10,20}$/;
    return re.test(pw);
  }
  async function post() {
    try {
      if (!isValidId()) {
        alert('아이디는 6~10자리의 영문, 영문+숫자를 입력해주세요.');
        return;
      }
  
      if (!isValidPw()) {
        alert('비밀번호는 10~20자리의 영문+숫자+특수문자를 입력해주세요.');
        return;
      }

      const result = await axios.post(
        'http://localhost:3001/login',
        { id: id, pw: pw },
        { withCredentials: true }
      );
      console.log("송원선"+result.data[0]);
      let sessionStorage = window.sessionStorage;
      const data = result.data[0].id;
      const hashPw = result.data[0].password;

      setloginId(data);
      sessionStorage.setItem("loginId", id);
      sessionStorage.setItem("loginPw", hashPw);

      onLoginSuccess(data); // 로그인 성공 시 처리하는 함수 호출
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {JSON.stringify(sessionStorage.loginId) == null ? (
        <>
          <div id='login'>
            <div className='login_box'>
              <div className='login_logo'>
                <img src="http://localhost:3000/img/title.png" alt="" />
              </div>
              <div className='login_input'>
                <input type="text" value={id} placeholder='아이디' onChange={(e) => { setId(e.target.value); }}  onKeyDown={(e)=> e.key == 'Enter' ? post() : null} />
                <p className='id_validate validate'>6~10자리의 영문, 영문+숫자를 입력해주세요.</p>
                <input type="password" value={pw} placeholder='비밀번호' onChange={(e) => { setPw(e.target.value); }}  onKeyDown={(e)=> e.key == 'Enter' ? post() : null} />
                <p className='pw_validate validate'>10~20자리의 영문+숫자+특수문자를 입력해주세요.</p>
              </div>
              <div className='login_btn' onClick={post}><p>로그인</p></div>
              <div className='join_btn'><a href='http://localhost:3000/join'>회원가입</a></div>
            </div>
          </div>
        </>
      ) : null
      }
    </div>

  )
}

export default Login;
