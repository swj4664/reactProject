import { useEffect, useState } from 'react';
import axios from 'axios';



function Join() {
  let [id, setId] = useState('')

  async function post() {
    try {
      const result = await axios.post(
        'http://localhost:3001/join',
        {
            id: id,
        }
      );
      // if (!completed) {
      // console.log(result.data)
      // console.log(id)
      // } else {
      // }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div>회원가입</div>
      <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
      <button onClick={() => { post(); }}>회원가입</button>
    </>
  )
}

export default Join;