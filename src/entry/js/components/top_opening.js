window.onload = function () {
  var openingElement = document.getElementById('openingFormContents');
  $(openingElement).addClass('is-fadein');
}

function fadeout() {
  $('#openingForm').fadeOut('slow');
}

document.getElementById('openingBtn').onclick = function openingForm() {
  const newName = $('#openingForm').serialize();
  $.ajax("/opening", {
    type: "post",
    data: newName,
    dataType: "json",
  });
  setTimeout(fadeout, 900);
}
