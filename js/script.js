
// Abrir Modal con contenido
function openModal(src, type) {
    const modal = document.getElementById("mediaModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = type === 'video'
        ? `<video src="${src}" controls autoplay style="width:100%; max-height:80vh;"></video>`
        : `<img src="${src}" style="width:100%; max-height:80vh; object-fit:contain;">`;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("mediaModal").style.display = "none";
    document.getElementById("modalBody").innerHTML = ""; // Limpiar para detener video
}