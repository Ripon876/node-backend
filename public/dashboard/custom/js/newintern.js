
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          function na(){
            $('#logoPreview').attr("src", e.target.result)
            $('#imgPreviewBox').show(300);
          }
          na();
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    }
    $("#img").change(function() {
    readURL(this);
    });



 var projects = []

  function isValidURL(url) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url); 
  }

  $('.addProject').click(()=> {

  if($('.projectpreview .row').children().length < 6 ){



if( isValidURL($('#projecturl').val())){

  if(projects.indexOf($('#projecturl').val()) == -1){

    $('.projectpreview .row').append(`<div class="col-2 p-2 mx-1"><img src="https://api.site-shot.com/?url=${$('#projecturl').val()}&amp;userkey=IAAIEYKBJANTHZ6IA2EGC7G5XJ" class="img-fluid"></div>`)

      projects.push($('#projecturl').val());
      $('#projecturl').val('')
      toastr["success"]("Please wait , image is being added");
  }else{
    $('#projecturl').val('')
    toastr["warning"]('project already listed, try with a different url');
  }

}else{
    toastr["error"]("Please insert a valid url");
}

      



  }else{
   toastr["error"]("Can't add more than 6 projects");
  }

  });



  $('.newIntern #form').submit((e)=>{
  e.preventDefault();
  var formData = new FormData(document.getElementById('form'));
  formData.append('projects' ,projects);


  toastr["success"]("Please wait, your request is being processing");

  
  $.ajax({
    type : 'POST',
    url: '/interns/new',
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Intern Added',
          'success'
        ).then(()=> {
          window.location.href = "/interns"
        })
      }
    },
    error : function(err){
      Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
    }
  })
});