//Register 
$("#form_register").submit(function(e){
    e.preventDefault();
    
    $.post({
        url: "http://127.0.0.1:3000/users/register", 
        cache: false,
        dataType: "json",
        ContentType: "application/json;charset=utf-8",
        data: $(this).serialize(), 
        success:function(response){
            if(response != "Erreur serveur"){
                alert("Inscription réussite"); 
                window.setTimeout("location=('login.html');" , 1000); 
            }else{
                alert(response); 
            }
        },
        error:function(){
            alert("Une erreur s'est produite"); 
        }
    })
}); 

//Login 
$("#form_login").submit(function(e){
    e.preventDefault();
    
    $.post({
        url: "http://127.0.0.1:3000/users/login", 
        cache: false,
        dataType: "json",
        ContentType: "application/json;charset=utf-8",
        data: $(this).serialize(), 
        success:function(response){
            if(response != "Token invalide"){
                localStorage.setItem("authorization" , response.token); 
                sessionStorage.setItem("role" , response.role); 
                window.setTimeout("location=('index.html');" , 1000); 
            }else{
                alert(response); 
            }
        },
        error:function(){
            alert("Une erreur s'est produite"); 
        }
    })
}); 


//create post for admin
let role = JSON.parse(sessionStorage.getItem("role" ));
if( role === true ){
    $("#add_article").removeClass("cacher"); 
    $("#form_add_article").submit(function(e){
        e.preventDefault();

        $.post({
            url: "http://127.0.0.1:3000/posts", 
            headers: {"authorization": localStorage.getItem("authorization")}, //token
            cache: false,
            dataType: "json",
            ContentType: "application/json;charset=utf-8",
            data: $(this).serialize(),
            success:function(response){
                alert(response.message);
                window.setTimeout("location=('index.html');" , 1000); 
            },
            error:function(){
                alert("Une erreur s'est produite"); 
            }
        })
    }); 
}


//Find post if connect
if(localStorage.getItem("authorization") != null ){
    $("#connect").toggleClass("cacher"); 
    $("#register").toggleClass("cacher"); 
    $("#logout").removeClass("cacher");

    $.get({
        url: "http://127.0.0.1:3000/posts", 
        headers: {"authorization": localStorage.getItem("authorization")}, //token
        success:function(response){
            let html = ""; 
            response.forEach(function(item){
                html +='<div class="jumbotron jumbotron-fluid"><div class="container"><h2>'+ item.title +'</h2><p class="lead">'+ item.content +'</p></div></div>'; 
                $("#home_content").html(html); 
            }); 
        },
        error:function(){
            $("#home_content").html("Accès non autorisé"); 
        }
    })
} 


//Logout
$("#logout").on("click" , ()=>{
    localStorage.clear(); 
    sessionStorage.clear();
    alert("déconnecté"); 
    window.setTimeout("location=('index.html');" , 1000); 
}); 

