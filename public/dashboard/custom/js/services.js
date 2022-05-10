  $('.des').hide()
  $('.serviceForm').hide()
  $('#serviceform').hide()
 

var service;
var btn;

  $(".editService").on('click',(e) => {
      btn = e;
      service =  JSON.parse(e.target.previousElementSibling.value);
      $('#serviceform').show(300);
      $('#serviceform #title').val(service.title);
      $('#serviceform #imgPreview').attr('src',service.img);
      $('#serviceform #description').val(service.description);

if(service.show_content_first){
  console.log(service.show_content_first)
    $('#serviceform #show_content_first').attr('checked',true)
}else{
  $('#serviceform #show_content_first').attr('checked',false)
}



if(service.moreDetails && service.full_description){
  console.log(service.full_description)
    $('#serviceform #flexCheckChecked').attr('checked',true);
    $('#keywords').val(service.keywords);
    // $('#full_description').val(service.full_description);
    $('.fr-element').html(service.full_description)
    $('.des').show(100)
}else{
  $('#serviceform #flexCheckChecked').attr('checked',false)
    $('.des').hide()
}
     




      $(window).scrollTop(0);



  })

 
  $('#flexCheckChecked').click((e)=> {
       if(e.target.checked){
  
$('.des').show(300);

       }else{

$('.des').hide(200);
       }
  })

  // edit btn handler

  $("#editForm").click(()=>{
     $("#editForm").attr('disabled' ,true)
    $('.serviceForm').show(300)
  })



  // img preview

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



// heading form submit


 $('.serviceForm #form').submit((e)=>{
    e.preventDefault();
    var formdata = new FormData(document.getElementById('form'));
    $.ajax({
      type: 'PUT',
      url: '/services',
      data: formdata,
      processData : false,
      contentType: false,
      success: function(res) {
        if(res.status){
               Swal.fire(
          'Success',
          'Settings updated',
          'success'
        ).then(()=> {
            $('#editForm').attr('disabled', false);
            $('.serviceForm #form #title').val(res.services.title)
            $('.serviceForm #form #short_description').val(res.services.short_description)
            $('.serviceForm').hide(300);
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




  //  service edit form submit

   $('#serviceform form').submit((e)=> {
    e.preventDefault();
  
  var formData = new FormData(document.getElementById('serviceEditForm'))


  formData.append("oldData",JSON.stringify(service) );
  toastr["success"]("Please wait, your request is being processing");

$.ajax({
  type: 'PUT',
  url : '/services/service',
  data : formData,
  processData: false,
  contentType: false,
  success : function(res) {
    if(res.status){
  
       Swal.fire(
          'Success',
          'Settings updated',
          'success'
        ).then(()=> {
console.log($('#serviceform #show_content_first'))
          $('#serviceform').hide(300);
          $('#serviceEditForm #title').val('');
          $('#serviceEditForm #imgPreview').attr('src','');
          $('#serviceEditForm #description').val('');
          $('#serviceform #show_content_first').attr('checked',false);
          
        })
        .then(() =>{
            updateService(btn,res.service)
            
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


     function updateService(e,service) {

    e.target.previousElementSibling.value = JSON.stringify(service);
    var showContentFirst = e.target.parentElement.previousElementSibling.children[0];
    var title = e.target.parentElement.previousElementSibling.previousElementSibling.children[0];

   var img  = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0];

    showContentFirst.textContent = service.show_content_first ? 'Yes' : 'No' ;
    img.src = service.img;
    title.textContent = service.title;

  }



  // delete service handler

  
  $('.deleteService').click((e)=> {
   var service =JSON.parse(e.target.previousElementSibling.previousElementSibling.value);


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
        url : '/services',
        data : service,
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



  });
