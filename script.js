/**
 * Clase para manejar la reproducción de audio.
 * Encapsula el manejo de errores de autoplay.
 */
class MusicPlayer {
    constructor(audioId) {
        this.audio = document.getElementById(audioId);
        // Bajamos el volumen al 40% para que no asuste
        if(this.audio) {
            this.audio.volume = 0.4; 
        }
    }

    play() {
        if (!this.audio) return;

        // Intentamos reproducir
        this.audio.play().catch(error => {
            console.warn("El navegador bloqueó el autoplay. Se requiere interacción previa.", error);
        });
    }

    pause() {
        if (this.audio) this.audio.pause();
    }
}

/**
 * Clase para manejar efectos de fondo animados.
 * Genera elementos DOM dinámicamente y les asigna propiedades aleatorias.
 */
class BackgroundManager {
    constructor(containerId, count = 30) {
        this.container = document.getElementById(containerId);
        this.count = count; // Cantidad de corazones
        this._init();
    }

    _init() {
        // Generamos 'count' número de corazones
        for (let i = 0; i < this.count; i++) {
            this.createHeart();
        }
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        // Usamos un carácter Unicode de corazón
        heart.innerHTML = '❤';

        // --- Aleatorización de propiedades ---
        
        // Posición horizontal aleatoria (0% a 100%)
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamaño aleatorio (entre 10px y 35px aprox)
        const size = Math.random() * 25 + 10;
        heart.style.fontSize = size + 'px';

        // Duración de la animación aleatoria (entre 8s y 20s)
        // Los más rápidos dan sensación de profundidad.
        const duration = Math.random() * 12 + 8;
        heart.style.animationDuration = duration + 's';

        // Retraso inicial aleatorio para que no empiecen todos a la vez (entre 0s y 10s)
        heart.style.animationDelay = Math.random() * 5 + 's';

        // Añadir al contenedor
        this.container.appendChild(heart);
    }
}


/**
 * Clase reutilizable para manejar ventanas modales.
 * Sigue el principio de Responsabilidad Única.
 */
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.messageElement = this.modal.querySelector('#modalMessage');
        this.closeBtn = this.modal.querySelector('.close-btn');

        this._init();
    }

    _init() {
        // Cerrar al hacer clic en la X
        this.closeBtn.addEventListener('click', () => this.hide());

        // Cerrar al hacer clic fuera del contenido del modal
        window.addEventListener('click', (e) => {
            if (e.target == this.modal) {
                this.hide();
            }
        });
    }

    /**
     * Muestra el modal con un mensaje personalizado.
     * @param {string} message - El texto a mostrar.
     */
    show(message) {
        this.messageElement.textContent = message;
        this.modal.classList.add('show');
    }

    hide() {
        this.modal.classList.remove('show');
    }
}

/**
 * Clase principal de la Propuesta.
 */
class ValentineProposal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.btnYes = this.container.querySelector('.btn-yes');
        this.btnNo = this.container.querySelector('.btn-no');
        this.isOpen = false;
        
        this.modal = new Modal('responseModal');
        // Instanciamos el reproductor
        this.music = new MusicPlayer('bgMusic');

        this._init();
    }

    _init() {
        // Al hacer clic en el sobre, abrimos Y reproducimos música
        this.container.addEventListener('click', () => {
            this.openEnvelope();
            this.music.play(); // <--- AQUÍ DISPARAMOS LA MÚSICA
        });

        this.btnYes.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleYesAction();
        });

        this.btnNo.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleNoAction();
        });
    }

    openEnvelope() {
        if (!this.isOpen) {
            this.container.classList.add('open');
            this.isOpen = true;
        }
    }

    handleYesAction() {
        this.modal.show("Gracias por aceptar, te adoro con todo mi corazoncito, vayamos eligiendo el lugar para comeeeer 😸🩶");
        // Opcional: Subir el volumen cuando diga que sí
        if(this.music.audio) this.music.audio.volume = 0.8; 
    }

    handleNoAction() {
        this.modal.show("Error crítico, fatal e inaceptable: No se acepta un 'No' como respuesta. 😾");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Instanciamos el gestor de fondo
    new BackgroundManager('bg-animation-container', 40); // Probemos con 40 corazones

    // Instanciamos la propuesta principal
    new ValentineProposal('valentineProposal');
});