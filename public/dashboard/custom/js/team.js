
$(".Member").hide();



  var btn;
  var teamMember ; 
  $('.editBtn').click((e)=> {
    btn = e;
    var member = JSON.parse(e.target.previousElementSibling.value) ;
    teamMember = member;
    $('#name').val(member.name);
    $('#position').val(member.position);
    $('#fb').val(member.social_links.fb);
    $('#twitter').val(member.social_links.twitter);
    $('#instagram').val(member.social_links.instagram);
    $('#linkedin').val(member.social_links.linkedIn);
    $('#logoPreview').attr("src",member.img);
    $(".Member").show(300);
  })

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



      $('#form').submit((e)=> {
    e.preventDefault();
    toastr["success"]("Please wait, your request is being processing");
    var formData = new FormData(document.getElementById('form'));
    formData.append("oldData",JSON.stringify(teamMember))
  
  $.ajax({
    type : 'PUT',
    url: '/team',
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Member Updated',
          'success'
        ).then(()=> {

      btn.target.previousElementSibling.value = JSON.stringify(res.member);
      btn.target.parentElement.previousElementSibling.children[0].textContent = res.member.position;
      btn.target.parentElement.previousElementSibling.previousElementSibling.children[0].textContent =  res.member.name;
      btn.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].src = res.member.img;


        }).then(()=> {
          $(".Member").hide(200)
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




      $('.deleteBtn').click((e)=> {
  var member = JSON.parse( e.target.previousElementSibling.previousElementSibling.value);
  console.log(member)



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




  $.ajax({
    type : 'DELETE',
    url: '/team',
    data:  member,
    success: function(res) {
      if(res.status){
       Swal.fire(
          'Success',
          'Member Deleted',
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

