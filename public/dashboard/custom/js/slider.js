$('.sliderForm').hide();
  $('#slideEditForm').hide();


  $('#editForm').click(()=>{
    $('#editForm').attr('disabled', true);
    $('.sliderForm').show(300);
  })


  $('.sliderForm #form').submit((e)=> {
    e.preventDefault();
  
   
    const data = {
      slide_duration : $('#slide_duration').val(),
      axis :  $('#vertical:checked').val() === 'on' ?   'y' : 'x'
    }
 

$.ajax({
  type: 'POST',
  url : '/slider',
  data : data,
  success : function(res) {
    if(res.status){
       Swal.fire(
          'Success',
          'Settings updated',
          'success'
        ).then(()=> {
            $('#editForm').attr('disabled', false);
            $('.sliderForm').hide(300);
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






var slideData;
var btn;

  $(".editSlide").on('click',(e) => {
      btn = e;
      slideData =  JSON.parse(e.target.previousElementSibling.value);
      $('#slideEditForm').show(300);
      $('#title').val(slideData.title);
      $('#imgPreview').attr('src',slideData.img);
      $('#description').val(slideData.description);
      $('#color').val(slideData.color);
      slideData.show_img_first ?   $('#show_img_first').attr('checked',true) :  $('#show_img_first').attr('checked',false);
      $(window).scrollTop(0);


  })

 


   $('#slideEditForm form').submit((e)=> {
    e.preventDefault();
  
  var formData = new FormData(document.getElementById('slideEdit'))


  formData.append("oldData",JSON.stringify(slideData) );

  toastr["success"]("Please wait, your request is being processing");
$.ajax({
  type: 'PUT',
  url : '/slider',
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

          $('#slideEditForm').hide(300);
          $('#title').val('');
          $('#imgPreview').attr('src','');
          $('#description').val('');
          $('#color').val('');
          $('#show_img_first').attr('checked',false)
        })
        .then(() =>{
            updateSlide(btn,res.slide)
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



     function updateSlide(e,slide) {
    e.target.previousElementSibling.value = JSON.stringify(slide);
    var showImgFirst = e.target.parentElement.previousElementSibling.children[0];
  var color = e.target.parentElement.previousElementSibling.previousElementSibling.children[0];
  var title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0];
var img  = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0];



title.textContent = slide.title;
showImgFirst.textContent = slide.show_img_first ? 'Yes' : 'No' ;
img.src = slide.img;
color.textContent = slide.color



  };






    $('.deleteSlide').click((e)=> {
   var slide =JSON.parse(e.target.previousElementSibling.previousElementSibling.value);


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
        url : '/slider',
        data : slide,
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