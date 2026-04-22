// ===== SCROLL DOS STORIES =====
function scrollStories(dir) {
  const list = document.getElementById('storiesList');
  if (!list) return;

  const story = list.querySelector('.story');
  if (!story) return;

  const style = getComputedStyle(list);
  const gap = parseInt(style.gap) || 0;

  const storyWidth = story.offsetWidth + gap;

  // Quantos stories cabem na tela
  const visibleCount = Math.floor(list.clientWidth / storyWidth) || 6;

  // Distância do scroll
  const scrollAmount = storyWidth * visibleCount;

  // Scroll suave
  list.scrollBy({
    left: dir * scrollAmount,
    behavior: 'smooth'
  });

  // Atualiza setas depois do movimento
  setTimeout(updateStoryArrows, 400);
}


// ===== ATUALIZA SETAS DOS STORIES =====
function updateStoryArrows() {
  const list = document.getElementById('storiesList');
  const prevBtn = document.querySelector('.story-arrow--prev');
  const nextBtn = document.querySelector('.story-arrow--next');

  if (!list || !prevBtn || !nextBtn) return;

  const atStart = list.scrollLeft <= 5;
  const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 5;

  // Botão esquerdo
  prevBtn.style.opacity = atStart ? '0' : '1';
  prevBtn.style.pointerEvents = atStart ? 'none' : 'auto';

  // Botão direito
  nextBtn.style.opacity = atEnd ? '0' : '1';
  nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
}


// ===== CARROSSEL =====
function moveCarousel(id, dir) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const counter = carousel.querySelector('.carousel-counter');
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');

  const total = slides.length;

  let current = parseInt(track.dataset.current || '0');

  // Limita entre 0 e total-1
  current = Math.max(0, Math.min(total - 1, current + dir));

  track.dataset.current = current;

  // Move o carrossel
  track.style.transform = `translateX(-${current * 100}%)`;

  // Atualiza bolinhas
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  // Atualiza contador
  if (counter) counter.textContent = `${current + 1} / ${total}`;

  // Mostra/esconde botões
  if (prevBtn) prevBtn.classList.toggle('hidden', current === 0);
  if (nextBtn) nextBtn.classList.toggle('hidden', current === total - 1);
}


// ===== QUANDO A PÁGINA CARREGA =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== STORIES =====
  const list = document.getElementById('storiesList');

  if (list) {
    updateStoryArrows();

    // Atualiza ao rolar
    list.addEventListener('scroll', updateStoryArrows);

    // Atualiza ao redimensionar
    window.addEventListener('resize', updateStoryArrows);
  }

  // ===== CARROSSEL =====
  document.querySelectorAll('.carousel').forEach(carousel => {

    const prevBtn = carousel.querySelector('.carousel-btn--prev');

    // Esconde botão esquerdo no início
    if (prevBtn) prevBtn.classList.add('hidden');

    // ===== SWIPE (ARRASTAR NO CELULAR) =====
    let startX = 0;

    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;

      // Se arrastou o suficiente
      if (Math.abs(diff) > 40) {
        moveCarousel(carousel.id, diff > 0 ? 1 : -1);
      }
    });

  });

});