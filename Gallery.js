// 게시물 하나를 담게 될 클래스 정의
// 객체지향 언어엥서는 데이터만 담는 인스턴스를 가리켜 VO, DTO

/*
// ECMAScript 2015 부터 클래스 , 생성자 지원
"<div style='border:1px solid red; margin-bottom:1px'> 
    <img src='./images/gf.jpg' width='25'/> 
    <span>My Girl Friend</span> 
</div>"
*/
class Gallery{
    // 멤버변수는 생성자 안에 정의 
    constructor(container,src,msg){
        this.container = container;
        
        this.div;
        this.img;
        this.src = src;
        this.msg = msg
        this.span;

        this.div = document.createElement("div");
        this.img = document.createElement("img");
        this.span = document.createElement("span");

        this.div.style.border = "1px solid red";
        this.div.style.margin = "margin-bottom : 1px";
        
        this.img.src = this.src
        this.img.style.width = 25+"px";

        this.span.innerText = this.msg

        this.div.appendChild(this.img);
        this.div.appendChild(this.span);
        
        this.container.appendChild(this.div);
        
    }
}