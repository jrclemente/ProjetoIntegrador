// SLIDER DE IMAGEM
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervaloId = null;

//iniciarSlider();
document.addEventListener("DOMContentLoaded", iniciarSlider);

function iniciarSlider() {
    if(slides.length > 0) {
        slides[slideIndex].classList.add("mostrarSlide");
        intervaloId = setInterval(slidePoste, 5000);
    }
    
}
function mostrarSlide(index) {
    if(index >= slides.length) {
        slideIndex = 0;
    }
    else if(index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("mostrarSlide");
    })
    slides[slideIndex].classList.add("mostrarSlide");
}
function slideAnte() {
    clearInterval(intervaloId); // Temporizador de intervalo é interrompido
    slideIndex--;
    mostrarSlide(slideIndex);
}
function slidePoste() {
    slideIndex++;
    mostrarSlide(slideIndex);
}