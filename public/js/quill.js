$(document).ready(function(){
  var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6,  false] }],
      ['bold', 'italic', 'underline','strike'],
      ['image', 'code-block'],
      ['link'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
 var setContentInQuill= function (){
  const value = $('#Content').val();
const delta = quill.clipboard.convert(value);
quill.setContents(delta, 'silent')
}
setContentInQuill();


// Return the HTML content of the editor
var data=  function getQuillHtml() { return quill.root.innerHTML; }
// When the convert button is clicked, update output
$('#Blog').on('click', () => { 
    $('#Content').val(data());
    console.log('submit');
    $('#BlogContent').submit();
})
});


