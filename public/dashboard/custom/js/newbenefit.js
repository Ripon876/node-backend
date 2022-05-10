
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          function na(){
            $('#imgPreview').attr("src", e.target.result)
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


$('#newbenefitform #form').submit((e)=>{
  e.preventDefault();
  var formData = new FormData(document.getElementById('form'));


  toastr["success"]("Please wait, your request is being processing");
  
  $.ajax({
    type : 'POST',
    url: '/about/benefits/new',
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Benefit Added',
          'success'
        ).then(()=> {
          window.location.href = "/about"
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
