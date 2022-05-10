

// edit btn 

var benefit;
var btn;

  $(".editBenefit").on('click',(e) => {
      btn = e;
      benefit =  JSON.parse(e.target.previousElementSibling.value);
      $('#newbenefitform').show(300);
      $('#newbenefitform #title').val(benefit.title);
      $('#newbenefitform #imgPreview').attr('src',benefit.img);
      $('#newbenefitform #description').val(benefit.description);

      $(window).scrollTop(0);

  })

 






// img previwer

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

function readURL2(input) {

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

$("#benefitimg").change(function() {
readURL2(this);
});


// about heading hanlder

$('.aboutHeadings').hide();
$('#newbenefitform').hide();


  $('#editForm').click(()=> {
      $("#editForm").attr('disabled' ,true)
     $('.aboutHeadings').show(300);
  })





 $('.aboutHeadings #form').submit((e)=>{
    e.preventDefault();
    var formdata = new FormData(document.getElementById('form'));
    $.ajax({
      type: 'PUT',
      url: '/about',
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
           
            $('.aboutHeadings').hide(300);
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







// benefit update
  $('#newbenefitform form').submit((e)=> {
    e.preventDefault();
  
  var formData = new FormData(document.getElementById('newbenefiteditform'))


  formData.append("oldData",JSON.stringify(benefit) );
  toastr["success"]("Please wait, your request is being processing");
$.ajax({
  type: 'PUT',
  url : '/about/benefits',
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
          $('#newbenefitform').hide(300);
          $('#newbenefitform #title').val('');
          $('#newbenefitform #imgPreview').attr('src','');
          $('#newbenefitform #description').val('');
          
        })
        .then(() =>{
            updateService(btn,res.benefit)
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

    function updateService(e,benefit) {

    e.target.previousElementSibling.value = JSON.stringify(benefit);
    var title = e.target.parentElement.previousElementSibling.children[0];
    var img = e.target.parentElement.previousElementSibling.previousElementSibling.children[0];
  
    img.src = benefit.img;
    title.textContent = benefit.title;

  }


  // delete benefit

   
  $('.deleteBenefit').click((e)=> {
   var benefit =JSON.parse(e.target.previousElementSibling.previousElementSibling.value);


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
        url : '/about/benefits',
        data : benefit,
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