$(document).ready(function () {
      var add = (function () {
            var count = 0;
            return function IncreaseNumber() {
                  count += 1;
                  return count;
            }


      })();
      var stringToHTML = function (str) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, 'text/html');
            return doc.body;
      };
      
            function bufferToBase64(buf) {
                  var binstr = Array.prototype.map.call(buf, function (ch) {
                  return String.fromCharCode(ch);
                  }).join('');
                  return btoa(binstr);
            }
      var formateData=function(blog){
        
         const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
         let id=blog._id;
         let createdAt=new Date(blog.CreateAt);
         let publishDate=`${months[createdAt.getMonth()]}  ${createdAt.getDate()},${createdAt.getFullYear()}`;
         let content=stringToHTML(blog.Content).innerHTML;
         let title=blog.Title;
         let bloger=blog.Bloger;
         let blogerid=bloger?._id;
         let universities=blog.Universities;
         let imagestype=bloger!=null?bloger.CoverImageType:"";
         let imagepath=`data:${imagestype};charset=utf-8;base64,${bufferToBase64(bloger!=null?bloger.CoverImageName.data:"")}`;
         let univesityhtml='';
         universities.forEach(university=>{
            univesityhtml+= `<span><a href="single.html"><i class="icon-folder-o mr-2"></i>${university}</a></span>`;
         });
         let resuilt=`
       
         <div class="col-md-12">
         <div class="blog-entry  d-md-flex">
               <a href="/Profile/${blogerid}" class="img img-2 Profile" style="background-image: url(${imagepath}); "></a>
               <div class="text text-2 pl-md-4">
                     <h3 class="mb-2"><a href="/Blogs/${id}">${title!=null?`<h3>${title}</h3>`:''}</a></h3>
                     <div class="meta-wrap">
                           <p class="meta">
                                 <span><i class="icon-calendar mr-2"></i>${publishDate}</span>
                                ${univesityhtml}
   
   
                           </p>
                     </div>
                     <div style="max-height: 250px;overflow: hidden;"><p class="mb-4" >${content}</p></div>
                     
                     <p><a href="/Blogs/${id}" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a>
                    
                     </p>
               </div>
         </div>
   </div> `;
                 return resuilt;
      }
      function Getblogs() {
            debugger;
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('unversity');
            $.ajax({
                  url: `/Blogs/GetAllBlogs/${add()}?unversity=${myParam}`,
                  type: 'GET',
                  success: function (data) {
                        data.forEach(blog => {
                             
                              $('#allblogs').append(formateData(blog));

                        });


                  }
                  , error: function () {
                        console.error("error");
                  }
            });
      }

      $(window).scroll(function () {

            if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.6) {
                  Getblogs();
            }

      });




});