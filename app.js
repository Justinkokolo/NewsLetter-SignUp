const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request =  require("request");

const app = express();

//To access the file with the server
app.use(express.static("public"));

//Telling the app to use body parser
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req , res){

     res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req , res){

      const firstName = req.body.fname;
      const lastName = req.body.lname;
      const email = req.body.email;
      console.log(firstName);


//sending data into an API variable
      const data = {

         members:[
           {
             email_address:email,
             status:"subscribed",
             merge_fields:{
               FNAME:firstName,
               LNAME:lastName,
             }
           }
         ]

      }//end of dta const
      //Converting javascript variable into Jason
      const jsonData =  JSON.stringify(data);
                        //server number                    //listId
      const url = "https://us9.api.mailchimp.com/3.0/lists/725e6d10aa";

      const options = {

        method: "POST",
        auth:"justin1:85428d102aaa6f66c6d1eea2d92c91eb-us19"
      }

     const request =   https.request(url,options , function(response){

         if(response.statusCode === 200){
           res.send("Successfully subscribed");
         }else{
           res.sendFile(__dirname + "/failure.html");
         }

          response.on("data",function(data){
              console.log(JSON.parse(data));
          })
      })//end of  request

     request.write(jsonData);
    request.end();

});//end of app method

app.post("/failure", function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("up running on port 300");
});
//85428d102aaa6f66c6d1eea2d92c91eb-us19
//725e6d10aa

//jason
//'{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}'
