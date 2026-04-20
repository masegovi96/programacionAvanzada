const preguntas = [
    "Si pudieras dominar cualquier tecnología en una semana, ¿cuál sería y por qué?",
    "¿Cuál ha sido el bug más frustrante que hayas tenido que resolver?",
    "¿Tienes algún proyecto soñado que te gustaría desarrollar algún día?",
    "¿Cómo aprendes mejor: leyendo documentación, viendo videos o practicando directamente?",
    "Si tuvieras que enseñarle algo a alguien en 5 minutos, ¿qué le enseñarías?",
    "¿Cuál fue el primer programa que hiciste y que recuerdas con cariño?",
    "¿Eres más de trabajo en equipo o prefieres trabajar solo/a? ¿Por qué?",
    "Si no hubieras elegido esta carrera, ¿qué otra cosa estarías estudiando?",
    "¿Qué es lo primero que haces cuando tu código no funciona y no entiendes por qué?",
    "¿Cuál es el lenguaje de programación que más disfrutas usar y por qué?",
    "¿Qué app o herramienta usas todos los días y que no podría faltarte?",
    "¿Tienes alguna meta profesional concreta para los próximos 2 años?",
    "¿Qué es lo que más disfrutas del proceso de programar?",
    "¿Qué es lo que menos te gusta de programar pero tienes que hacer igual?",
    "Si pudieras cambiar algo de cómo te enseñaron a programar, ¿qué cambiarías?",
    "¿Hay alguna tecnología que hayas intentado aprender y que simplemente no hayas podido dominar todavía?",
    "¿Qué serie, película o videojuego le recomendarías al profe sin pensarlo dos veces?",
    "¿Dark mode o light mode? Defiende tu elección.",
    "¿Tabs o espacios? ¿Por qué?",
    "¿Qué esperas que sea diferente en esta materia comparado con otras que ya cursaste?"
];

let mostradas = [];

function nuevaPregunta() {
    let disponibles = preguntas
        .map((_, i) => i)
        .filter(i => !mostradas.includes(i));

    if (disponibles.length === 0) {
        mostradas = [];
        disponibles = preguntas.map((_, i) => i);
    }

    const idx = disponibles[Math.floor(Math.random() * disponibles.length)];
    mostradas.push(idx);

    const el = document.getElementById('preguntaDisplay');
    el.classList.remove('animar');
    void el.offsetWidth; // fuerza reflow para reiniciar la animación
    el.textContent = preguntas[idx];
    el.classList.add('animar');
}
