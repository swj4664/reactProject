import { useEffect, useState } from 'react';
import axios from 'axios';
function Login(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
          try {
            const result = await axios.post(
              'http://localhost:3001/login',
              {
                  id : id,
                  password: password
              });
              console.log(result.data);
              if(result.data =='S'){
                alert("로그인되었습니다.");
              }else{
                alert("존재하지않는 아이디입니다.");
              }
          } catch (error) {
            console.log(error);
          }
        }
    return(
        <>
        <input className='input_box' placeholder='아이디를 입력해주세요' value={id} onChange={(e) => { setId(e.target.value);}} />
        <input className='input_box' placeholder='패스워드를 입력해주세요' value={password} onChange={(e) => { setPassword(e.target.value);}} />
        <button onClick={handleLogin}>로그인</button>
        </>
    )
}

export default Login;