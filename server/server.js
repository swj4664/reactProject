const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정
const session = require('express-session');
const Memorystore = require('memorystore')(session)

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

let maxAge = 60*1000;
app.use(session({
    secret: '1111', // 세션에 사용할 암호화 키
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
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.body.id
    let pw = req.body.pw

    db.query(`select count(id) from users where id='${id}' and password='${pw}'`, (err, result)=> {
        if(result[0]['count(id)'] === 1){
            req.session.userId = id;
            console.log('성공');
            // res.send(id);
                res.redirect('/header');
        } else {
            console.log('실패')
        }
    })
})


app.get("/header", (req, res) => {
    let aaa = req.session.userId;
    console.log(aaa);
})

