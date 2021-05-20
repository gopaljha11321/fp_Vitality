console.clear();
var a=document.getElementById('access');
var inn=a.innerHTML;
var objpeople =[
    {
        username: "gopal",
        password: "8745977703"
    },
    {
        username:"utkarsh",
        password:"12345678"

    },
    {
        username:"arjun",
        password:"87654321",
    },
]
function getInfo(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

 for (i=0;i< objpeople.length;i++)
 {
if(username==objpeople[i].username && password==objpeople[i].password  )
{
    console.log("dcndjcmdc")
    inn= "Welcome"+" "+username+"!!";
    a.innerHTML=inn;
    window.location="https://vitality100.000webhostapp.com";
    return;
}
 
else
{
    console.log("username and password is wrong");
    inn= "username and password is wrong";
    a.innerHTML=inn;
}
 }
}

