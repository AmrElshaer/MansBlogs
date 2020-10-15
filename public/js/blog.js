$(document).ready(function(){
     var posts=$('.postdata');
     $('.postdata').each(function(i,value){
          $(value)[0].innerHTML=$(value)[0].innerText;
         
     }); 
});