import { useEffect, useState } from 'react';
import '../css/KakaoMap.css'
const { kakao } = window;

function Kakao(props) {
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(props.latitude, props.longitude), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };


        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(
            props.latitude,
            props.longitude
        );

        // 마커를 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);

        let iwContent = `<div class="info-title">${props.name} <br></div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
            content: iwContent
        });

        infowindow.open(map, marker);

        document.querySelector('.info-title').parentElement.style.border='0px'
        document.querySelector('.info-title').style.background='black'

    }, [])

    return (
        <div id="map" style={{ width: 800 + 'px', height: 400 + 'px' }}></div>
    )
}

export default Kakao;