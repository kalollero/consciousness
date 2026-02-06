// VARIABLES PARA EL CARRUSEL
let currentImages = [];
let currentIndex = 0;

// VARIABLES PARA EL SWIPE
let touchStartX = 0;
let touchEndX = 0;

// 2. LÓGICA DEL MODAL
function openModal(src, type) {
    const modal = document.getElementById("mediaModal");
    const body = document.getElementById("modalBody");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    modal.style.display = "flex";
    body.innerHTML = "";

    if (type === 'video') {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        body.innerHTML = `<video src="${src}" controls autoplay style="width:100%"></video>`;
    }
    else if (type === 'image') {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        body.innerHTML = `<img src="${src}" style="width:100%; border-radius:10px;">`;
    }
    else if (type === 'carousel') {
        currentImages = src;
        currentIndex = 0;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        updateCarousel();
    }

    // BLOQUEAR SCROLL
    document.body.classList.add('modal-open');
}

// 3. ACTUALIZAR IMAGEN DEL CARRUSEL
function updateCarousel() {
    const body = document.getElementById("modalBody");

    // Al reescribir el innerHTML, el navegador aplica la clase .fade-anim de nuevo
    body.innerHTML = `
        <img src="${currentImages[currentIndex]}" 
             class="fade-anim" 
             style="width:100%; border-radius:10px; display: block;">
        
        <div style="color:white; text-align:center; margin-top:15px; font-family: sans-serif;">
            ${currentIndex + 1} / ${currentImages.length}
        </div>
    `;
}

// 4. CAMBIAR SLIDE (FLECHAS Y SWIPE)
function changeSlide(direction) {
    if (currentImages.length === 0) return; // Seguridad si no hay imágenes
    currentIndex += direction;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateCarousel();
}

// 5. CERRAR MODAL
function closeModal() {
    const modal = document.getElementById("mediaModal");
    const body = document.getElementById("modalBody");
    modal.style.display = "none";
    body.innerHTML = "";
    document.body.classList.remove('modal-open');
    currentImages = []; // Limpiamos el array
}

// 6. LISTENERS PARA SWIPE (Dedo en móvil)
const bodyDelModal = document.getElementById("modalBody");

bodyDelModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

bodyDelModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const distanciaMinima = 60;
    // Si desliza a la izquierda, va al siguiente (1)
    if (touchEndX < touchStartX - distanciaMinima) {
        changeSlide(1);
    }
    // Si desliza a la derecha, va al anterior (-1)
    if (touchEndX > touchStartX + distanciaMinima) {
        changeSlide(-1);
    }
}, { passive: true });

// 7. CERRAR CON TECLA ESCAPE
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});