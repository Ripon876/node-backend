

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



// delete intern


 
  $('.deleteIntern').click((e)=> {
   var intern =JSON.parse(e.target.previousElementSibling.value);


Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result)=> {
   if(result.isConfirmed){
  toastr["success"]("Please wait, your request is being processing");
      $.ajax({
        type: 'DELETE',
        url : '/interns',
        data : intern,
        success :  function(res){
          if(res.status){
             Swal.fire(
          'Success',
           res.msg,
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