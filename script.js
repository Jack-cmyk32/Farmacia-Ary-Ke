
const loginBtn = document.getElementById('loginBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

loginBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'flex'; 
});

// Al hacer clic en la "X", ocultamos el modal
closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});



document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown') && !e.target.closest('.mobile-menu-btn')) {
    document.querySelectorAll('.has-dropdown.open').forEach(openLi => {
      openLi.classList.remove('open');
    });
  }
});