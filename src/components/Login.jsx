import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Login() {
    let [id, setId] = useState('')
    let [pw, setPw] = useState('')
    let [loginId, setloginId] = useState('')
    const dispatch = useDispatch();

    dispatch({ type: 'SET_DATA', payload: loginId });
    
    async function post() {
      try {
        const result = await axios.post(
          'http://localhost:3001/Login',
          {
              id: id,
              pw: pw
          }
        );
        
        
        const data = result.data
        setloginId(data)
        
        
      } catch (error) {
        console.log(error);
      }
    }
  
  
    return (
      <>
        <div>로그인</div>
        <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
        <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); }} />
        <button onClick={() => { post(); }}>로그인</button>
        <a href='http://localhost:3000/join'>회원가입</a>
        {loginId ? loginId+'님 환영합니다.':null}
        
      </>
    )
  }
  
  export default Login;