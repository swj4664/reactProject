import { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import { Link, useParams, useLocation } from 'react-router-dom'
import '../css/Search.css'

function SearchFetch() {
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState("");
  const [Selected, setSelected] = useState("");

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
            params : {
              name : query,
              type : Selected
            }
          }
        );
        if (!completed) {
          console.log(result.data)
          setData({ items: result.data.items || [] });
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

  const handleQueryChange = (event) => {
    console.log(event);
    setQuery(event.target.value);
    setCurrentPage(1);
  }

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  }
  function pageBtn(){
    const result = [];
    const maxVisibleButtons = 10; // 최대 보이는 페이지 버튼 수
    let minPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2)); // 최소 페이지 버튼 번호
    const maxPage = Math.min(minPage + maxVisibleButtons - 1, pageCount); // 최대 페이지 버튼 번호

    if (maxPage - minPage < maxVisibleButtons - 1) {
      minPage = Math.max(1, maxPage - maxVisibleButtons + 1);
    }

    for (let i = minPage; i <= maxPage; i++) {
      result.push(
        <button className='num_btn'
          key={i}
          value={i}
          onClick={() => setCurrentPage(i)}
          style={{
            backgroundColor: currentPage === i ? 'rgb(98 212 173)' : 'white',
            color: currentPage === i ? 'white' : 'initial'
          }}
        >
          {i}
        </button>
      );
    }

    return result;
  }

  let [titleHover, setTitleHover] = useState();
  let [inputLength, setInputLength] = useState(false)

  return (
    <>
      <div className='title'><img src="http://localhost:3000/img/title.png" alt="" /></div>
      <div className='content'>
        <div className='input_G'>
          <select name="" id="">
            <option value="">도서관명별</option>
            <option value="">지역별</option>
          </select>
          <input className='input_box' placeholder='찾으시는 도서관명을 입력해주세요.' value={query} onChange={(e) => { setQuery(e.target.value); setCurrentPage(1) }} />
          <img src="http://localhost:3000/img/search.png" alt="" />
        </div>

        <div className='list_G'>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>도서관명</th>
                <th>주소</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData &&
                currentPageData
                  .map((value, index) => (
                    <tr key={index} className={titleHover == index ? 'titleHover_bg' : ""}>
                      <td>
                        <Link className={titleHover == index ? 'titleHover' : ""} onMouseOver={()=> setTitleHover(index)} onMouseLeave={()=> setTitleHover(null)} to={`/detail/${index}?name=${value.lbrryNm}&closeDay=${value.closeDay}&longitude=${value.longitude}&latitude=${value.latitude}&address=${value.rdnmadr}&phoneNumber=${value.phoneNumber}&homepageUrl=${value.homepageUrl}`} key={index}>
                          {value.lbrryNm}
                        </Link>
                      </td>
                      <td>{value.rdnmadr}</td>
                      <td>{value.phoneNumber}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className='button_G'>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1 || pageCount < 11 || pageCount > 10 && currentPage < 2}>처음</button >
          <button onClick={() => currentPage > 10 ? setCurrentPage(currentPage - 10) : null} disabled={currentPage <= 10}>&lt;&lt;</button>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          {pageBtn()}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount || data.items.length == 0}>
            &gt;
          </button>
          <button onClick={() => currentPage <= pageCount - 10 ? setCurrentPage(currentPage + 10) : null} disabled={currentPage > pageCount - 10}>&gt;&gt;</button>
          <button onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount || data.items.length == 0 || pageCount < 11}>끝</button>
        </div>
      </div>



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
  const phoneNumber = searchParams.get('phoneNumber');
  const homepageUrl = searchParams.get('homepageUrl');

  return (
    <>
      도서관 내용
      <p>도서관 이름: {name}</p>
      <p>주소: {address}</p>
      <p>휴관일: {closeDay}</p>
      <p>전화번호: {phoneNumber}</p>
      <p>홈페이지: <a href={homepageUrl}>{homepageUrl}</a></p>
      <KakaoMap index={id} longitude={longitude} latitude={latitude} name={name} />
    </>
  );
}
export { SearchFetch, Detail };