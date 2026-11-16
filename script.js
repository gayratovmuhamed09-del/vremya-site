/* ===== Часы-обратный отсчёт ===== */
(function () {
  const el = document.getElementById('clock');
  const note = document.getElementById('clockNote');
  const btn = document.getElementById('addTime');
  let left = 60;

  const pad = (n) => String(n).padStart(2, '0');
  function show() {
    const h = Math.floor(left / 3600);
    const m = Math.floor((left % 3600) / 60);
    const s = left % 60;
    el.textContent = `00:00:${pad(h)}:${pad(m)}:${pad(s)}`.replace('00:00:', '00:');
    el.classList.toggle('low', left <= 10);
    if (left === 0) note.textContent = 'Время вышло. В фильме это значит конец. Добавь минуту, чтобы продолжить.';
    else if (left <= 10) note.textContent = 'Последние секунды. Бежать пора было раньше.';
    else note.textContent = 'Осталась минута. Вся история фильма разворачивается на таких минутах.';
  }
  setInterval(() => { if (left > 0) { left--; show(); } }, 1000);
  btn.addEventListener('click', () => { left += 60; show(); });
  show();
})();

/* ===== Калькулятор времени ===== */
(function () {
  const h = document.getElementById('hours');
  const y = document.getElementById('years');
  const out = document.getElementById('result');
  function calc() {
    const hours = Math.max(0, Math.min(24, parseFloat(h.value) || 0));
    const years = Math.max(1, Math.min(80, parseFloat(y.value) || 1));
    const total = hours * 365 * years;
    const fullYears = (total / 24 / 365).toFixed(1);
    const days = Math.round(total / 24);
    out.textContent = `За ${years} лет это ${Math.round(total).toLocaleString('ru-RU')} часов, то есть ${days.toLocaleString('ru-RU')} суток или ${fullYears} года жизни. Стоит ли оно того?`;
  }
  h.addEventListener('input', calc);
  y.addEventListener('input', calc);
  calc();
})();
