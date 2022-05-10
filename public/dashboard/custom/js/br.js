// create backup

$(".createBackupFile").click(()=>{

 toastr["success"]("Please wait");

$.ajax({
  type : 'GET',
  url : '/create-backup',
  success : function(res) {
    if(res.status){

       Swal.fire({
  title: 'Backup Created',
  text: "Download the backup",
  icon: 'success',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
})
 .then((result)=> {

   if(result.isConfirmed){
    window.open(res.file, '_blank');
   }

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


// restore

$('#Restore').submit((e)=> {
  e.preventDefault();
  var formData = new FormData(document.getElementById("Restore"))

if($('#backupFile').val()){


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
       


$.ajax({
  type: 'POST',
  url : '/restore',
  data : formData,
  processData: false,
  contentType: false,
  success : function(res) {
    if(res.status){
 
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
})



     }
})

}else{

  Swal.fire(
    'Error',
    'Please choose a file',
    'error'
  )

}
})

