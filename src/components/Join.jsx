import { useEffect, useState } from 'react';
import '../css/Join.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Join() {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')
  const navigate = useNavigate();

  async function post() {

    try {
      const result = await axios.post(
        'http://localhost:3001/join',
        {
          id: id,
          pw: pw
        }
      );
      navigate('/login');
      alert('회원가입이 완료되었습니다.')
    } catch (error) {
      console.log(error);
      alert('다시 시도')
    }
  }


  return (
    <>
      {
        JSON.stringify(sessionStorage.loginId) == null ? (
          <div id='join'>
            <div className='join_box'>
              <div className='join_title'>회원가입</div>
              <div className='join_input'>
                <div className='inputTitle_g'>
                  <p>아이디</p>
                  <p>비밀번호</p>
                  <p>비밀번호 확인</p>
                </div>
                <div className='input_g'>
                  <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
                  <p className='id_validate validate'>6~10자리의 영문, 영문+숫자를 입력해주세요.</p>
                  <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); }} />
                  <p className='pw_validate validate'>10~20자리의 영문+숫자+특수문자를 입력해주세요.</p>
                  <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); }} disabled />
                  <p className='pw_validate2 validate'>비밀번호가 일치합니다.</p>
                </div>
              </div>
              <div className='join_btn' onClick={() => { post(); }}><p>회원가입</p></div>
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default Join;