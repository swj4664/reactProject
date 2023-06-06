const express = require("express"); // npm i express | yarn add express
const session = require('express-session');
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정
const Memorystore = require('memorystore')(session)

// MySQL 연결
const db = mysql.createPool({
    host: "localhost", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "1111",      // 데이터베이스 비밀번호
    database: "library",  // 사용할 데이터베이스
});


app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 도메인 주소
    credentials: true, // 쿠키를 포함한 요청을 허용
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

let maxAge = 60*1000;
app.use(session({
    secret: 'song', // 세션에 사용할 암호화 키
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge  }),  // 서버를 저장할 공간 설정,
    cookie: {
        maxAge: maxAge
    }
  }));

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true })) 


// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

/**
 * @brief 도서관검색 비동기통신
 */
app.get("/data", (req, res) => {
    let searchType = req.query.type;
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

/**
 * @brief 회원가입 비동기통신
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post("/join", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.body.id
    let pw = req.body.pw
    let sqlQuery = "";
    sqlQuery = `SELECT * FROM users`;
    
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });

    db.query(`insert into users (id, password) values ('${id}','${pw}')`, (err, result)=> {
        if(err){
            console.log('실패')
        } else {
            console.log('성공');
        }
    })
}); 


app.post("/login", (req, res) => {
    let id = req.body.id
    let pw = req.body.pw

    db.query(`select id, count(id) from users where id='${id}' and password='${pw}'`, (err, result)=> {
        if(result[0]['count(id)'] === 1){
            req.session.user = result[0].id;
            res.send(result);
        } else {
            console.log('실패')
        }
    })
})


app.get("/get-user-id", (req, res) => {
    let user = req.session.user;
    res.send({ userId: user }); // 세션 값 반환
})

