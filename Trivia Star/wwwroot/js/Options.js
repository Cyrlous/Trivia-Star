document.getElementById('catButton').onclick = () => 
{
  const modal = document.getElementById('catModal');
  modal.style.display = 'flex';
  requestAnimationFrame(() => 
  {
    modal.classList.add('show');
  });
};

document.getElementById('difButton').onclick = () => 
{
  const modal = document.getElementById('difModal');
  modal.style.display = 'flex';
  requestAnimationFrame(() => 
  {
    modal.classList.add('show');
  });
};

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

function checkIfReadyToPlay()
{
  const playButton = document.getElementById('playButton');
  if (selectedCategory && selectedDifficulty)
  {
    playButton.disabled = false;
    playButton.style.opacity = 1;
    playButton.style.pointerEvents = 'auto';
  }
  else
  {
    playButton.disabled = true;
    playButton.style.opacity = 0.5;
    playButton.style.pointerEvents = 'none';
  }
}

let selectedCategory = null;
let selectedDifficulty = null;

const categoryMap = {
  "Geography": 22,
  "History": 23,
  "The Arts": 25,
  "Entertainment": 11,
  "Sports": 21,
  "Science": 17
};

document.querySelectorAll('#catModal .option').forEach(button => 
{
  button.onclick = () => 
  {
    const selectedText = button.textContent;
    selectedCategory = categoryMap[selectedText];
    const selectedStyle = window.getComputedStyle(button).background;
    const mainButton = document.getElementById('catButton');
    
    mainButton.textContent = selectedText;
    mainButton.style.background = selectedStyle;
    
    closeModal('catModal');
    checkIfReadyToPlay();
  }
});

document.querySelectorAll('#difModal .option').forEach(button =>
{
  button.onclick = () =>
  {
    const selectedText = button.textContent.toLowerCase();
    selectedDifficulty = selectedText
    const selectedStyle = window.getComputedStyle(button).background;
    const mainButton = document.getElementById('difButton');
    
    mainButton.textContent = button.textContent;
    mainButton.style.background = selectedStyle;
    
    closeModal('difModal');
    checkIfReadyToPlay();
  }
});

document.getElementById('playButton').onclick = () =>
{  
  const url = `/Game/Start?category=${selectedCategory}&difficulty=${selectedDifficulty}`;
  window.location.href = url;
};