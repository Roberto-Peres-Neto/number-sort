const drawBtn = document.getElementById('drawBtn');
const drawAgainBtn = document.getElementById('drawAgain');
const resultsDiv = document.getElementById('results');

drawBtn.addEventListener('click', () => {
  const qtd = parseInt(document.getElementById('qtd').value);
  const min = parseInt(document.getElementById('min').value);
  const max = parseInt(document.getElementById('max').value);
  const noRepeat = document.getElementById('noRepeat').checked;

  if (isNaN(qtd) || isNaN(min) || isNaN(max) || min >= max || qtd < 1) {
      alert("Verifique os valores informados!");
      return;
    }
    
    const range = [];
    for (let i = min; i <= max; i++) {
        range.push(i);
    }
    
    const results = [];
    while (results.length < qtd) {
        const rand = Math.floor(Math.random() * range.length);
        const value = range[rand];
        if (noRepeat) {
            range.splice(rand, 1); // remove para não repetir
        }
        results.push(value);
    }
    
    showResults(results);
});
const audio = new Audio('blip.mp3');

function playSound() {
  audio.currentTime = 0;
  audio.play();
}

function showResults(numbers) {
    resultsDiv.innerHTML = '';
    numbers.forEach((n, i) => {
      setTimeout(() => {
        playSound()
        const el = document.createElement('div');
        el.className = 'number';
        el.textContent = n;
        resultsDiv.appendChild(el);
      }, i * 300);
    });
  
    saveToHistory(numbers); // salva no histórico
    drawAgainBtn.classList.remove('hidden');
  }
  

drawAgainBtn.addEventListener('click', () => {
  resultsDiv.innerHTML = '';
  drawAgainBtn.classList.add('hidden');
});

function saveToHistory(numbers) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.unshift(numbers); // adiciona no início
    localStorage.setItem('history', JSON.stringify(history.slice(0, 5))); // mantém os 5 últimos
    renderHistory();
  }
  
  function renderHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyDiv = document.getElementById('history');
    if (!history.length) {
      historyDiv.innerHTML = '';
      return;
    }
  
    historyDiv.innerHTML = '<h3>Histórico dos Sorteios</h3>';
    history.forEach((entry, i) => {
      const p = document.createElement('p');
      p.textContent = `${i + 1}º: ${entry.join(', ')}`;
      historyDiv.appendChild(p);
    });
  }

  renderHistory(); // carrega o histórico ao iniciar
