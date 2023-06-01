const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
    host: "localhost", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "1111",      // 데이터베이스 비밀번호
    database: "library",  // 사용할 데이터베이스
});


app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true })) 


// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.get("/data", (req, res) => {
    let searchType = req.query.type;
    console.log(searchType);
    let sqlQuery ="";
    res.header("Access-Control-Allow-Origin", "*");
    if(searchType === 'bookNn'){
        sqlQuery = `SELECT * FROM 전국도서관표준데이터 WHERE lbrryNm like '%${req.query.name}%'`;
    }else if(searchType === 'region'){
        sqlQuery = `SELECT * FROM 전국도서관표준데이터 WHERE CONCAT(ctprvnNm, signguNm) LIKE '%${req.query.name}%'`;
    }
    db.query(sqlQuery, (err, result) => {
        res.send({items:result});
    });
}); 