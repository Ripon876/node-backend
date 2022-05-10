 $('.careerHeadings').hide();
  $('#careerForm').hide();




// edit heading

  $('#editForm').click(()=> {
      $("#editForm").attr('disabled' ,true)
     $('.careerHeadings').show(300);
  })


 $('.careerHeadings #form').submit((e)=>{
    e.preventDefault();
    var formdata = new FormData(document.getElementById('form'));
    $.ajax({
      type: 'PUT',
      url: '/career',
      data: formdata,
      processData : false,
      contentType: false,
      success: function(res) {
        if(res.status){
               Swal.fire(
          'Success',
          'Info updated',
          'success'
        ).then(()=> {
            $('#editForm').attr('disabled', false);
           
            $('.careerHeadings').hide(300);
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


 // delete opening


  $('.deleteOpening').click((e)=> {
   var opening =JSON.parse(e.target.previousElementSibling.value);


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
        url : '/career/openings',
        data : opening,
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