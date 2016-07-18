var http=require("http");
var url=require("url");
var query=require("querystring");
var fs=require("fs");
var ejs=require("ejs");

var server=http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
	
	var data;

	switch(request.url){
		case "/board/list": data=getList();break;
		case "/board/registForm": data=registForm();break;
		case "/board/regist": data=regist(request);break;
		case "/board/detail": detail();break;
		case "/board/edit": edit();break;
		case "/board/delete": del();break;
	}
	response.end(data);
});

function getList(){
	console.log("목록을 원합니다.");
	var data=fs.readFileSync("board/list.ejs","utf8");
	return ejs.render(data);
}
function registForm(){
	var data=fs.readFileSync("board/write.html","utf8");
	return data;
}
function regist(request){
	//mysql에 insert
	console.log("request.url is "+request.url);
	
	//파라미터 추출!!
	request.on("data", function(data){
		var obj=query.parse(url.parse(data));
		console.log(obj);	
	});

	var data=fs.readFileSync("board/list.ejs","utf8");
	return ejs.render(data);

}
function detail(){
	console.log("상세보기를 원합니다.");
}
function edit(){
	console.log("수정을 원합니다.");
}
function del(){
	console.log("삭제를 원합니다.");
}

server.listen(9999, function(){
	console.log("Server is running at 9999...");
});