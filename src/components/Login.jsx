import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router';
// import { useDispatch } from 'react-redux';

function Login({ onLoginSuccess }) {
  console.log(onLoginSuccess);
    let [id, setId] = useState('')
    let [pw, setPw] = useState('')
    let [loginId, setloginId] = useState('')
    // const dispatch = useDispatch();

    // dispatch({ type: 'SET_DATA', payload: loginId });
    
    async function post() {
      try {
        const result = await axios.post(
          'http://localhost:3001/login',
          { id: id, pw: pw },
          { withCredentials: true }
        );
        const data = result.data[0].id;
        setloginId(data);
        onLoginSuccess(data); // 로그인 성공 시 처리하는 함수 호출
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <>
        <div>로그인</div>
        <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
        <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); }} />
        <button onClick={post}>로그인</button>
        <a href='http://localhost:3000/join'>회원가입</a>
        {loginId && <div>{loginId}님 환영합니다.</div>}
        
      </>
    )
}
  
  export default Login;
