"use strict";
import obtemProdutos from './dados.js';
// import {numeroParaReal} from '/scripts/util.js';

let subtotalInfo = new Object();
let valorReferencia = 0,
    qtdeReferencia = 0;

const objetos = obtemProdutos();

function ObtemProduto(obj, id) {
    const objProduto = new Object(obj.produtos.filter(item => (item.id == id))[0]);
    // const novoObjeto = Object.entries(objProduto).reduce((acc, [key, value]) => { acc[key] = value; return acc; }, {});
    return objProduto;
}

function isEmptyObject(obj) {
    /*
    https://pt.stackoverflow.com/questions/29014/qual-o-sentido-de-usar-dupla-nega%C3%A7%C3%A3o-em-javascript
    https://stackoverflow.com/questions/4686583/can-someone-explain-this-double-negative-trick

    return !!Object.values(obj).length;
    */
    return !Object.values(obj).length;
}

// Obtém parâmetros que foram passados pela URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Outra forma de obter a mesma informação, porem através da URL
// const url = new URL(window.location.href);
// const searchParams = url.searchParams;
// const id = searchParams.get("id");

const objProduto = ObtemProduto(objetos, id);

if (!isEmptyObject(objProduto)) {
    MontaDadosProduto(objProduto);
    subtotalInfo.valor = objProduto.valor;
    subtotalInfo.quantidade = 1;
    valorReferencia = objProduto.valor;
    qtdeReferencia = subtotalInfo.quantidade;
} else {
    alert(`Produto ${id} escolhido não está disponível na base de dados!`);
    // throw TypeError(`Produto ${id} escolhido não está disponível na base de dados!`);
}

//#region Controle SubTotal
const btnSubtrair = document.getElementById('btnSubtrair');
const btnAdicionar = document.getElementById('btnAdicionar');
//
let quantidadeProduto01 = document.getElementById('qtdeProduto');
let quantidadeSubtotal = document.getElementById("qtdeSubtotal");
let valorSubtotal = document.getElementById("valorSubtotal");
let total = document.getElementById('totalSubtotal');
//
// AtualizaSubTotal();
//
// btnAdicionar.addEventListener('click', Adicionar);
// btnSubtrair.addEventListener('click', Subtrair);
//#endregion

//#region Funções Atualizações Subtotal
function Adicionar() {
    quantidadeProduto01.value++;
    subtotalInfo.quantidade++;
    subtotalInfo.valor += valorReferencia;
    btnSubtrair.disabled = false;

    AtualizaSubTotal();
}
//
function Subtrair() {
    quantidadeProduto01.value--;
    if (quantidadeProduto01.value <= quantidadeProduto01.min) {
        quantidadeProduto01.value = qtdeReferencia;
        subtotalInfo.quantidade = qtdeReferencia;
        subtotalInfo.valor = valorReferencia;
        btnSubtrair.disabled = true;
    } else {
        subtotalInfo.quantidade--;
        subtotalInfo.valor -= valorReferencia.toFixed(2);
        if(subtotalInfo.quantidade == 1){
            btnSubtrair.disabled = true;
        }
    }

    AtualizaSubTotal();
}
//
function AtualizaSubTotal() {
    quantidadeSubtotal.innerText = `${subtotalInfo.quantidade} item(s)`;
    // let valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalInfo.valor);
    valorSubtotal.innerText = `${numeroParaReal(subtotalInfo.valor)}`;
    total.innerText = `${numeroParaReal(CalculaVlrPix(subtotalInfo.valor))}`
}
//#endregion

//#region  Funções Auxiliares/Cálculos
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
//#endregion

//#region Monta Dados Produto Dinamicamente
function MontaDadosProduto(objProduto) {

    //Cria o elemento principal(Pai/parent) para os Cards
    const cardProduto = document.querySelector('.secao4');

    //Criar um Elemento Pai(Filho(Child)-1):
    const secaoDiv = document.createElement('div');
    secaoDiv.className = 'secao4-div';

    //Criar um Elemento Filho(Child)-2:
    const secaoDivCard = document.createElement('div');
    secaoDivCard.className = 'secao4-div-card';
    secaoDivCard.id = `prod_${objProduto.id}`;

    //Criar elemento(filho/Child) para cada campo para associar a Div(pai/parent)
    const itemImagem = document.createElement('img');
    itemImagem.className = 'imagemProduto';
    const itemCodigo = document.createElement('p');
    const itemNome = document.createElement('p')
    const itemDescricao = document.createElement('article');
    const itemTamanho = document.createElement('p');
    const itemPreco = document.createElement('p');
    const itemPrecoPix = document.createElement('p');
    const itemParcelas = document.createElement('p');
    //Fim
    const itemComprar = document.createElement('a');
    itemComprar.className = 'btn-verProduto';
    itemComprar.text = 'COMPRAR';
    // itemComprar.href = '/paginas/carrinho.html';
    itemComprar.href = `/paginas/carrinho.html?id=${objProduto.id}`

    //Cria elemento para Qtde Produto x Total - Compra
    // const sectionCarrinho = document.createElement('section')
    // sectionCarrinho.className = 'qtdeCarrinho'
    // const btnProdutoQtde = document.createElement('div');
    // btnProdutoQtde.className = 'btn-QtdeProduto'
    // sectionCarrinho.appendChild(btnProdutoQtde)
    //
    // GeraBotao('-', 'btnSubtrair', btnProdutoQtde);
    // GeraInput(btnProdutoQtde);
    // GeraBotao('+', 'btnAdicionar', btnProdutoQtde);
    //
    //#region Monta Dados do Produto(Item)
    //Imagem:
    itemImagem.decoding = 'async';
    itemImagem.width = 200;
    itemImagem.height = 200;
    itemImagem.src = `/${objProduto.imagem}`;
    secaoDivCard.append(itemImagem);
    //Código:
    itemCodigo.innerText = `Código: ${objProduto.id}`;
    secaoDivCard.append(itemCodigo);
    //Nome:
    itemNome.innerText = `Nome: ${objProduto.nome}`;
    secaoDivCard.append(itemNome);
    //Descrição:
    itemDescricao.innerText = `Descrição: ${objProduto.descricao}`
    secaoDivCard.append(itemDescricao);
    //Tamanho:
    itemTamanho.innerText = `Tamanho: ${objProduto.tamanho}`
    secaoDivCard.append(itemTamanho);
    //Valor:
    let valor = objProduto.valor;
    let valorPix = CalculaVlrPix(valor);
    let vlrParcelas = CalculaVlrParcelas(valor);

    itemPreco.innerText = `Valor: ${numeroParaReal(valor)}`;
    secaoDivCard.append(itemPreco);

    itemPrecoPix.innerHTML = `Valor c/ Desconto: ${numeroParaReal(valorPix)} via PIX`;
    secaoDivCard.append(itemPrecoPix);

    itemParcelas.innerHTML = `ou 3x de ${numeroParaReal(vlrParcelas)} sem juros`;
    secaoDivCard.append(itemParcelas);
    //#endregion

    //Adicionar Quantidades/Subtotais:
    // secaoDivCard.append(sectionCarrinho);
    // GeraSubTotal(secaoDivCard);

    //Botão Comprar:
    secaoDivCard.append(itemComprar);

    //Monta Card Dinâmico    
    secaoDiv.appendChild(secaoDivCard);
    // Adiciona Filho no Pai
    cardProduto.appendChild(secaoDiv);
    // console.log(cardProduto);
};
//#endregion

//#region Monta Botões Controle de Quantidade/Subtotal
function GeraBotao(texto, nomeClasse, btnProdutoQtde) {
    const elemento = document.createElement('button');
    elemento.id = nomeClasse
    elemento.innerText = texto;
    if(texto === "-"){
        elemento.disabled = true;
    }
    btnProdutoQtde.appendChild(elemento);
}
function GeraInput(btnProdutoQtde) {
    const elemento = document.createElement('input');
    elemento.id = 'qtdeProduto';
    elemento.type = 'number';
    elemento.value = 1;
    elemento.min = 0;
    elemento.readOnly = 'true'
    btnProdutoQtde.appendChild(elemento);
}

function GeraSubTotal(secaoDivCard) {
    const subTotal = document.createElement('section');
    subTotal.className = 'subTotal-Section';
    //
    const subTotalLabel = document.createElement('div');
    subTotalLabel.className = 'subtotal-Label';
    const subTotalDados = document.createElement('div');
    subTotalDados.className = 'subtotal-Dados';
    //
    // &#160; ou &nbsp; - Para definir espaço no HTML
    const labelQuantidade = document.createElement('label');
    labelQuantidade.innerHTML = "Quantidade:"
    const labelSubtotal = document.createElement('label');
    labelSubtotal.innerHTML = 'Subtotal&nbsp; &nbsp; &nbsp;:'
    const labelTotal = document.createElement('label');
    labelTotal.innerHTML = 'Total&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:';
    //
    subTotalLabel.append(labelQuantidade);
    subTotalLabel.append(labelSubtotal);
    subTotalLabel.append(labelTotal);    
    subTotal.appendChild(subTotalLabel);/* Adiciona ao principal */
    //
    const qtdeTotal = document.createElement('p');
    qtdeTotal.id = 'qtdeSubtotal'
    subTotalDados.appendChild(qtdeTotal);
    //
    const valorSubtotal = document.createElement('p');
    valorSubtotal.id = 'valorSubtotal'
    subTotalDados.appendChild(valorSubtotal);
    //
    const total = document.createElement('p');
    total.id = 'totalSubtotal'
    subTotalDados.appendChild(total);
    //
    subTotal.appendChild(subTotalDados);
    //
    secaoDivCard.appendChild(subTotal);/* Adiciona ao principal */
}
//#endregion