document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones de pregunta y las respuestas
    const questionButtons = document.querySelectorAll('.proyect-btn');
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
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
        if (e.key === 'Escape' && document.getElementById('imageModal').classList.contains('active')) {
            closeModal();
        }
    });
});
