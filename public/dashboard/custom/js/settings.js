
 

if(parsed_data.logo.includes('/')){
    $('#imgPreviewBox').show(300);
}else{
    $('#imgPreviewBox').hide();
}


$('#formID').css('pointer-events','none');
$('#formID').css('opacity','0.5');





// ========

$('form').on('submit',(e) => {
e.preventDefault();
var formData = new FormData(document.getElementById('formID'));

  toastr["success"]("Please wait, your request is being processing");

$.ajax({
type: "POST",
url: '/settings',
data: formData,
processData: false,
contentType: false,
success: function(response) {
 if(response.status){
    Swal.fire(
    'Success',
    'Settings updated',
    'success'
  )
 }

},
error : function(err){
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
}
});
})



//  ===

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
$('#editForm').click(()=> {
  $('#formID').css('pointer-events','all');
  $('#formID').css('opacity','1');
  $('#editForm').attr('disabled', true);
  toastr["success"]("Now you can edit the form");

})








 $('#reset').click(()=> {
 

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result)=> {
       if(result.isConfirmed){
       
  toastr["success"]("Please wait, your request is being processing");





       $.ajax({
        type: 'GET',
        url : '/admin/reset',
        success :  function(res){
          if(res.status){
             Swal.fire(
              'Success',
               'Everything has been cleared',
              'success'
            ).then(()=> {

                e.target.parentElement.parentElement.remove();

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
       

       }
    })



  })