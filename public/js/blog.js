$(document).ready(function(){
     
     var stringToHTML = function (str) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(str, 'text/html');
          return doc.body;
    };
     $('.postdata').each(function(i,value){
          $(value)[0].innerHTML=stringToHTML(value.innerHTML).innerText;
         
     }); 
});