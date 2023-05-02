const selectDropdown = document.querySelector('.image-select-list');

document.addEventListener( 'click', function(e) {
  if (e.target.matches('.image-opt')) {
    selectDropdown
      .querySelector('#undraftedFactionImg')
      .innerHTML = e.target.innerHTML;
  }
});

// remove all active classes on the other select-dropdowns

selectDropdown.addEventListener('click', function(e) {
  selectDropdown.style.display = 'visible';
});


// this event is to close all open select-options when the user clicks off.

document.body.addEventListener('click', function(e) {
  if(!e.target.closest('.select-dropdown')) {
    selectDropdown.classList.remove("is-active");
  }
});
