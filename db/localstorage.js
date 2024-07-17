"use strict";

const vazio = '',
    virgula = ',',
    ponto = '.';

/* Gera lista produtos */
function setLista(lista) {
    saveListaStorage(lista);
}

/* Adicionar novo produto */
function addProduto(lista) {
    if (!Valido()) {
        return;
    }

    let temItem = false;
    let id, idHtml, img, nomeP, nome, qtde, qtdeHTML, valor, valorHTML;
    const itens = document.querySelector('.produto-compra').children;
    for (let index = 0; index < itens.length; index++) {
        const element = itens[index];
        const autoId = element.id;
        temItem = true;
        switch (autoId) {
            case 'img':
                img = element.outerHTML
                break;
            case 'id':
                id = element.innerHTML
                idHtml = element.outerHTML
                break;
            case 'nome':
                nomeP = TrocaString(element.innerHTML, 'Óleo Essencial Manacá ', vazio);
                nome = element.outerHTML
                break;
            case 'qtde':
                qtde = element.innerHTML
                qtdeHTML = element.outerHTML
                break;
            case 'valor':
                valor = element.innerHTML
                valor = TrocaString(TrocaString(valor, 'R$ ', vazio), virgula, ponto)
                valorHTML = element.outerHTML
                break
            default:
                break;
        }
    }
    if (temItem) {
        let key = lista.findIndex(obj => obj.id == id);
        if (key < 0) {
            /*
            O método unshift() adiciona um ou mais elementos no início de um array e retorna o número de elementos (propriedade length) atualizado.
            */
            lista.unshift({ 'id': id, 'idHTML': idHtml, 'imagem': img, 'nomeP': nomeP, 'nome': nome, 'qtde': qtde, 'qtdeHTML': qtdeHTML, 'valor': valor, 'valorHTML': valorHTML });
            setLista(lista);
        }
    }
}

/* Atualizando os dados do Produto - USO FUTURO */
function updateProduto(lista, autoId) {
    if (!Valido()) {
        return;
    }
    //Retorna o índice interno do objeto
    const id = lista.findIndex((produto) => Number(produto.id) === Number(autoId));
    if (id < 0) { return; }
    /*
    Tem que alterar a forma de como os elementos estão sendo recuperados. Ver addProduto
    */
    // let id = document.getElementById('id').value;
    let img = document.getElementById('img').value
    let nome = document.getElementById('nome').value;
    let qtde = document.getElementById('qtde').value;
    let valor = document.getElementById('valor').value;

    // Incluir novos atributos caso necessário
    lista[id] = { 'imagem': img, 'nome': nome, 'qtde': qtde, 'valor': valor };
    setLista(lista);
}

/* Atualiza Quantidade do Produto */
function updateQtdeProduto(lista, autoId, qtdeHTML) {

    //Retorna o índice interno do objeto
    const id = lista.findIndex((produto) => Number(produto.id) === Number(autoId));
    if (id < 0) { return; }

    lista[id].qtde = qtdeHTML.outerHTML;
    setLista(lista);
}

/* Deletando Produto */
function deleteProduto(lista, autoId) {

    /* Retorna um objeto contendo todas as informações do produto - Teste Interno */
    // const result = lista.find((produto) => Number(produto.autoId) === Number(autoId));

    //Retorna o índice interno do objeto
    const id = lista.findIndex((produto) => Number(produto.id) === Number(autoId));

    if (id === lista.length - 1) {
        /*
        O método pop() remove o último elemento de um array e retorna aquele elemento.
        */
        lista.pop();
    } else if (id === 0) {
        /*
        O método shift() remove o primeiro elemento de um array e retorna esse elemento. Este método muda o tamanho do array.
        */
        lista.shift();
    } else {
        /*
        O método slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim (fim não é incluído) de um array original.
        O Array original não é modificado.
        */
        let arrAuxIni = lista.slice(0, id);
        let arrAuxEnd = lista.slice(id + 1);
        /*
        O método concat() é utilizado para mesclar dois ou mais arrays. Esse método não altera os arrays existentes, mas, em vez disso, retorna um novo array.
        */
        lista = arrAuxIni.concat(arrAuxEnd);
    }
    // console.log(lista)
    setLista(lista);
}

/* Deleta TODOS os produtos o LocalStorage */
function deletaListaProdutos() {
    const localStorageLT = localStorage.getItem('manaca');;
    if (localStorageLT.length > 0) {
        localStorage.removeItem('manaca');
    }
}

/* Salvando no localStorage */
function saveListaStorage(lista) {
    if (lista.length > 0) {
        let jsonStr = JSON.stringify(lista);
        localStorage.setItem('manaca', jsonStr);
    } else {
        localStorage.removeItem('manaca');
    }
}

/* Verifica se já existe produto e salva a lista */
function initListaStorage() {
    let lista;
    let testList = localStorage.getItem('manaca');
    if (testList) {
        lista = JSON.parse(testList);
    } else {
        lista = new Array();
    }
    setLista(lista);
    return lista;
}

/* Obtem lista da Local Storage */
function getListaStorage() {
    let lista;
    let testList = localStorage.getItem('manaca');
    if (testList) {
        lista = JSON.parse(testList);
    } else {
        lista = new Array();
    }
    return lista;
}

/* Obtem Identificador interno do Produto no Local Storage(LS) */
function getIdProdutoLS(lista, autoId) {
    const id = lista.findIndex((produto) => Number(produto.id) === Number(autoId));
    return id;
}

/* Validar e Gerar Inconsistências  - USO FUTURO */
function Valido() {
    let naoTemErro = true;
    return naoTemErro; /* Para evitar o processamento do código abaixo */
    /*
    Tem que alterar a forma de como os elementos estão sendo recuperados. Ver addProduto
    */
    let id = document.getElementById('id').value
    let img = document.getElementById('img').value
    let nome = document.getElementById('nome').value;
    let qtde = document.getElementById('qtde').value;
    let valor = document.getElementById('valor').value;

    //#region Realiza Algumas Validações de Campos - USO FUTURO
    let errors = "";
    if (nome === "") {
        errors += 'Preencha o nome\n';
    }
    if (qtde === "") {
        errors += 'Preencha a quantidade\n';
    } else if (qtde != parseInt(qtde)) {
        errors += 'Preencha uma quantidade válida\n';
    }
    if (valor === "") {
        errors += 'Preencha um valor\n';
    } else if (valor != parseFloat(valor)) {
        errors += 'Preencha um valor válido\n';
    }
    //#endregion

    if (errors != "") {
        // alert(errors);
        // naoTemErro = false;
    }
    return naoTemErro;
}