const fs = require("fs")
const http = require("http")
const validStudent = require("./db")
console.log(validStudent.nameNotEqual)
console.log(validStudent.ability)



const server = http
    .createServer((req,res)=>{
        let body =""
        res.writeHead(200,"ok",{
            "Access-Control-Allow-Headers": "*",
        });
        req.on("data",(data)=>{
            dataObj = JSON.parse(data.toString())
            if(validStudent.nameNotEqual.includes(dataObj.name)){
                body += "name not allowed"
            }
            else if(!validStudent.ability.includes(dataObj.ability)){
                body += "ability not allowed"
            }
            else{
                body += data
            }
        })
        req.on("end",()=>{
            res.write(body)
            res.end()
        })
    })
    .listen("8080",()=>{
        console.log("running 8080..")
    })
    