$('.des').hide();
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



    $('.newMember #form').submit((e)=>{
  e.preventDefault();
  var formData = new FormData(document.getElementById('form'));



  toastr["success"]("Please wait, your request is being processing");

  
  $.ajax({
    type : 'POST',
    url: '/team',
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Member Added',
          'success'
        ).then(()=> {
          window.location.href = "/team"
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



      $('#flexCheckChecked').click((e)=> {
       if(e.target.checked){
  
$('.des').show(300);

       }else{

$('.des').hide(200);
       }
  });




      