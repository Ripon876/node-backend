function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      function na() {
        $("#logoPreview").attr("src", e.target.result);
        $("#imgPreviewBox").show(300);
      }
      na();
    };
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
$("#img").change(function () {
  readURL(this);
});
$("#editForm").click(() => {
  $("#formID").css("pointer-events", "all");
  $("#editForm").attr("disabled", true);
  toastr["success"]("Now you can edit the form");
});

$("#form").on("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(document.getElementById("form"));
  toastr["success"]("Please wait, your request is being processing");

  $.ajax({
    type: "POST",
    url: "/slider/slides",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status) {
        Swal.fire("Success", "Slider Added", "success").then(() => {
          window.location.href = "/slider";
        });
      }
    },
    error: function (err) {
      if (err.responseJSON.err) {
        Swal.fire("Error", err.responseJSON.err, "error");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    },
  });
});
