import { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import { Link, useParams, useLocation } from 'react-router-dom'

function SearchFetch() {
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState("");

  // 페이징관련 변수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지 리스트 수
  const startItem = (currentPage - 1) * itemsPerPage; // 보여주기 시작할 리스트
  const endItem = startItem + itemsPerPage;
  const currentPageData = data.items.slice(startItem, endItem) // 현재 페이지에 보여지는 리스트
  const pageCount = Math.ceil(data.items.length / itemsPerPage)
  const maxVisibleButtons = 10;
  const maxPage = Math.min(pageCount, currentPage + Math.floor(maxVisibleButtons / 2)); // 최대 페이지 버튼 번호
  const minPage = Math.max(1, maxPage - maxVisibleButtons + 1); // 최소 페이지 버튼 번호



  //useEffect는 비동기적으로 동작
  useEffect(() => {
    let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

    //query를 리턴하는 함수를 result에 할당
    async function get() {
      try {
        const result = await axios.get(
          'http://localhost:3001/data',
          {
            params: {
              name: query
            }
          }
        );
        if (!completed) {
          console.log(result.data)
          setData({ items: result.data || [] });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();

    return () => {
      completed = true;
    };
    //query가 변할때 useEffect를 실행해야하는 시점이다
  }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
  function pageBtn() {
    const result = [];
    const maxVisibleButtons = 10; // 최대 보이는 페이지 버튼 수
    let minPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2)); // 최소 페이지 버튼 번호
    const maxPage = Math.min(minPage + maxVisibleButtons - 1, pageCount); // 최대 페이지 버튼 번호

    if (maxPage - minPage < maxVisibleButtons - 1) {
      minPage = Math.max(1, maxPage - maxVisibleButtons + 1);
    }

    for (let i = minPage; i <= maxPage; i++) {
      result.push(
        <button
          key={i}
          value={i}
          onClick={() => setCurrentPage(i)}
          style={{
            backgroundColor: currentPage === i ? 'pink' : 'white',
            color: currentPage === i ? 'white' : 'initial'
          }}
        >
          {i}
        </button>
      );
    }

    return result;
  }

  return (
    <>
      <input value={query} onChange={(e) => { setQuery(e.target.value); setCurrentPage(1) }} />
      <ul>
        {currentPageData &&
          currentPageData
            .map((value, index) => (
              <Link to={`/detail/${index}?name=${value.lbrryNm}&closeDay=${value.closeDay}&longitude=${value.longitude}&latitude=${value.latitude}&address=${value.rdnmadr}`} key={index}>
                <li>{value.lbrryNm} : {value.closeDay}</li>
              </Link>
            ))}
      </ul>


      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>처음으로</button >
      <button onClick={() => currentPage > 10 ? setCurrentPage(currentPage - 10): null}  disabled={currentPage <= 10}>&lt;&lt;</button>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        이전 페이지
      </button>
      {pageBtn()}
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount}>
        다음 페이지
      </button>
      <button onClick={() => currentPage <= pageCount-10 ? setCurrentPage(currentPage + 10): null} disabled={currentPage > pageCount-10}>&gt;&gt;</button>
      <button onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount}>마지막으로</button>
    </>
  );



}
/**
 * @see SearchFetch() //참조해서 봐야할것
 */
function Detail() {

  /**
   * id : 인덱스번호
   * location : 현재URL가져오기
   * searchParams : 쿼리스트링 값 가져오기
   * name: 도서관이름
   * closeDay : 휴관일
   * @returns 도서관이름,휴관일,경도,위도,카카오맵
   */
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const closeDay = searchParams.get('closeDay');
  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');
  const address = searchParams.get('address');

  return (
    <>
      도서관 내용
      <p>도서관 이름: {name}</p>
      <p>주소: {address}</p>
      <p>휴관일: {closeDay}</p>
      <KakaoMap index={id} longitude={longitude} latitude={latitude} name={name} />
    </>
  );
}
export { SearchFetch, Detail };