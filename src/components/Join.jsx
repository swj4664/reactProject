import { useEffect, useState } from 'react';
import '../css/Join.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Join() {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')
  let [pw2, setPw2] = useState('')
  const navigate = useNavigate();

  // id 유효성체크
  const isValidId = () => {
    const re = /^[a-zA-Z0-9]{6,10}$/;
    return re.test(id);
  }
  // pw 유효성체크
  const isValidPw = () => {
    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;
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

      if (pw !== pw2) {
        alert('일치하는 비밀번호를 입력해주세요.');
        return;
      }

      const result = await axios.post(
        'http://localhost:3001/join',
        {
          id: id,
          pw: pw
        }
      );
      if(result.data.idDuplicate == false){
        alert('아이디가 중복되었습니다.')
      } else {
        navigate('/login');
        alert('회원가입이 완료되었습니다.')
      }
     
      
    } catch (error) {
      console.log(error);
      alert('다시 시도')
    }
  }

  // id 유효성체크
  const isValidId2 = (i) => {
    const re = /^[a-zA-Z0-9]{6,10}$/;
    return re.test(i);
  }
  // pw 유효성체크
  const isValidPw2 = (i) => {
    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;
    return re.test(i);
  }

  function idChk(id){
    let idChk_msg = document.querySelector('.id_validate')
    if(!isValidId2(id)){
      idChk_msg.textContent='6~10자리의 영문, 영문+숫자를 입력해주세요.'
      idChk_msg.style.color='#afafaf'
    } else {
      idChk_msg.textContent='아이디를 올바르게 입력했습니다.'
      idChk_msg.style.color='#6ed4ad'
    }
  }

  function pwChk(pw){
    let pwChk_msg = document.querySelector('.pw_validate')
    if(!isValidPw2(pw)){
      pwChk_msg.textContent='10~20자리의 영문+숫자+특수문자를 입력해주세요.'
      pwChk_msg.style.color='#afafaf'
    } else {
      pwChk_msg.textContent='비밀번호를 올바르게 입력했습니다.'
      pwChk_msg.style.color='#6ed4ad'
    }
  }

    let pwChk_msg = document.querySelector('.pw_validate2')
    if(pw==pw2){
      pwChk_msg.textContent='비밀번호가 일치합니다.'
      pwChk_msg.style.color='#6ed4ad'
    } else {
      pwChk_msg.textContent='일치하는 비밀번호를 입력해주세요.'
      pwChk_msg.style.color='#afafaf'
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
                  <input type="text" value={id} maxLength={10} onChange={(e) => { setId(e.target.value); idChk(e.target.value);}} />
                  <p className='id_validate validate'>6~10자리의 영문, 영문+숫자를 입력해주세요.</p>
                  <input type="password" value={pw} maxLength={20} onChange={(e) => { setPw(e.target.value); pwChk(e.target.value);}} />
                  <p className='pw_validate validate'>10~20자리의 영문+숫자+특수문자를 입력해주세요.</p>
                  <input type="password" value={pw2} maxLength={20} onChange={(e) => { setPw2(e.target.value);}} />
                  <p className='pw_validate2 validate'>일치하는 비밀번호를 입력해주세요.</p>
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