import { useEffect, useState } from 'react';
import axios from 'axios';
function Join(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");



function Join() {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')

  async function post() {
    try {
      const result = await axios.post(
        'http://localhost:3001/join',
        {
            id: id,
            pw: pw
        }


  return (
    <>
      <div>회원가입</div>
      <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
      <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); }} />
      <button onClick={() => { post(); }}>회원가입</button>
    </>
  )
}
export default Join
