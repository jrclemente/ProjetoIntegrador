"use strict";

import obtemProdutos from './dados.js';

let objHTML;
let subtotalInfo;
let valorReferencia,
    qtdeReferencia;
let objProdutoAux;

//#region Obtem Elementos Cabeçalho/Carrinho
function ObtemElemento(nomeClasse, comoRecuperar) {
    return new Promise((resolve) => {
        setTimeout(function () {
            let itens;
            // Utilizando: jQuery
            if (comoRecuperar == 1) {
                const headerJQ = $(nomeClasse)
                itens = headerJQ;
            }
            else {
                // Utilizando: javaScrip
                const headerJS = document.getElementsByClassName(nomeClasse);
                itens = headerJS;
            }
            resolve(itens)
        }, 132);/* 132=0.1"(1 décimo de 1 segundo) */
    })
}

async function ObtemElementoCarrinho(nomeClasse, comoRecuperar) {
    return await ObtemElemento(nomeClasse, comoRecuperar)
        .then(elemento => {
            return elemento;
        })
        .catch((error) => console.log('Whoops! Algo deu errado!: ' + error.message))
        .finally(() => {
        });
}

async function AtualizaQtdeCarrinho(qtdeItensCarrinho) {
    let comoRecuperar = 2; /*1=jQuery / 2=javaScript */
    let nomeClasseJQ = '#header #cabecalho .login-carrinho .carrinhoCompraMenu';
    let nomeClasseJS = 'carrinhoCompraMenu';
    const elementos = await ObtemElementoCarrinho(nomeClasseJS, comoRecuperar);
    for (let index = 0; index < elementos.length; index++) {
        const elemento = elementos[index];
        const itens = elemento.children;
        Array.from(itens).forEach(item => {
            const className = item.className;
            const nomesClasse = ['qtde-carrinho', 'qtde-carrinho visible'];
            // Este controle evitar a necessidade de fazer uma condição com vários itens(ou/or)
            const adicionaElemento = nomesClasse.some(nomeClasse => nomeClasse === className)
            // if ((className == 'qtde-carrinho') || (className == 'qtde-carrinho visible')) {
            if (adicionaElemento) {
                // item.classList.toggle('visible');
                if (qtdeItensCarrinho > 0) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
                item.innerHTML = qtdeItensCarrinho;
            }
        });
    }
}
//#endregion

const objetos = obtemProdutos();

// Obtem Relação de Produtos - Simulação Banco de Dados (Em um processo real seria via API/GET)
function ObtemProduto(obj, id) {
    const objProduto = new Object(obj.produtos.filter(item => (item.id == id))[0]);
    // const novoObjeto = Object.entries(objProduto).reduce((acc, [key, value]) => { acc[key] = value; return acc; }, {});
    return objProduto;
}

function isEmptyObject(obj) {
    return !Object.values(obj).length;
}

// Obtém parâmetros - Identificador Produto - que foram passados pela URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const objProduto = ObtemProduto(objetos, id);

//#region Mostra Produto Atual / Histórico das Compras
if (!isEmptyObject(objProduto)) {

    // Cria um objeto para guardar as informações do subtotal/quantidade
    subtotalInfo = new Object();
    subtotalInfo.valor = parseFloat(0);

    const cardProduto = MontaDadosCompra(objProduto);

    const ePrimeiroItem = false;
    let localStorageLT = getListaStorage();
    const id = getIdProdutoLS(localStorageLT, objProduto.id)
    for (let index = 0; index < localStorageLT.length; index++) {
        if (id != index) {
            const element = localStorageLT[index];
            MontaDadosLocalStorage(element, ePrimeiroItem);
            // Atribuição de adição
            subtotalInfo.valor += parseFloat(element.valor);
        }
    }

    // Adiciona o novo produto na local storage
    let lista = initListaStorage();
    addProduto(lista);
    localStorageLT = getListaStorage();
    const qtdeItensCarrinho = localStorageLT.length;
    AtualizaQtdeCarrinho(qtdeItensCarrinho);

    // Atribuição de adição
    subtotalInfo.valor += parseFloat(objProduto.valor);
    subtotalInfo.quantidade = qtdeItensCarrinho;
    valorReferencia = objProduto.valor;
    qtdeReferencia = subtotalInfo.quantidade;

    const secaoDivCard = GeraElementosSubTotal(cardProduto);

    const divFinalizacaoCompra = GeraBtnFinalizar();
    cardProduto.append(divFinalizacaoCompra);

    let qtdeItemProdutoHTML = document.getElementById('qtde');

    //Manipulação dos botões de quantidade:
    const btnSubtrair = document.getElementById('btnSubtrair');
    const btnAdicionar = document.getElementById('btnAdicionar');

    const btnSubtrairLS = document.getElementById('btnSubtrairLS');
    const btnAdicionarLS = document.getElementById('btnAdicionarLS');

    let quantidadeProduto = document.getElementById('qtdeProduto');

    let quantidadeSubtotal = document.getElementById("qtdeSubtotal");
    quantidadeSubtotal = AtualizaSubTotal(1, quantidadeSubtotal, subtotalInfo);

    let valorSubtotal = document.getElementById("valorSubtotal");
    valorSubtotal = AtualizaSubTotal(2, valorSubtotal, subtotalInfo);

    let total = document.getElementById('totalSubtotal');
    total = AtualizaSubTotal(3, total, subtotalInfo);

    // Cria um objeto para guardar as informações e sem utilizadas no HTML
    objHTML = new Object();
    objHTML.quantidadeSubtotal = quantidadeSubtotal
    objHTML.valorSubtotal = valorSubtotal;
    objHTML.total = total;
    objHTML.idProdutoAtual = objProduto.id;

    /*
     ATENÇÃO: a utilização do controle abaixo - addEventListener - causa erro de variável/objeto não definido(undefined) quando da execução da função.
     Isto ocorre porque a função acaba sendo executada "duas vezes". Uma através deste controle - onde os parâmetros/argumentos não são passados - e a outro quando da execução da funcao através do bind(Utilizando para passar parâmetro/argumento para uma função -Abaixo).
     Esta forma de execução só deve ser utilizando quando não há necessidade de passar parâmetros/argumentos.
    */
    /*
     btnAdicionar.addEventListener('click', Adicionar);
     btnSubtrair.addEventListener('click', Subtrair);     
    */

    btnAdicionar.onclick = Adicionar.bind(this, quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrair);
    btnSubtrair.onclick = Subtrair.bind(this, quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrair);

    //Botão Adicionarl Local Storage:
    if ((btnAdicionarLS != null) && (typeof btnAdicionarLS != "undefined")) {
        btnAdicionarLS.onclick = Adicionar.bind(this, quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrairLS);
        btnSubtrairLS.onclick = Subtrair.bind(this, quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrairLS);
    }

    // USO FUTURO caso necessário (Atualmente o controle é executado via função dinâmica)
    // const btnExcluir = document.getElementById('imgExcluir');
    // btnExcluir.addEventListener('click', ExcluiCompra);
    // const btnExcluirLS = document.getElementById('imgExcluirLS');
    // if ((btnExcluirLS != null) && (typeof btnExcluirLS != "undefined")) {
    //     btnExcluirLS.addEventListener('click', ExcluiCompra);
    // }
    //
} else {
    //
    //#region Visualização dos dados via Carrinho(Menu)
    let ePrimeiroItem = true;
    let cardProduto;
    let localStorageLT = getListaStorage();
    const id = getIdProdutoLS(localStorageLT, objProduto.id)
    for (let index = 0; index < localStorageLT.length; index++) {
        if (id != index) {
            const element = localStorageLT[index];
            cardProduto = MontaDadosLocalStorage(element, ePrimeiroItem);
            ePrimeiroItem = false;
        }
    }
    const qtdeItensCarrinho = localStorageLT.length;
    AtualizaQtdeCarrinho(qtdeItensCarrinho)
    if ((cardProduto != null) && (typeof cardProduto != "undefined")) {
        const secaoDivCard = GeraElementosSubTotal(cardProduto);
        AtualizaSubTotalHistorico(localStorageLT, qtdeItensCarrinho);
    }
    const divFinalizacaoCompra = GeraBtnFinalizar();
    if ((cardProduto != null) && (typeof cardProduto != "undefined") && (qtdeItensCarrinho > 0)) {
        cardProduto.append(divFinalizacaoCompra);
    }else{
        const cardProduto = document.querySelector('.carrinho-compra');
        const secaoDivCompra = document.createElement('div');
        secaoDivCompra.className = 'carrinho-vazio';
        const mensagem = document.createElement('h1');
        mensagem.innerHTML = 'Seu carrinho da Manacá está vazio';
        mensagem.className = 'mensagem-carrinho-vazio';
        secaoDivCompra.append(mensagem);
        const linkOfertas = document.createElement('a');
        linkOfertas.classList = 'linkOfertas';
        linkOfertas.innerHTML = 'Compre ofertas do dia';
        linkOfertas.href = '../index.html';
        secaoDivCompra.append(linkOfertas);
        const tpAcaoBTN = 3;
        const btnLogin = GeraBtnAcao('Faça Login na sua Conta', 'btn-LoginConta', '', tpAcaoBTN, 'Login', 'paginas/login.html');
        secaoDivCompra.append(btnLogin);
        cardProduto.append(secaoDivCompra);
    }
    //#endregion
}
//#endregion

//#region Monta Dados Produto Atual
function MontaDadosCompra(objProduto) {

    const origem = 1; /* 1=MondaDadosCompra */

    //Cria o elemento principal(Pai/parent)
    const cardProduto = document.querySelector('.carrinho-compra');

    //Imagem Fechar(X)
    const divFechar = GeraFecharCompra()
    cardProduto.append(divFechar);
    const titulo = GeraTituloCompra()
    cardProduto.append(titulo);

    const secaoCompra = document.querySelector('.secao-compra');
    if ((secaoCompra == null) || (typeof secaoCompra == 'undefined')) {

        const secaoDivCompra = document.createElement('div');
        secaoDivCompra.className = 'secao-compra';
        secaoDivCompra.id = 'idSecaoCompra';
        const divProduto = document.createElement('div');
        divProduto.className = 'produto-compra';

        //Criar elemento(filho/Child) para cada campo para associar a Div(pai/parent)
        const itemCodigo = document.createElement('p');
        const itemImagem = document.createElement('img');
        const itemNome = document.createElement('p');
        const itemPreco = document.createElement('div');
        const itemQtde = document.createElement('p');
        const itemImgExcluir = document.createElement('img');

        //#region Monta Apresentação do Produto

        //#region Imagem Excluir(Lixeira)
        const divExcluir = document.createElement('div');
        divExcluir.className = 'excluir';
        itemImgExcluir.className = 'imgExcluir';
        itemImgExcluir.id = objProduto.id;
        itemImgExcluir.decoding = 'async';
        itemImgExcluir.width = 20;
        itemImgExcluir.height = 20;
        itemImgExcluir.src = `${GeraImagem('lixeira_100.png')}`
        itemImgExcluir.onclick = function (event) {
            ExcluiCompra(event);
        };
        divExcluir.append(itemImgExcluir)
        // secaoDivCompra.append(divExcluir);
        divProduto.append(divExcluir);
        //#endregion

        //#region  Dados do Produto
        //Imagem:
        itemImagem.decoding = 'async';
        itemImagem.width = 200;
        itemImagem.height = 200;
        itemImagem.src = `/${objProduto.imagem}`;
        itemImagem.id = 'img';
        divProduto.append(itemImagem);

        //Código:
        itemCodigo.innerText = `${objProduto.id}`;
        itemCodigo.id = 'id';
        // itemCodigo.style.display = 'none';
        divProduto.append(itemCodigo);

        //Nome:
        itemNome.innerText = `${objProduto.nome}`;
        itemNome.id = 'nome';
        divProduto.append(itemNome);

        //Valor:
        itemPreco.id = 'valor'
        itemPreco.className = 'valor-compra'
        let valor = objProduto.valor;
        itemPreco.innerText = `${numeroParaReal(valor)}`;
        divProduto.append(itemPreco);

        //Quantidade:
        itemQtde.id = 'qtde'
        itemQtde.innerText = `Quantidade: ${1}`;
        divProduto.append(itemQtde);
        //#endregion

        //#endregion      

        const sectionCarrinho = GeraQuantidade(objProduto, 1, origem);
        divProduto.append(sectionCarrinho);

        secaoDivCompra.append(divProduto);
        cardProduto.appendChild(secaoDivCompra);

        return cardProduto;
        //
    } else {
        const qtdeItens = document.querySelector('.secao-compra').childElementCount;
        console.log(qtdeItens);
    }
}
//#endregion

//#region Monta Dados Produtos Histórico Compras(Local Storage)
function MontaDadosLocalStorage(itemLocalStorage, ePrimeiroItem) {

    const origem = 2; /* 2=MontaDadosLocalStorage */
    const idProduto = itemLocalStorage.id;

    //Cria o elemento principal(Pai/parent)
    const cardProduto = document.querySelector('.carrinho-compra');

    if (ePrimeiroItem) {
        const divFechar = GeraFecharCompra()
        cardProduto.append(divFechar);
        const titulo = GeraTituloCompra()
        cardProduto.append(titulo);
    }

    const secaoCompra = document.querySelector('.secao-compra-LS')
    const secaoDivCompra = document.createElement('div');
    secaoDivCompra.className = 'secao-compra';
    secaoDivCompra.id = 'idSecaoCompra';
    const divProduto = document.createElement('div');
    divProduto.className = 'produto-compra-LS';

    //Criar elemento(filho/Child) para cada campo para associar a Div(pai/parent)
    const itemCodigo = document.createElement('p');
    /*
    const itemImagem = document.createElement('img');
    Antes estava sendo utilizado a tag: img - porem o innerHTML não funciona recebendo uma definição html completa da imagem.
    Para funcionar tem que utilizar as definições completa da imagem e utilizar o src com o diretorio+imagem(Foi foi feito em outros locais. Inclusive aqui)
    Este controle foi substituido pela div abaixo.
    */
    const itemImagem = document.createElement('div');
    // 
    const itemNome = document.createElement('p')
    const itemPreco = document.createElement('div');
    const itemQtde = document.createElement('p');
    const itemImgExcluir = document.createElement('img');

    //#region Monta Apresentação do Produto + Botão Excluir

    //#region Imagem Excluir(Lixeira)
    const divExcluir = document.createElement('div');
    divExcluir.className = 'excluir';
    itemImgExcluir.className = 'imgExcluirLS';
    itemImgExcluir.id = idProduto;
    itemImgExcluir.decoding = 'async';
    itemImgExcluir.width = 20;
    itemImgExcluir.height = 20;
    itemImgExcluir.src = `${GeraImagem('lixeira_100.png')}`
    itemImgExcluir.onclick = function (event) {
        ExcluiCompra(event);
    };
    divExcluir.append(itemImgExcluir);
    divProduto.append(divExcluir);
    //#endregion

    //#region Dados do Produto

    //Imagem:    
    itemImagem.innerHTML = itemLocalStorage.imagem;
    divProduto.appendChild(itemImagem);

    //Código:
    itemCodigo.innerHTML = itemLocalStorage.idHTML;
    divProduto.append(itemCodigo);

    //Nome:
    itemNome.innerHTML = itemLocalStorage.nome;
    divProduto.append(itemNome);

    //Valor:
    itemPreco.innerHTML = itemLocalStorage.valorHTML;
    divProduto.append(itemPreco);

    //Quantidade:    
    itemQtde.innerHTML = itemLocalStorage.qtdeHTML;
    divProduto.append(itemQtde);
    //#endregion

    //#endregion      

    objProdutoAux = new Object();
    objProdutoAux.valor = 10;

    const sectionCarrinho = GeraQuantidade(objProdutoAux, 1, origem);
    divProduto.append(sectionCarrinho);

    secaoDivCompra.append(divProduto);
    cardProduto.appendChild(secaoDivCompra);
    return cardProduto;
}
//#endregion

//#region Obter Elementos de Outras Páginas - TESTE INTERNO
// ObterElementosOutraPagina();
function ObterElementosOutraPagina() {
    const http = new XMLHttpRequest();

    const url_ = "paginas/produto.html"; // página de onde virá a div
    http.open("GET", url_, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            const html = http.responseText;
            // converte o retorno em elementos HTML
            html = new DOMParser().parseFromString(html, "text/html");
            // document.getElementById('id_da_div_que_irá_receber').innerHTML = html.getElementById('id_da_div_que_de_onde_virá').innerHTML.trim();
            // const teste = html.querySelector('.apresentacaoProduto').innerHTML.trim(); / *Aqui objeto HTML em string */
            const teste = html.querySelector('.apresentacaoProduto');/* Aqui objeto em HTML */
            console.log(teste)
        }
    }
    http.send(null);
}
//#endregion

//#region  Processos de Fechar/Excluir Compra/Atualização Subtotal
function FecharCompra() {
    location.href = '../../index.html';
}

function ExcluiCompra(event) {
    const oriExclusao = event.target.className
    const idItemExclusao = Number(event.target.id);

    const compras = document.querySelectorAll(".secao-compra");

    for (let index = 0; index < compras.length; index++) {

        const element = compras[index];
        let divCompra;

        if (oriExclusao == 'imgExcluir') {
            divCompra = element.getElementsByClassName('produto-compra');
        } else {
            divCompra = element.getElementsByClassName('produto-compra-LS');
        }

        if ((divCompra != null) && (typeof divCompra != "undefined") && (divCompra.length > 0)) {
            for (let index2 = 0; index2 < divCompra.length; index2++) {

                const element = divCompra[index2];
                const className = element.className;

                element.childNodes.forEach(element => {
                    let idElemento;
                    switch (className) {
                        case 'produto-compra':
                            //#region Produto Compra Atual
                            idElemento = element.id;
                            if (idElemento === 'id') {
                                const id = Number(element.innerHTML);
                                if (idItemExclusao == id) {
                                    const localStorageLT = getListaStorage();
                                    deleteProduto(localStorageLT, id);
                                    initListaStorage();
                                    const itemProduto = document.querySelector('.produto-compra');
                                    if ((itemProduto != null) && (typeof itemProduto != "undefined")) {
                                        // itemProduto.remove();
                                        compras[index].remove();
                                    }
                                }
                            }
                            //#endregion
                            break;
                        case 'produto-compra-LS':
                            //#region Produto Compra Histório (LS)
                            // const item = element.querySelector('p#id')
                            element.childNodes.forEach(element => {
                                idElemento = element.id;
                                if (idElemento === 'id') {
                                    const id = Number(element.innerHTML);
                                    if (idItemExclusao == id) {
                                        const localStorageLT = getListaStorage();
                                        deleteProduto(localStorageLT, id);
                                        initListaStorage();
                                        const itemProduto = document.querySelector('.produto-compra-LS')
                                        if ((itemProduto != null) && (typeof itemProduto != "undefined")) {
                                            // itemProduto.remove();
                                            compras[index].remove();

                                        }
                                    }
                                }
                            });
                            //#endregion
                            break;
                        default:
                            /*
                            Mensagem de Uso Interno do sistema.
                            Via de regra, estas situações não prevista, não devem ser
                            mostradas para o Usuario Sistema.
                            Deve-se utilizar uma excecão para esta situação gerando uma mensagem em padrão html(Não foi possivel realizar a exclusão. Favor tentar novamente) e o motivo real deve ser gerado em um arquivo de log.
                            */
                            alert('Classe Produto para excluir não identificado!')
                            break;
                    }
                })
            }
        }
    }

    //#region  Atualiza Qtde Carrinho/Resumo SubTotal/Total
    const localStorageLT = getListaStorage();
    const qtdeItensCarrinho = localStorageLT.length;
    AtualizaQtdeCarrinho(qtdeItensCarrinho);
    AtualizaSubTotalHistorico(localStorageLT, qtdeItensCarrinho);
    //#endregion

    const comprasAtual = document.querySelectorAll(".secao-compra");
    if ((comprasAtual == null) || (typeof comprasAtual === "undefined") || (qtdeItensCarrinho == 0)) {
        const subTotal = document.getElementById('idSubtotal-Section');
        if ((subTotal != null) && (typeof subTotal != "undefined")) {
            subTotal.remove();
            window.history.pushState("", "", "/");/* Volta para página principal */
        }
        //
        if (qtdeItensCarrinho == 0) {
            const cardProdutoEX = document.querySelector('.carrinho-compra');
            if ((cardProdutoEX != null) && (typeof cardProdutoEX != "undefined")) {
                cardProdutoEX.remove();
                location.href = '../../index.html';/* Volta para página principal */
            }
        }
    }
    return qtdeItensCarrinho;
}
//#endregion

//#region Gera Fechar Compra (X) / Gera Título Compra
function GeraFecharCompra() {
    const divFechar = document.createElement('div');
    divFechar.className = 'fecharCompras';
    const itemImgFechar = document.createElement('img');
    itemImgFechar.decoding = 'async';
    itemImgFechar.width = 25;
    itemImgFechar.height = 25;
    itemImgFechar.src = `${GeraImagem('fechar-sem_32.png')}`;
    itemImgFechar.onclick = function () {
        FecharCompra();
    }
    divFechar.append(itemImgFechar);
    return divFechar;
}
function GeraTituloCompra() {
    const titulo = document.createElement('p');
    titulo.className = 'titulo-compra'
    titulo.innerText = "Minha(s) Compra(s)"
    return titulo;
}
//#endregion

//#region  Gera Botao Finalização da Compra
function GeraBtnFinalizar() {
    const tpAcaoBTN = 3;
    const divFinalizacaoCompra = document.createElement('div');
    divFinalizacaoCompra.className = 'continuar-finalizar-compra';
    const btnContinuar = GeraBtnAcao('Continuar Comprando', 'continuar-comprado', '', tpAcaoBTN, 'Continuar', 'index.html');
    divFinalizacaoCompra.append(btnContinuar);
    // const btnFinalizar = GeraBtnAcao('Finalizar Compra', 'finalizar-compra', '', tpAcaoBTN, 'Finalizar', 'paginas/login.html');
    const btnFinalizar = GeraBtnAcao('Finalizar Compra', 'finalizar-compra', '', tpAcaoBTN, 'Finalizar', 'paginas/checkoutscompras.html');
    divFinalizacaoCompra.append(btnFinalizar);
    return divFinalizacaoCompra;
}
//#endregion

//#region Obtem um objeto DOM através de uma string HTML - TESTE INTERNO
function ObtemObjDOM(stringHMTL, tag) {
    //tag = 'div', 'p', etc

    // https://dev.to/guiseek/dom-parser-parse-de-string-para-elementos-dom-50de

    console.log(stringHMTL);

    const parser = new DOMParser();
    const objDOM = parser.parseFromString(stringHMTL, "text/xml");
    console.log(objDOM)
    objDOM.getElementsByTagName(tag)[0].childNodes.forEach(function (value) {
        console.log(value.id);
    });
    return objDOM
}
//#endregion