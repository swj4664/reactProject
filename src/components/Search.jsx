import { useEffect, useState } from 'react';
import axios from 'axios';


function SearchFetch({receiveData}){
    const [data, setData] = useState({ items: [] });
    const [query, setQuery] = useState("포항시");

    //useEffect는 비동기적으로 동작
    useEffect(() => {
      let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

      //query를 리턴하는 함수를 result에 할당
      async function get() {
        try {
        const result = await axios.get(
            `http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=efSREml9J5VV3VB7rUN3F1QrndFlWhJWdlTOrfPyf5al8SixYeyO%2FhQJIk9GdSCIHklk5t6iomUE6jj9uRTkZA%3D%3D&pageNo=1&numOfRows=100&type=json&SIGNGU_NM=${query}`
        );
        if (!completed){
            console.log(result.data.response.body.items);
            setData(result.data.response.body || {items : []});
            receiveData(result.data.response.body.items)
        }else{
            console.log(completed);
        }
        } catch(error){
          console.log(error);
        }
      }
      get();

      return () => {
        completed = true;
      };
      //query가 변할때 useEffect를 실행해야하는 시점이다
    }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
    return (
      <>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <ul>
          {data.items &&
           data.items.map((value,index) => (
            <a href={index}><li key={index}>{value.lbrryNm} : {value.closeDay}</li></a>
           ))}
        </ul>
      </>
    );
}
export default SearchFetch;