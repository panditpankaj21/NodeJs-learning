const http = require("http")

const myServer = http.createServer((req, res) => {
    console.log("new Request Comes", req.headers);
    res.end("Hello from server")
})

myServer.listen(8000, ()=> console.log("server is running"))