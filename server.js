var express = require("express"); // 외부 모듈
var app = express(); // 서버 객체 생성
var multer = require("multer"); // 파일 업로드 처리 모듈 // 외부모듈

var path = require("path"); // 경로 정보를 반환해준다. 확장자 까지.

var mysql = require("mysql");

var ejs = require("ejs"); // 서버측에서 해석 및 실행 되는 동적 뷰파일
var fs = require("fs");


// mysql 접속 문자열 선언
var conStr ={
    host : "localhost",
    user : "root",
    password : "1234",
    database : "ios"
}

// 정적 자원 위치를 알려주는 미들웨어를 사용 해야함.
// __dirname : 루트 경로
var upload = multer({
    storage : multer.diskStorage({
        destination : function(req , file, cb){
            cb(null, "./data"); // 업로드 경로 지정
        },
        filename : function(req, file ,cb){
            // cb(null, file.originalname); // 유일성이 없기 때문에 충돌 위험이 있음
            cb(null, new Date().valueOf()+path.extname(file.originalname))
        }
    })
});
app.use(express.static(__dirname));

// 업로드 요청 처리
app.post("/regist", upload.array("myFile"),function(req , res){
    // 데이터 베이스 넣기
    var filename = req.files[0].filename;
    var con = mysql.createConnection(conStr);

    con.connect(); // open
    console.log("post!!")
    var sql = "insert into gallery(title,filename) value(?,?)";

    req.body.title

    con.query(sql,[req.body.title , filename],function(error , result, fields){
        if(error){
            console.log(error)
        }else{
            res.redirect("/list.html");
        }
    })

    

    con.end(); // close


});
app.get("/list", function(req ,res){
        
    // 이요청은 클라이언트의 종류가 스마트폰이건 , 브라우저이건 상관없이 공통의 요청이 되려면 , 데이터만 보내자. View를 보여주려고 하지말자.
    // 뷰에 대한 책임은 데이터를 가져간 클라이언트가 알아서 하는 거다.

    var con = mysql.createConnection(conStr)

    con.connect();
    var sql = "select * from gallery";
    
    con.query(sql,function(error, result, fields){
       
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{"Content-Type":"text/json;charset=utf-8"});
            
            var data = {
                "list" : result
            }
            res.end(JSON.stringify(data))
        }


    })

    
    con.end()

});

app.get("/" ,function(req ,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("This is content from server")
})

app.listen(8888, function(){
    console.log("express Servier Running at 8888 port ..")
})


