const http = require('http');

http.createServer(function(req,res){
	res.write("On our way to being a full stack engineer");
	res.end();
}).listen(3000);

console.log('Server is running');
