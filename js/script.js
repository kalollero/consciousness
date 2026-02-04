// VARIABLES PARA EL CARRUSEL
let currentImages = [];
let currentIndex = 0;


// 2. LÓGICA DEL MODAL (IMAGEN, VIDEO Y CARRUSEL)
function openModal(src, type) {
    const modal = document.getElementById("mediaModal");
    const body = document.getElementById("modalBody");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    modal.style.display = "flex";
    body.innerHTML = ""; // Limpiar contenido previo

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
        // Aquí 'src' debe ser un array: ['img1.jpg', 'img2.jpg']
        currentImages = src;
        currentIndex = 0;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        updateCarousel();
    }
}

// 3. ACTUALIZAR IMAGEN DEL CARRUSEL
function updateCarousel() {
    const body = document.getElementById("modalBody");
    body.innerHTML = `
        <img src="${currentImages[currentIndex]}" style="width:100%; border-radius:10px; animation: fadeIn 0.3s">
        <div style="color:white; text-align:center; margin-top:10px;">
            ${currentIndex + 1} / ${currentImages.length}
        </div>
    `;
}

// 4. CAMBIAR SLIDE (FLECHAS)
function changeSlide(direction) {
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
    body.innerHTML = ""; // Detiene videos al cerrar
}

// 6. CERRAR CON TECLA ESCAPE
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});