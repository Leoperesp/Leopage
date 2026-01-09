document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones de pregunta (solo los que tienen data-question) y las respuestas
    const questionButtons = document.querySelectorAll('.proyect-btn[data-question]');
    const answerContainers = document.querySelectorAll('.answer');

    // Oculta todas las respuestas al cargar la página
    answerContainers.forEach(answer => {
        answer.style.display = 'none';
    });

    // Añade un 'event listener' a cada botón
    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtiene el identificador de la pregunta del atributo 'data-question'
            const questionId = button.getAttribute('data-question');

            // Oculta todas las respuestas de nuevo antes de mostrar la correcta
            answerContainers.forEach(answer => {
                answer.style.display = 'none';
            });

            // Muestra solo la respuesta que coincide con el 'id'
            const targetAnswer = document.querySelector(`.answer[data-answer="${questionId}"]`);
            if (targetAnswer) {
                targetAnswer.style.display = 'block';
            }
        });
    });
});

function toggleDropdown() {
    // Selecciona el elemento del menú desplegable por su ID
    const menu = document.getElementById("menu-desplegable");
    
    // Alterna la clase 'show' para mostrar/ocultar el menú
    menu.classList.toggle("show");
}

// Opcional: Cerrar el menú si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

        // FUNCIÓN PARA EL MODO OSCURO
function toggleTheme() {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');

    // 1. Alternar la clase en el <body>
    body.classList.toggle('dark-mode');

    // 2. Guardar la preferencia del usuario en el almacenamiento local
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '⚪️';
    } else {
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '⚫️';
    }
}

// FUNCIÓN PARA APLICAR EL TEMA AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    const toggleButton = document.getElementById('theme-toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = '⚪️';
    } else {
        toggleButton.textContent = '⚫️';
    }
});

// Funciones para el modal de imágenes
function openModal(imageSrc) {
    // Compatibilidad con llamada antigua: openModal(imageSrc)
    // Buscamos la imagen dentro de la galería para determinar índice y galería
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Intentar establecer la galería activa y el índice actual
    try {
        // Todas las miniaturas de la página
        const thumbs = Array.from(document.querySelectorAll('.image-gallery img'));
        const currentIndex = thumbs.findIndex(img => img.src.endsWith(imageSrc) || img.getAttribute('src') === imageSrc || img.src === (new URL(imageSrc, location.href)).href);
        if (currentIndex !== -1) {
            // Determinar la galería (nodo padre .image-gallery)
            const currentThumb = thumbs[currentIndex];
            const gallery = currentThumb.closest('.image-gallery');
            // Construir lista de src dentro de esa galería
            window.__activeGallery = Array.from(gallery.querySelectorAll('img')).map(i => i.getAttribute('src'));
            window.__activeIndex = Array.from(gallery.querySelectorAll('img')).indexOf(currentThumb);
        } else {
            // Si no se encuentra, reiniciar
            window.__activeGallery = [imageSrc];
            window.__activeIndex = 0;
        }
    } catch (err) {
        window.__activeGallery = [imageSrc];
        window.__activeIndex = 0;
    }

    // Actualizar contador
    updateModalCounter();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para el modal
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar modal al hacer clic fuera de la imagen
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        const modalActive = document.getElementById('imageModal').classList.contains('active');
        if (!modalActive) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
    
    // Botones del modal
    const nextBtn = document.getElementById('modalNextBtn');
    const prevBtn = document.getElementById('modalPrevBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
});

// Funciones para navegar imágenes dentro de la galería activa
function nextImage() {
    const modalImg = document.getElementById('modalImage');
    if (!window.__activeGallery || window.__activeGallery.length === 0) return;
    window.__activeIndex = (window.__activeIndex + 1) % window.__activeGallery.length;
    modalImg.src = window.__activeGallery[window.__activeIndex];
    updateModalCounter();
}

function prevImage() {
    const modalImg = document.getElementById('modalImage');
    if (!window.__activeGallery || window.__activeGallery.length === 0) return;
    window.__activeIndex = (window.__activeIndex - 1 + window.__activeGallery.length) % window.__activeGallery.length;
    modalImg.src = window.__activeGallery[window.__activeIndex];
    updateModalCounter();
}

function updateModalCounter() {
    const counter = document.getElementById('modalCounter');
    if (!counter) return;
    const total = window.__activeGallery ? window.__activeGallery.length : 0;
    const current = (typeof window.__activeIndex === 'number') ? window.__activeIndex + 1 : 0;
    counter.textContent = `${current} / ${total}`;
}
