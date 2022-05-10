
$(".newClientForm").hide();

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








// 


  $(".addNew").click(()=> {
    $(".newClientForm").show(300);
    $('.addNew').attr("disabled",true)
  })




$('.newClientForm #form').submit((e)=> {
  e.preventDefault();

var formData = new FormData(document.getElementById('form'));

  toastr["success"]("Please wait, your request is being processing");
 $.ajax({
    type : 'POST',
    url: '/clients',
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Client Added',
          'success'
        ).then(()=> {
          $(".newClientForm").hide(300);
          $('.addNew').attr("disabled",false)
        }).then(()=> {
           $('.clients').append(`<div class="col-2 pb-2 text-center">
                               <img src="${res.client}" class="img-fluid" />
                               <div class="pt-1">
                                 <button class="btn btn-danger btn-sm deleteClient dfdsfdsd">Remove</button>
                               </div>
                            </div> `)
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




// /////////////////////
 $(document).on('click', '.deleteClient', function(e){

   var img = e.target.parentElement.previousElementSibling.src;

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
        url : '/clients',
        data : {img : img},
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