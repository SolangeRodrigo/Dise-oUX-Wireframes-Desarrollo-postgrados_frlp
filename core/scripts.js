
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

  function normalizeText(value) {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s.]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function toggleFilters() {
    const panel = document.getElementById('inscripcionFilters');
    const button = document.getElementById('filterBtn');
    const label = button.querySelector('.tabs-filter-label');
    const isOpen = panel.classList.toggle('open');
    if (label) {
      label.textContent = isOpen ? 'Filtro' : 'Filtro';
    }
    button.setAttribute('aria-expanded', String(isOpen));
  }

  function applyInscripcionFilters() {
    const searchInput = document.getElementById('searchInput');
    const careerFilter = document.getElementById('careerFilter');
    const statusFilter = document.getElementById('statusFilter');
    const cohortFilter = document.getElementById('cohortFilter');
    const dniFilter = document.getElementById('dniFilter');
    const legajoFilter = document.getElementById('legajoFilter');
    const rows = document.querySelectorAll('#inscripcion-tbody tr');

    const searchValue = normalizeText(searchInput ? searchInput.value : '');
    const careerValue = careerFilter ? careerFilter.value : 'all';
    const statusValue = statusFilter ? statusFilter.value : 'all';
    const cohortValue = cohortFilter ? cohortFilter.value : 'all';
    const dniValue = normalizeText(dniFilter ? dniFilter.value : '');
    const legajoValue = normalizeText(legajoFilter ? legajoFilter.value : '');

    rows.forEach(row => {
      const rowText = normalizeText(row.textContent);
      const rowCareer = normalizeText(row.querySelector('td:nth-child(2)')?.textContent);
      const rowStatus = normalizeText(row.querySelector('.chip')?.textContent);
      const rowCohort = normalizeText(row.dataset.cohorte);
      const rowDni = normalizeText(row.dataset.dni);
      const rowLegajo = normalizeText(row.dataset.legajo);

      const matchesSearch = !searchValue || rowText.includes(searchValue);
      const matchesCareer = careerValue === 'all' || rowCareer.includes(normalizeText(careerValue));
      const matchesStatus = statusValue === 'all' || rowStatus.includes(normalizeText(statusValue));
      const matchesCohort = cohortValue === 'all' || rowCohort.includes(normalizeText(cohortValue));
      const matchesDni = !dniValue || rowDni.includes(dniValue);
      const matchesLegajo = !legajoValue || rowLegajo.includes(legajoValue);

      row.style.display = matchesSearch && matchesCareer && matchesStatus && matchesCohort && matchesDni && matchesLegajo ? '' : 'none';
    });
  }

  function filterTable(q) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = q;
    }
    applyInscripcionFilters();
  }

  function clearInscripcionFilters() {
    const searchInput = document.getElementById('searchInput');
    const careerFilter = document.getElementById('careerFilter');
    const statusFilter = document.getElementById('statusFilter');
    const cohortFilter = document.getElementById('cohortFilter');
    const dniFilter = document.getElementById('dniFilter');
    const legajoFilter = document.getElementById('legajoFilter');

    if (searchInput) searchInput.value = '';
    if (careerFilter) careerFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    if (cohortFilter) cohortFilter.value = 'all';
    if (dniFilter) dniFilter.value = '';
    if (legajoFilter) legajoFilter.value = '';

    applyInscripcionFilters();
  }

  function validateDniField(input) {
    const error = document.getElementById('dniError');
    const value = input.value;
    const hasLetters = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(value);
    const invalidChars = /[^0-9.\s-]/.test(value);

    if (!value) {
      input.classList.remove('input-invalid');
      if (error) error.textContent = '';
      return true;
    }

    if (hasLetters || invalidChars) {
      input.classList.add('input-invalid');
      if (error) error.textContent = 'Solo se permiten números en el DNI.';
      return false;
    }

    input.classList.remove('input-invalid');
    if (error) error.textContent = '';
    return true;
  }

  function validateTextField(input, errorId, message) {
    const error = document.getElementById(errorId);
    const value = input.value.trim();
    const hasInvalidChars = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/.test(input.value);

    if (!value) {
      input.classList.remove('input-invalid');
      if (error) error.textContent = '';
      return false;
    }

    if (hasInvalidChars) {
      input.classList.add('input-invalid');
      if (error) error.textContent = message;
      return false;
    }

    input.classList.remove('input-invalid');
    if (error) error.textContent = '';
    return true;
  }

  function validateEmailField(input) {
    const error = document.getElementById('emailError');
    const value = input.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!value) {
      input.classList.remove('input-invalid');
      if (error) error.textContent = '';
      return false;
    }

    if (!emailOk) {
      input.classList.add('input-invalid');
      if (error) error.textContent = 'Ingresá un correo válido, por ejemplo alumno@mail.com.';
      return false;
    }

    input.classList.remove('input-invalid');
    if (error) error.textContent = '';
    return true;
  }

  function openModal() { document.getElementById('modal').classList.add('open'); }
  function closeModal() { document.getElementById('modal').classList.remove('open'); }
  function closeModalOutside(e) { if (e.target.id === 'modal') closeModal(); }

  function submitForm() {
    const nameInput = document.getElementById('nameInput');
    const surnameInput = document.getElementById('surnameInput');
    const dniInput = document.getElementById('dniInput');
    const emailInput = document.getElementById('emailInput');

    const nameOk = !nameInput || validateTextField(nameInput, 'nameError', 'Solo se permiten letras en el nombre.');
    const surnameOk = !surnameInput || validateTextField(surnameInput, 'surnameError', 'Solo se permiten letras en el apellido.');
    const dniOk = !dniInput || validateDniField(dniInput);
    const emailOk = !emailInput || validateEmailField(emailInput);

    if (!nameOk || !surnameOk || !dniOk || !emailOk) {
      showToast('Corregí los campos marcados en rojo antes de crear la inscripción');
      return;
    }

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
  const label = btn ? btn.querySelector('.theme-toggle-label') : null;

  if (document.body.classList.contains('dark')) {
    if (label) label.textContent = 'Modo claro';
    localStorage.setItem('theme', 'dark');
  } else {
    if (label) label.textContent = 'Modo oscuro';
    localStorage.setItem('theme', 'light');
  }
}
window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  const btn = document.getElementById('themeBtn');
  const label = btn ? btn.querySelector('.theme-toggle-label') : null;

  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (label) label.textContent = 'Modo claro';
  }

  applyInscripcionFilters();
});
