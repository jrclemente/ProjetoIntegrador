"use strict";

let subtotalInfo;

let valorReferencia = 0,
    qtdeReferencia = 0,
    qtdeProdutoAtual = 1;

//#region Cria elementos para a Quantidade de Produtos
function GeraQuantidade(objProduto, qtde, origem) {
    const sectionCarrinho = document.createElement('section');
    sectionCarrinho.className = 'qtdeCarrinho';
    sectionCarrinho.id = 'idQtdeCarrinho';
    const btnProdutoQtde = document.createElement('div');
    btnProdutoQtde.className = 'btn-QtdeProduto';
    sectionCarrinho.appendChild(btnProdutoQtde);
    
    subtotalInfo = new Object();
    subtotalInfo.valor = objProduto.valor;
    subtotalInfo.quantidade = qtde;
    valorReferencia = objProduto.valor;
    qtdeReferencia = subtotalInfo.quantidade;
    let nomebtn1 = 'btnSubtrair',
        nomebtn2 = 'btnAdicionar';
    if (origem == 2) {
        /* 2=MontaDadosLocalStorage */
        nomebtn1 = 'btnSubtrairLS';
        nomebtn2 = 'btnAdicionarLS';
    }
    
    // GeraBotao('-', 'btnSubtrair', btnProdutoQtde);
    GeraBotao('-', nomebtn1, btnProdutoQtde);
    GeraInput(btnProdutoQtde);
    // GeraBotao('+', 'btnAdicionar', btnProdutoQtde);
    GeraBotao('+', nomebtn2, btnProdutoQtde);

    return sectionCarrinho
}
//#endregion

//#region Cria os elementos para o Subtotal e Total

function GeraElementosSubTotal(secaoDivCard) {
    const subTotal = document.createElement('section');
    subTotal.className = 'subTotal-Section';
    subTotal.id = 'idSubtotal-Section';
    
    const subTotalLabel = document.createElement('div');
    subTotalLabel.className = 'subtotal-Label';
    const subTotalDados = document.createElement('div');
    subTotalDados.className = 'subtotal-Dados';
    
    // &#160; ou &nbsp; - Para definir espaço no HTML
    const labelQuantidade = document.createElement('label');
    labelQuantidade.innerHTML = "Quantidade:"
    const labelSubtotal = document.createElement('label');
    labelSubtotal.innerHTML = 'Subtotal&nbsp; &nbsp; &nbsp;:'
    const labelTotal = document.createElement('label');
    labelTotal.innerHTML = 'Total&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:';
    
    subTotalLabel.append(labelQuantidade);
    subTotalLabel.append(labelSubtotal);
    subTotalLabel.append(labelTotal);
    subTotal.appendChild(subTotalLabel);/* Adiciona ao principal */
    
    const qtdeTotal = document.createElement('p');
    qtdeTotal.id = 'qtdeSubtotal'
    subTotalDados.appendChild(qtdeTotal);
    
    const valorSubtotal = document.createElement('p');
    valorSubtotal.id = 'valorSubtotal'
    subTotalDados.appendChild(valorSubtotal);
    
    const total = document.createElement('p');
    total.id = 'totalSubtotal'
    subTotalDados.appendChild(total);
    
    subTotal.appendChild(subTotalDados);
    
    secaoDivCard.appendChild(subTotal);/* Adiciona ao principal */
    return secaoDivCard;
}
//#endregion

//#region Monta Botões Controle de Quantidade/Subtotal

function GeraBotao(texto, nomeClasse, btnProdutoQtde) {
    const elemento = document.createElement('button');
    elemento.id = nomeClasse
    elemento.innerText = texto;
    if (texto === "-") {
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
//#endregion

//#region Funções de Atualizações Qtde/Subtotal

function Adicionar(quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrair) {

    //Atualiza a quantidade do item na página do produto de compra
    qtdeProdutoAtual++;
    qtdeItemProdutoHTML.innerText = `Quantidade: ${qtdeProdutoAtual}`;
    const localStorageLT = getListaStorage();
    updateQtdeProduto(localStorageLT, objHTML.idProdutoAtual, qtdeItemProdutoHTML)

    // operador incremento adição
    quantidadeProduto.value++;

    // subtotalInfo.quantidade++;
    objHTML.quantidadeSubtotal = AtualizaSubTotal(1, objHTML.quantidadeSubtotal, subtotalInfo);

    // Atribuição de adição
    subtotalInfo.valor += valorReferencia;
    objHTML.valorSubtotal = AtualizaSubTotal(2, objHTML.valorSubtotal, subtotalInfo);

    objHTML.total = AtualizaSubTotal(3, objHTML.total, subtotalInfo);

    btnSubtrair.disabled = false;

    // return { quantidadeProduto, subtotalInfo, objHTML } - USO FUTURO
}

function Subtrair(quantidadeProduto, subtotalInfo, objHTML, qtdeItemProdutoHTML, btnSubtrair) {

    // operador incremento subtração
    qtdeProdutoAtual--;
    qtdeItemProdutoHTML.innerText = `Quantidade: ${qtdeProdutoAtual}`;
    const localStorageLT = getListaStorage();
    updateQtdeProduto(localStorageLT, objHTML.idProdutoAtual, qtdeItemProdutoHTML)

    quantidadeProduto.value--;

    if (quantidadeProduto.value <= quantidadeProduto.min) {
        quantidadeProduto.value = qtdeReferencia;
        // subtotalInfo.quantidade = qtdeReferencia;
        subtotalInfo.valor = valorReferencia;
        btnSubtrair.disabled = true;
    } else {
        // subtotalInfo.quantidade--;
        // Atribuição de Subtração
        subtotalInfo.valor -= valorReferencia.toFixed(2);
        if (subtotalInfo.quantidade == 1) {
            btnSubtrair.disabled = true;
        }
    }

    objHTML.quantidadeSubtotal = AtualizaSubTotal(1, objHTML.quantidadeSubtotal, subtotalInfo);
    objHTML.valorSubtotal = AtualizaSubTotal(2, objHTML.valorSubtotal, subtotalInfo);
    objHTML.total = AtualizaSubTotal(3, objHTML.total, subtotalInfo);

    // return { quantidadeProduto, subtotalInfo, objHTML } - USO FUTURO
}

function AtualizaSubTotal(tpCampo, campo, subtotalInfo) {
    switch (tpCampo) {
        case 1:
            // quantidadeSubtotal.innerText = `${subtotalInfo.quantidade} item(s)`;
            campo.innerText = `${subtotalInfo.quantidade} item(s)`;
            break;
        case 2:
            // valorSubtotal.innerText = `${numeroParaReal(subtotalInfo.valor)}`;
            campo.innerText = `${numeroParaReal(subtotalInfo.valor)}`;
            break;
        case 3:
            // total.innerText = `${numeroParaReal(CalculaVlrPix(subtotalInfo.valor))}`
            campo.innerText = `${numeroParaReal(CalculaVlrPix(subtotalInfo.valor))}`
            break;
        default:
            break;
    }
    return campo;
}

function AtualizaSubTotalHistorico(localStorageLT, qtdeItensCarrinho) {
    subtotalInfo = new Object();
    subtotalInfo.valor = parseFloat(0)
    for (let index = 0; index < localStorageLT.length; index++) {
        const element = localStorageLT[index];
        // Atribuição de adição
        subtotalInfo.valor += parseFloat(element.valor);
    }
    subtotalInfo.quantidade = parseInt(qtdeItensCarrinho);
    let quantidadeSubtotal = document.getElementById("qtdeSubtotal");
    quantidadeSubtotal = AtualizaSubTotal(1, quantidadeSubtotal, subtotalInfo);
    let valorSubtotal = document.getElementById("valorSubtotal");
    valorSubtotal = AtualizaSubTotal(2, valorSubtotal, subtotalInfo);
    let total = document.getElementById('totalSubtotal');
    total = AtualizaSubTotal(3, total, subtotalInfo);
}
//#endregion