document.getElementById('catButton').onclick = () => {
  const modal = document.getElementById('catModal');
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
};

document.getElementById('difButton').onclick = () => {
  const modal = document.getElementById('difModal');
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
};

document.querySelectorAll('#catModal .option').forEach(button => {
  button.onclick = () => {
    const selectedText = button.textContent;
    const selectedStyle = window.getComputedStyle(button).background;
    const mainButton = document.getElementById('catButton');

    mainButton.textContent = selectedText;
    mainButton.style.background = selectedStyle;

    closeModal('catModal');
  };
});

document.querySelectorAll('#difModal .option').forEach(button => {
  button.onclick = () => {
    const selectedText = button.textContent;
    const selectedStyle = window.getComputedStyle(button).background;
    const mainButton = document.getElementById('difButton');

    mainButton.textContent = selectedText;
    mainButton.style.background = selectedStyle;
    
    closeModal('difModal');
  };
});

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const content = modal.querySelector('.modal-content')

  modal.classList.remove('show');
  content.classList.add('hide');

  setTimeout(() => {
    modal.style.display = 'none';
    content.classList.remove('hide');
  }, 400);
}