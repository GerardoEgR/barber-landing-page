
interface Imagen {
  src: string;
  alt: string;
}

// Helper para obtener elementos con seguridad
function getEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Elemento #${id} no encontrado`);
  }
  return el as T;
}

// Estado
let currentIndex: number = 0;

// DOM
const gallery = getEl<HTMLDivElement>('gallery');
const lightbox = getEl<HTMLDivElement>('lightbox');
const lightboxImg = getEl<HTMLImageElement>('lightboxImg');
const lightboxCaption = getEl<HTMLParagraphElement>('lightboxCaption');
const closeBtn = getEl<HTMLButtonElement>('closeBtn');
const prevBtn = getEl<HTMLButtonElement>('prevBtn');
const nextBtn = getEl<HTMLButtonElement>('nextBtn');

// Datos desde Astro
const imagenes: Imagen[] = JSON.parse(
  gallery.dataset.imagenes ?? '[]'
);

// Abrir lightbox
function openLightbox(index: number): void {
  currentIndex = index;
  const imagen = imagenes[currentIndex];

  lightboxImg.src = imagen.src;
  lightboxImg.alt = imagen.alt;
  lightboxCaption.textContent = imagen.alt;

  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Cerrar lightbox
function closeLightbox(): void {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

// Navegación
function showPrev(): void {
  currentIndex =
    (currentIndex - 1 + imagenes.length) % imagenes.length;
  openLightbox(currentIndex);
}

function showNext(): void {
  currentIndex =
    (currentIndex + 1) % imagenes.length;
  openLightbox(currentIndex);
}

// Click en imágenes
gallery
  .querySelectorAll<HTMLImageElement>('img')
  .forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

// Botones
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Click fuera
lightbox.addEventListener('click', (e: MouseEvent) => {
  if (e.target === lightbox) closeLightbox();
});

// Teclado
window.addEventListener('keydown', (e: KeyboardEvent) => {
  if (lightbox.classList.contains('hidden')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});
