"use strict";

function GeraModal(titulo, mensagem, tipoMens) {
    const dialogModal = document.createElement('dialog')

    if ((titulo != "") && (typeof titulo != 'undefined')) {
        //#region Título
        const elementTitulo = document.createElement('h2');
        elementTitulo.className = 'titulo'
        elementTitulo.innerText = titulo;
        switch (tipoMens) {
            case 1:
                elementTitulo.style.color = 'red'
                break;
            case 2:
                elementTitulo.style.color = 'blue'
                break;
            default:
                break;
        }
        dialogModal.appendChild(elementTitulo);
        //#endregion
    }
    const elementMensagem = document.createElement('p');
    elementMensagem.className = 'mensagem';
    elementMensagem.innerText = mensagem;
    switch (tipoMens) {
        case 1:
            elementMensagem.style.color = 'red'
            break;
        case 2:
            elementMensagem.style.color = 'blue'
            break;
        default:
            break;
    }

    dialogModal.appendChild(elementMensagem);
    GeraBotao(dialogModal, tipoMens);
    body.appendChild(dialogModal)
}

function GeraBotao(dialogModal, tipoMens) {
    let button = document.createElement('button');
    button.id = 'btnPopUP';
    button.innerHTML = 'OK';
    button.onclick = function () {
        FecharPopUp(tipoMens);
    }
    dialogModal.appendChild(button);
}

const body = document.querySelector('body');

function AbrirPopUp(titulo, mensagem, tipoMens) {
    GeraModal(titulo, mensagem, tipoMens);
    const modal = document.querySelector('dialog');
    modal.style.display = 'flex'
    modal.showModal()
}

function FecharPopUp(tipoMens) {
    const modal = document.querySelector('dialog');
    if ((modal != null) && (typeof modal != 'undefined')) {
        modal.close();
        modal.style.display = 'none';
        modal.remove();
        if (tipoMens == 2) {
            location.href = '../../index.html';
        }
    }
}

window.addEventListener('keyup', (event) => {
    if (event.key == 'Escape') {
        const modal = document.querySelector('dialog');
        if ((modal != null) && (typeof modal != 'undefined')) {
            modal.close()
            modal.style.display = 'none'
            modal.remove();
        }
    }
})