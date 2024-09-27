// Preguntas de ejemplo
const preguntas = [
    { pregunta: "¿Cuál es la capital de Francia?", respuestas: ["Berlín", "Madrid", "París", "Roma"], correcta: 2 },
    { pregunta: "¿Cuál es la capital de España?", respuestas: ["Lisboa", "Madrid", "París", "Roma"], correcta: 1 },
    { pregunta: "¿Cuál es el océano más grande?", respuestas: ["Atlántico", "Pacífico", "Índico", "Ártico"], correcta: 1 },
    { pregunta: "¿Cuántos continentes hay?", respuestas: ["5", "6", "7", "8"], correcta: 2 }
];

// Variables de estado
let puntaje = 0;
let tiempo = 30;
let intervalo;
let usadas50 = false;
let cambiadaPregunta = false;
let ayudaUsada = false;

// Iniciar el juego al cargar
document.addEventListener('DOMContentLoaded', () => {
    iniciarJuego();
});

function iniciarJuego() {
    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarPregunta() {
    const preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)];
    document.getElementById('pregunta').innerText = preguntaActual.pregunta;

    const respuestasContainer = document.getElementById('respuestas');
    respuestasContainer.innerHTML = '';
    preguntaActual.respuestas.forEach((respuesta, index) => {
        const button = document.createElement('button');
        button.innerText = respuesta;
        button.addEventListener('click', () => verificarRespuesta(index, preguntaActual.correcta));
        respuestasContainer.appendChild(button);
    });
}

function verificarRespuesta(index, correcta) {
    if (index === correcta) {
        puntaje += 10;
        document.getElementById('puntos').innerText = puntaje;
    }
    mostrarPregunta(); // Avanza automáticamente a la siguiente pregunta
}

function iniciarTemporizador() {
    document.getElementById('segundos').innerText = tiempo;
    intervalo = setInterval(() => {
        tiempo--;
        document.getElementById('segundos').innerText = tiempo;
        dibujarTemporizador(tiempo);
        if (tiempo <= 0) {
            clearInterval(intervalo);
            alert("¡Se acabó el tiempo!");
            // O reiniciar el juego o regresar a la página de inicio
            window.location.href = 'index.html'; // Redirigir a la página de inicio
        }
    }, 1000);
}

// Dibuja el temporizador redondo en el canvas
function dibujarTemporizador(tiempoRestante) {
    const canvas = document.getElementById('temporizadorCanvas');
    const ctx = canvas.getContext('2d');
    const tiempoTotal = 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const angulo = (tiempoRestante / tiempoTotal) * 2 * Math.PI;

    // Dibujar fondo del círculo
    ctx.beginPath();
    ctx.arc(50, 50, 45, 0, 2 * Math.PI);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Dibujar progreso del tiempo
    ctx.beginPath();
    ctx.arc(50, 50, 45, -Math.PI / 2, angulo - Math.PI / 2);
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 10;
    ctx.stroke();
}

// Funciones para las opciones de ayuda
document.getElementById('opcion50').addEventListener('click', () => {
    if (!usadas50) {
        // Elimina dos respuestas incorrectas
        usadas50 = true;
        eliminarDosRespuestasIncorrectas();
    }
});

document.getElementById('cambiarPregunta').addEventListener('click', () => {
    if (!cambiadaPregunta) {
        mostrarPregunta();
        cambiadaPregunta = true;
    }
});

document.getElementById('ayuda').addEventListener('click', () => {
    if (!ayudaUsada) {
        // Responde automáticamente la pregunta correcta
        ayudaUsada = true;
        mostrarPreguntaCorrecta();
    }
});

// Lógica para eliminar dos respuestas incorrectas
function eliminarDosRespuestasIncorrectas() {
    const respuestas = document.getElementById('respuestas').children;
    let incorrectas = [];
    for (let i = 0; i < respuestas.length; i++) {
        if (!respuestas[i].classList.contains('correcta')) {
            incorrectas.push(respuestas[i]);
        }
    }
    // Oculta dos respuestas incorrectas
    incorrectas.slice(0, 2).forEach(respuesta => respuesta.style.display = 'none');
}

// Lógica para mostrar la respuesta correcta en el caso de usar ayuda
function mostrarPreguntaCorrecta() {
    const respuestas = document.// Lógica para mostrar la respuesta correcta en el caso de usar ayuda
function mostrarPreguntaCorrecta() {
    const respuestas = document.getElementById('respuestas').children;
    for (let i = 0; i < respuestas.length; i++) {
        if (i === preguntaActual.correcta) {
            respuestas[i].style.backgroundColor = '#2ecc71'; // Verde para la correcta
        } else {
            respuestas[i].style.backgroundColor = '#e74c3c'; // Rojo para incorrectas
        }
    }
}