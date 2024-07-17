"use strict";

const modal = document.querySelector('dialog');
const button = document.querySelector('button');

let titulo,
    mensagem,
    tipoMens;

const buttonClose = document.querySelector('dialog button');

if ((button != null) && (typeof button != "undefined")) {
    button.onclick = function () {
        modal.style.display = 'flex';
        modal.showModal();
    }
}

if ((buttonClose != null) && (typeof buttonClose != "undefined")) {
    buttonClose.onclick = function () {
        modal.close();
        modal.style.display = 'none';
    }
}

window.addEventListener('keyup', (event) => {
    if (event.key == 'Escape') {
        if ((modal != null) && (typeof modal != "undefined")) {
            modal.close();
            modal.style.display = 'none';
        }
    }
})

function GeraModal(titulo, mensagem, tipoMens) {
    const divModal = document.createElement('div')

    if ((titulo != "") && (typeof titulo != 'undefined')) {
        const elementTitulo = document.createElement('h2');
        elementTitulo.className = 'titulo';
        elementTitulo.innerText = titulo;
        divModal.appendChild(elementTitulo);
    }
    const elementMensagem = document.createElement('p');
    elementMensagem.className = 'mensagem';
    elementMensagem.innerText = mensagem;
    switch (tipoMens) {
        case 1:
            elementMensagem.style.color = 'red';
            break;
        case 2:
            elementMensagem.style.color = 'blue';
            break;
        case 3:
            break;
        default:
            break;
    }

    divModal.appendChild(elementMensagem);
    modal.appendChild(divModal);
    GeraBotao();
}

function GeraBotao(modal) {
    let button = document.createElement('button');
    button.innerHTML = 'OK';
    modal.appendChild(button);
}

function AbrirPopUp(titulo, mensagem, tipoMens) {
    GeraModal(titulo, mensagem, tipoMens)
    modal.style.display = 'flex';
    modal.showModal();
}

function FecharPopUp() {
    modal.close();
    modal.style.display = 'none';
}