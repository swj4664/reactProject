import { useEffect, useState } from 'react';
import axios from 'axios';
function Join(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleJoin = async () => {
          try {
            const result = await axios.post(
              'http://localhost:3001/join',
              {
                  id : id,
                  password: password
              });
              console.log(result.data);
              if(result.data =='S'){
                alert("회원가입되었습니다.");
              }else{
                alert("회원가입을 실패했습니다.");
              }
          } catch (error) {
            console.log(error);
          }
        }


    return (
        <>
        안녕하세요
        <input className='input_box' placeholder='아이디를 입력해주세요' value={id} onChange={(e) => { setId(e.target.value);}} />
        <input className='input_box' placeholder='패스워드를 입력해주세요' value={password} onChange={(e) => { setPassword(e.target.value);}} />
        <button onClick={handleJoin}>회원가입</button>
        </>

    )
}
export default Join
