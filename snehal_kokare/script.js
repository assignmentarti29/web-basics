// reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
reveals.forEach(r => io.observe(r));

// modal for project view
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
document.querySelectorAll('.project button').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const title = btn.getAttribute('data-title') || btn.closest('.project').querySelector('h3').innerText;
    const desc = btn.getAttribute('data-desc') || btn.closest('.project').querySelector('p').innerText;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});
document.getElementById('modalClose')?.addEventListener('click', ()=>{
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
});
modal?.addEventListener('click', e=> { if(e.target===modal){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true') } });

// contact form demo
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sent!';
  btn.disabled = true;
  setTimeout(()=> { btn.textContent = original; btn.disabled=false; e.target.reset(); }, 1500);
});
