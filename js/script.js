(function(){
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const parallaxCard = document.getElementById('parallaxCard');

  /* header shadow on scroll */
  function onScroll(){
    header.classList.toggle('scrolled', window.scrollY > 12);
    updateActiveLink();
    parallax();
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile nav toggle */
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* active link highlight */
  function updateActiveLink(){
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 130 && rect.bottom >= 130) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* light parallax on hero art */
  function parallax(){
    if (!parallaxCard) return;
    const y = window.scrollY;
    if (y < 900){
      parallaxCard.style.transform = 'translateY(' + (y * 0.06) + 'px)';
    }
  }

  /* reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));

  /* modals */
  const modalButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close]');
  let lastFocused = null;

  function openModal(id){
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(modal){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal')));
  });
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
  });

  updateActiveLink();
})();