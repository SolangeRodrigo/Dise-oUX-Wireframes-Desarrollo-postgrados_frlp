
  function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(id).classList.add('active');
  }

  function switchTabByName(id) {
    const panels = { 'tab-inscripcion': 0, 'tab-legajo': 1, 'tab-workflow': 2, 'tab-docs': 3 };
    const tabs = document.querySelectorAll('.tab');
    const idx = panels[id];
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tabs[idx].classList.add('active');
    document.getElementById(id).classList.add('active');
  }

  function filterTable(q) {
    const rows = document.querySelectorAll('#inscripcion-tbody tr');
    rows.forEach(r => {
      r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
    });
  }

  function openModal() { document.getElementById('modal').classList.add('open'); }
  function closeModal() { document.getElementById('modal').classList.remove('open'); }
  function closeModalOutside(e) { if (e.target.id === 'modal') closeModal(); }

  function submitForm() {
    closeModal();
    showToast('Inscripción creada y workflow iniciado ✓');
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  function selectLegajo(el, initials, name, carrera, id, cohorte, estado) {
    document.querySelectorAll('.legajo-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('legajo-avatar').textContent = initials;
    document.getElementById('legajo-name').textContent = name;
    document.getElementById('legajo-id').textContent = 'Legajo #' + id;
    document.getElementById('legajo-carrera').textContent = carrera;
    document.getElementById('legajo-cohorte').textContent = cohorte;
    document.getElementById('legajo-estado').textContent = estado;
  }
  function toggleTheme() {
  document.body.classList.toggle('dark');

  const btn = document.getElementById('themeBtn');

  if (document.body.classList.contains('dark')) {
    btn.innerHTML = '☀️ Claro';
    localStorage.setItem('theme', 'dark');
  } else {
    btn.innerHTML = '🌙 Oscuro';
    localStorage.setItem('theme', 'light');
  }
}
window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');

  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('themeBtn').innerHTML = '☀️ Claro';
  }
});
