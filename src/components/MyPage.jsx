import { useEffect, useState } from 'react';
import '../css/MyPage.css'
import axios from 'axios';

function MyPage({ userId, userPw }) {

    let [pwCh, setPwCh] = useState('')
    let [pwCh2, setPwCh2] = useState('')
    let [idCh, setidCh] = useState('')
    let mypageId = JSON.stringify(sessionStorage.loginId)


    // pw 유효성체크
    const isValidPw = (i) => {
        const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;
        return re.test(i);
    }

    function pwChk(pw) {
        let pwChk_msg = document.querySelector('.pw_validate')
        if (!isValidPw(pw)) {
            pwChk_msg.textContent = '10~20자리의 영문+숫자+특수문자를 입력해주세요.'
            pwChk_msg.style.color = '#afafaf'
        } else {
            pwChk_msg.textContent = '비밀번호를 올바르게 입력했습니다.'
            pwChk_msg.style.color = '#6ed4ad'
        }
    }

    let pwChk_msg2 = document.querySelector('.pw_validate2')
    if (pwCh == pwCh2 && pwCh !== '') {
        pwChk_msg2.textContent = '비밀번호가 일치합니다.'
        pwChk_msg2.style.color = '#6ed4ad'
    } else {
        pwChk_msg2.textContent = '일치하는 비밀번호를 입력해주세요.'
        pwChk_msg2.style.color = '#afafaf'
    }


    async function pwChange() {
        if (pwCh == pwCh2) {
            idCh = JSON.stringify(sessionStorage.loginId)
            try {
                const result = await axios.post(
                    'http://localhost:3001/mypage',
                    { pwCh: pwCh, idCh: idCh }
                );
                console.log(result)
                alert('수정이 완료되었습니다.')
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }
    return (
        <div>
            {userId ? (
                <>
                    <div id='myPage'>
                        <div className='myPage_box'>
                            <div className='myPage_title'>마이페이지</div>
                            <div className='myPage_input'>
                                <div className='inputTitle_g'>
                                    <p>아이디</p>
                                    <p>비밀번호</p>
                                    <p>비밀번호 수정</p>
                                    <p>비밀번호 확인</p>
                                </div>
                                <div className='input_g'>
                                    <div>{JSON.parse(mypageId)}</div>
                                    <input type='password' value={JSON.stringify(sessionStorage.loginPw)} disabled></input>
                                    <p className='validate'></p>
                                    <input type='password' onChange={(e) => { setPwCh(e.target.value); pwChk(e.target.value); }}></input>
                                    <p className='pw_validate validate'>10~20자리의 영문+숫자+특수문자를 입력해주세요.</p>
                                    <input type='password' onChange={(e) => setPwCh2(e.target.value)}></input>
                                    <p className='pw_validate2 validate'>비밀번호가 일치합니다.</p>
                                </div>
                            </div>
                            <div className='modify_btn' onClick={pwChange}><p>수정</p></div>
                        </div>
                    </div>
                </>
            ) : (
                '로그인시 이용가능합니다.'
            )}
        </div>
    )
}

export default MyPage;