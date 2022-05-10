
$('#sendReply').submit((e)=>{
  e.preventDefault();
  var formData = new FormData(document.getElementById('sendReply'));
  toastr["success"]("Please wait, your request is being processing");
  $.ajax({
    type : 'POST',
    url : '/messages/send',
    data : formData,
    processData : false,
    contentType : false,
    success : function(res){
      if(res.status){
         Swal.fire(
          'Success',
          res.msg,
          'success'
        ).then(()=> {
          window.location.href = '/admin';
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
})