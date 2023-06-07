import { useEffect, useState } from 'react';

function MyPage({ userId }) {
    
    return (
        <div>
            마이페이지<br/>
            {userId ? (
                <>
                    <p>아이디: {JSON.stringify(sessionStorage.loginId)}</p>
                    <button>수정</button>
                </>
            ) : (
                '로그인시 이용가능합니다.'
            )}
        </div>
    )
}

export default MyPage;