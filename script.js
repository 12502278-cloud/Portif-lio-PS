
  var themeToggle = document.getElementById('themeToggle');
  var htmlEl = document.documentElement;

  var themeIcon = document.getElementById('themeIcon');

  function updateToggleIcon() {
    var temaAtual = htmlEl.getAttribute('data-theme');

    if (temaAtual === 'dark') {
      themeIcon.src = 'sol.png';    
    } else {
      themeIcon.src = 'lua-crescente.png'; 
    }
  }
  updateToggleIcon();

  themeToggle.addEventListener('click', function () {
    var isDark = htmlEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      htmlEl.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
    updateToggleIcon();
  });

  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var roles = [
    'Estudante de Tecnologia',
    'Professora de Informática',
    'Apaixonada por aprendizado'
  ];
  var roleLine = document.getElementById('roleLine');
  var roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    var current = roles[roleIndex];
    var visibleText = deleting ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);
    roleLine.innerHTML = visibleText + '<span class="cursor">&nbsp;</span>';
    charIndex = deleting ? charIndex - 1 : charIndex + 1;

    var delay = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      delay = 1400; 
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  var revealItems = document.querySelectorAll('[data-reveal]');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (item) { observer.observe(item); });

  var telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function (e) {
    var digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    var formatted = digits;
    if (digits.length > 10) {
      formatted = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (digits.length > 6) {
      formatted = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (digits.length > 2) {
      formatted = digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (digits.length > 0) {
      formatted = digits.replace(/(\d{0,2})/, '($1');
    }
    e.target.value = formatted;
  });

  var form = document.getElementById('contactForm');
  var modalOverlay = document.getElementById('modalOverlay');
  var modalClose = document.getElementById('modalClose');

  function showError(fieldId, message) {
    document.getElementById('err-' + fieldId).textContent = message;
  }
  function clearErrors() {
    form.querySelectorAll('.error').forEach(function (el) { el.textContent = ''; });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var nome = document.getElementById('nome').value.trim();
    var telefone = document.getElementById('telefone').value.trim();
    var email = document.getElementById('email').value.trim();
    var mensagem = document.getElementById('mensagem').value.trim();
    var valid = true;

    if (nome.length < 3) { showError('nome', 'Digite seu nome completo.'); valid = false; }
    if (telefone.replace(/\D/g, '').length < 10) { showError('telefone', 'Telefone incompleto.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'E-mail inválido.'); valid = false; }
    if (mensagem.length < 5) { showError('mensagem', 'Escreva uma mensagem um pouco maior.'); valid = false; }

    if (!valid) return;

    modalOverlay.classList.add('is-open');
    form.reset();
  });

  modalClose.addEventListener('click', function () {
    modalOverlay.classList.remove('is-open');
  });
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) modalOverlay.classList.remove('is-open');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') modalOverlay.classList.remove('is-open');
  });

  var barra = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    var rolado = window.scrollY;
    var alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    var porcentagem = (rolado / alturaTotal) * 100;

    barra.style.width = porcentagem + '%';
  });

  var cards = document.querySelectorAll('.project-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (evento) {
    
      var posicaoCard = card.getBoundingClientRect();

      
      var x = evento.clientX - posicaoCard.left;
      var y = evento.clientY - posicaoCard.top;

     
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });
