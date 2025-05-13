let history = [];

function append(val) {
  playSound();
  document.getElementById('display').value += val;
}

function clearDisplay() {
  playSound();
  document.getElementById('display').value = '';
}

function backspace() {
  playSound();
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function squareRoot() {
  playSound();
  const display = document.getElementById('display');
  const value = parseFloat(display.value);
  if (!isNaN(value)) {
    const result = Math.sqrt(value);
    display.value = result;
    history.push(`√${value} = ${result}`);
    updateHistory();
  }
}

function calculate() {
  playSound();
  try {
    const expr = document.getElementById('display').value;
    const result = eval(expr.replace('%', '/100'));
    document.getElementById('display').value = result;
    history.push(`${expr} = ${result}`);
    updateHistory();
  } catch {
    document.getElementById('display').value = 'Error';
  }
}

function updateHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = history.slice(-5).map(h => `<p>${h}</p>`).join('');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function playSound() {
  const click = document.getElementById('clickSound');
  click.currentTime = 0;
  click.play();
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if ("0123456789.+-*/%".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
