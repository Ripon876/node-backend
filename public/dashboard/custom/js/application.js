// delete application

$(".deleteApplication").click((e)=> {
  var application = e.target.previousElementSibling.value;


Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove it!'
}).then((result)=> {
   if(result.isConfirmed){
  toastr["success"]("Please wait, your request is being processing");
    $.ajax({
      type : 'DELETE',
      url : '/applications',
      data : JSON.parse(application),
      success : function(res){
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
