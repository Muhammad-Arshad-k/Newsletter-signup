const express    = require("express");
const bodyParser = require("body-parser");
const request    = require("request");
const path       = require("path");
const https      = require("https");

const app     = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
   res.sendFile(__dirname +"/signup.html")
})

app.post("/",(req,res)=>{
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email  = req.body.email;

   const data = {
        members:[
            {
                email_address:email,
                status       :"subscribed",
                merge_fields :{
                FNAME:firstName,
                LNAME:lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    
    const url = "https://us8.api.mailchimp.com/3.0/dc53957ca4";

    const options = {
        method:"POST",
        auth  :"arshad1:d00e6d9344c5a8cca09c36a78d4b3bcd-us8"
    }

   const request= https.request(url,options,function(response){
      response.on("data",function(data){
        datas = JSON.parse(data);
        if(data.status===200){
           res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
         
      })
    }) 

request.write(jsonData);
request.end(); 
 

});

app.post("/failure",(req,res)=>{
    res.redirect("/") 
}) 

app.listen(process.env.PORT ||3000,()=>{
    console.log("server is listening at port no 3000");
})

// api Key
// d00e6d9344c5a8cca09c36a78d4b3bcd-us8
//list id
// dc53957ca4