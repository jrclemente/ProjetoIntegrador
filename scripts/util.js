"use strict";

function AnoAtual() {
    let hoje = new Date(),
        ano = hoje.getFullYear();
    return ano;
}

function GeraImagem(imagem) {
    const dirApp = location.pathname;
    /* Obtém o diretório onde se encontra a aplicação principal e monta o diretório para obter a imagem do seu respectivo diretório.
    */
    let inicio = dirApp.indexOf('indice.html'),
        dirImagem = dirApp.substring(0, (inicio)).concat('imagens/'),
        img = `${dirImagem}${imagem}`;
    return img;
}

function numeroParaReal(numero) {
    return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}

function CalculaVlrQtde(vlr, qtde) {
    return (vlr * qtde).toFixed(2);
}

function CalculaVlrPix(vlr) {
    return Number((vlr - ((vlr * 5) / 100)).toFixed(2));/*5%*/
}

function CalculaVlrParcelas(vlr) {
    return Number((vlr / 3).toFixed(2));
}

function objetoVazio(obj) {
    return Object.keys(obj).length === 0;
}

function TrocaString(stringORI, vlrSubstituir, novoValor) {
    let novaString;    
    return novaString = stringORI.replace(vlrSubstituir, novoValor).trim();
}

/**
 * @function GeraBtnAcao
 * @description Realiza a geração de botões de forma dinâmica.
 * @param {string} descricao Define a descrição que será apresentada no botão - OBR.
 * @param {string} nomeClasse Define o nome da classe - CSS - que será associada ao botão - OP.
 * @param {string} id Define o identificador - CSS - que será associado ao botão - OP.
 * @param {number} acao Define o tipo de ação que o botão fara - Valores: 1(onclick); 2(onsubmit); 3(âncora/href) - OBR.
 * @param {string} funcao Define o nome da função que será executada pelo botão - OP.
 * @param {string} link Define o link que será chamado pelo botão âncora.
 * @returns {object} Retorna o elemento HTML do botão gerado dinamicamente.
 * @version 1.0.0
 */
function GeraBtnAcao(descricao, nomeClasse, id, acao, funcao, link) {
    let elementoBTN;
    if (acao != 3) {/* href */
        elementoBTN = document.createElement('button');
        if ((nomeClasse != null) && (typeof nomeClasse != "undefined")) {
            elementoBTN.className = nomeClasse;
        }
        if ((id != null) && (typeof id != "undefined")) {
            elementoBTN.id = id;
        }
        elementoBTN.innerText = descricao;
        switch (acao) {
            case 1: ;/* click */
                elementoBTN.onclick = function (event) {
                    `${funcao}(${event})`;
                };
                break;
            case 2:/* submit */
                elementoBTN.onsubmit = function (event) {
                    `${funcao}(${event})`;
                };
                break;
            default:
                alert(`Não está definido o tipo ação criação de botão ${acao}`)
                break;
        }
    } else {
        elementoBTN = document.createElement('a');
        if ((nomeClasse != null) && (typeof nomeClasse != "undefined")) {
            elementoBTN.className = nomeClasse;
        }
        if ((id != null) && (typeof id != "undefined")) {
            elementoBTN.id = id;
        }
        elementoBTN.innerText = descricao;
        elementoBTN.href = '#'
        if ((link != null) && (typeof link != "undefined")) {
            elementoBTN.href = `${link}`
        }
    }
    return elementoBTN
}