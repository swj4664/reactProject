import { useEffect, useState } from 'react';
import '../css/MyPage.css'
import axios from 'axios';

function MyPage({ userId, userPw }) {

    let [pwCh, setPwCh] = useState('')
    let [pwCh2, setPwCh2] = useState('')
    let [idCh, setidCh] = useState('')

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
                                    <div>{JSON.parse(sessionStorage.loginId)}</div>
                                    <input type='password' value={JSON.stringify(sessionStorage.loginPw)} disabled></input>
                                    <p className='validate'></p>
                                    <input type='password' onChange={(e) => setPwCh(e.target.value)}></input>
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