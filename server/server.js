const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const path = require("path")

app.listen(80);
app.use(bodyParser.json())
app.use(express.urlencoded());
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..\\client\\build\\index.html"));
})

app.post('/register', function(request, response){
    
    fs.readFile(__dirname + "/userdata.json",(error,data)=>{
        data=JSON.parse(data);
        const email=request.body.email;
        const password=request.body.password;
        x=Date.now();
        console.log(email,password);
        const resualt1 = data.filter((item) => item.email === request.body.email);
        console.log(resualt1)
        if(resualt1==""){
            if(password!="" && email!=""){
                if(email!="" && password!=""){
                data.push({id:x,email:email,password:password});
                fs.writeFile(__dirname+"/userdata.json",JSON.stringify(data),(error)=>{
                    console.log("veriler geldi");
                    response.end(JSON.stringify({status:"basarili"}));
                })}
                else{
                    response.end(JSON.stringify({status:"basarisiz"}));
                }
            }
            else{
                response.end(JSON.stringify({status:"bos bırakılamaz"}));
            }
        }
        else{
            response.end(JSON.stringify({status:"kullanıcı bulunmakta"}));
        }
    })
  
});

app.post('/login',(req,res)=>{
    fs.readFile(__dirname+"/userdata.json",(error,data)=>{
        data=JSON.parse(data);
        const resualt2 = data.filter((item) => item.email === req.body.email && item.password === req.body.password );
        console.log(resualt2);
        if(resualt2!=""){
            res.end(JSON.stringify({status:"basarili"}));
        }
        else{
            res.end(JSON.stringify({status:"basarisiz"}));
        }
    })
}) ;

