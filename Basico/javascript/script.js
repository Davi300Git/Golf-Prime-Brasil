// script.js - comportamento simples: contador, modal e formulários
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano no rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // Configurar data alvo do lançamento (ex: daqui a 30 dias)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  // Elementos do contador
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown(){
    const now = new Date();
    const diff = launchDate - now;
    if(diff <= 0){
      daysEl.textContent = '00'; hoursEl.textContent='00'; minutesEl.textContent='00'; secondsEl.textContent='00';
      clearInterval(timerInterval);
      return;
    }
    const s = Math.floor(diff/1000) % 60;
    const m = Math.floor(diff/1000/60) % 60;
    const h = Math.floor(diff/1000/3600) % 24;
    const d = Math.floor(diff/1000/3600/24);
    daysEl.textContent = String(d).padStart(2,'0');
    hoursEl.textContent = String(h).padStart(2,'0');
    minutesEl.textContent = String(m).padStart(2,'0');
    secondsEl.textContent = String(s).padStart(2,'0');
  }
  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // Modal de inscrição
  const modal = document.getElementById('modal');
  const notifyBtn = document.getElementById('notifyBtn');
  const modalClose = document.getElementById('modalClose');
  const notifyForm = document.getElementById('notifyForm');

  function openModal(){ modal.setAttribute('aria-hidden','false'); document.getElementById('email').focus(); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  // Inicializa carousels com crossfade e loop (cada .carousel na página)
  (function initCarousels(){
    try {
      const carousels = document.querySelectorAll('.carousel');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const defaultInterval = prefersReduced ? 7000 : 4500;

      if (!carousels || carousels.length === 0) {
        console.info('No carousels found');
        return;
      }

      carousels.forEach((carousel, ci) => {
        const slides = Array.from(carousel.querySelectorAll('img'));
        if (slides.length === 0) return;

        let current = 0;

        slides.forEach((s, i) => {
          s.classList.remove('active');
          s.setAttribute('aria-hidden', 'true');
          if (i === 0) {
            s.classList.add('active');
            s.setAttribute('aria-hidden', 'false');
          }
        });

        // sempre anima, apenas ajusta intervalo se o usuário preferir redução
        setInterval(() => {
          slides[current].classList.remove('active');
          slides[current].setAttribute('aria-hidden', 'true');
          current = (current + 1) % slides.length;
          slides[current].classList.add('active');
          slides[current].setAttribute('aria-hidden', 'false');
        }, defaultInterval);

        console.info(`Carousel ${ci} initialized with ${slides.length} slides`);
      });
    } catch (err) {
      console.error('Error initializing carousels', err);
    }
  })();

  notifyBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  notifyForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if(!email) return;
    // Em produção, aqui faria fetch para a API. Por enquanto, apenas feedback.
    alert('Obrigado! Avisaremos em ' + email);
    notifyForm.reset();
    closeModal();
  });

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Animação suave de entrada
  requestAnimationFrame(()=>document.body.style.opacity = 1);
});
