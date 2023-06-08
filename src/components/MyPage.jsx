import { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage({ userId, userPw }) {

    let [pwCh, setPwCh] = useState('')
    let [pwCh2, setPwCh2] = useState('')
    let [idCh, setidCh] = useState('')

    async function pwChange() {
        if (pwCh == pwCh2) {
            idCh = JSON.parse(sessionStorage.loginId)
            try {
                const result = await axios.post(
                    'http://localhost:3001/mypage',
                    { pwCh: pwCh, idCh: idCh }
                );
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }
    return (
        <div>
            마이페이지<br />
            {userId ? (
                <>
                        <p>아이디: {JSON.stringify(sessionStorage.loginId)}</p>
                        <p>비밀번호: </p><input type='password' value={JSON.stringify(sessionStorage.loginPw)} disabled></input>
                        <p>비밀번호 수정: </p><input type='password' onChange={(e) => setPwCh(e.target.value)}></input>
                        <p>비밀번호 확인: </p><input type='password' onChange={(e) => setPwCh2(e.target.value)}></input>
                        <button onClick={pwChange}>수정</button>
                </>
            ) : (
                '로그인시 이용가능합니다.'
            )}
        </div>
    )
}

export default MyPage;