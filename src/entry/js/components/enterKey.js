document.getElementById("chatSubmitForm").onkeydown = function (event) {
  if (event.ctrlKey && event.key === 'Enter') {
    changeHandler(document.getElementById('chatMessage'));
    event.preventDefault();
  } else if (event.key === 'Enter') {
    event.preventDefault();
  }
}
