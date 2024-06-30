"use strict";

function AnoAtual() {
    let hoje = new Date(),
        ano = hoje.getFullYear();
    return ano;
}

function GeraImagem(imagem) {
    const dirApp = location.pathname;
    /* Obt�m o diret�rio onde se encontra a aplica��o principal e montar o diret�rio para obter a imagem do seu respectivo diret�rio.
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
    let novaString
    return novaString = stringORI.replace(vlrSubstituir, novoValor).trim()
}

/**
 * @function GeraBtnAcao
 * @description Realiza a gera��o de bot�es de forma din�mica.
 * @param {string} descricao Define a descri��o que ser� apresentada no bot�o - OBR.
 * @param {string} nomeClasse Define o nome da classe - CSS - que ser� associada ao bot�o - OP.
 * @param {string} id Define o identificador - CSS - que ser� associado ao bot�o - OP.
 * @param {number} acao Define o tipo de a��o que o bot�o far� - Valores: 1(onclick); 2(onsubmit); 3(�ncora/href) - OBR.
 * @param {string} funcao Define o nome da fun��o que ser� executada pelo bot�o - OP.
 * @param {string} link Define o link que ser� chamado pelo bot�o �ncora.
 * @returns {object} Retorna o elemento HTML do bot�o gerado din�micamente.
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
                alert(`N�o est� definido o tipo a��o cria��o de bot�o ${acao}`)
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