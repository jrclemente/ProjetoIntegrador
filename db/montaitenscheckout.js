"use strict";

let subtotalInfo;

//#region Monta Itens Checkout Compras através do Local Storage
function MontaItensCkeckoutLS() {

    let cont = 0;
    // Cria um objeto para guardar as informações do subtotal/quantidade
    subtotalInfo = new Object();
    subtotalInfo.valor = parseFloat(0);

    let localStorageLT = getListaStorage();

    const qtdeCheckout = document.querySelector('.qtdeCheckout');
    qtdeCheckout.innerHTML = `<i class="fa fa-shopping-cart"></i> ${localStorageLT.length}`;

    //Cria o elemento principal(Pai/parent)
    const produtoCheckout = document.querySelector('.produto_Checkout');

    for (let index = 0; index < localStorageLT.length; index++) {
        cont++;
        const element = localStorageLT[index];
        const itemProduto = document.createElement('p')
        itemProduto.className = 'produto';
        const itemRef = document.createElement('a');
        itemRef.href = '#';
        itemRef.innerText = element.nomeP;
        const itemPreco = document.createElement('span');
        itemPreco.className = 'precoUni';
        itemPreco.innerText = `${numeroParaReal(parseFloat(element.valor))}`;
        itemProduto.append(itemRef);
        itemProduto.append(itemPreco);
        produtoCheckout.appendChild(itemProduto);
        // Atribuição de adição
        subtotalInfo.valor += parseFloat(element.valor);
    }
    const linha = document.createElement('hr');
    linha.className = 'horizontal';
    produtoCheckout.appendChild(linha);
    // Subtotal
    const subtotal = document.createElement('p')
    subtotal.className = 'totalCkeckout';
    subtotal.innerText = 'Subtotal'
    const precoSubtotal = document.createElement('span');
    precoSubtotal.className = 'precoTotal';
    precoSubtotal.innerText = `${numeroParaReal(parseFloat(subtotalInfo.valor))}`;
    subtotal.append(precoSubtotal);
    produtoCheckout.appendChild(subtotal);
    // Total
    const total = document.createElement('p')
    total.className = 'totalCkeckout';
    total.innerText = 'Total'
    const precoTotal = document.createElement('span');
    precoTotal.className = 'precoTotal';
    precoTotal.innerText = `${numeroParaReal(CalculaVlrPix(subtotalInfo.valor))}`
    total.append(precoTotal);
    produtoCheckout.appendChild(total);
    MontaParcelas(subtotalInfo);
}
//#endregion

//#region  Monta Parcelas Pagamento
function MontaParcelas(subtotalInfo) {
    const avista = `${numeroParaReal(CalculaVlrPix(subtotalInfo.valor))}`
    const parcela2 = Math.round(subtotalInfo.valor / 2);
    const parcela3 = Math.round(subtotalInfo.valor / 3);
    const parcelasPagto = document.getElementById('parcelasPagto');
    for (let i = 0; i < 4; i++) {
        switch (i) {
            case 1:
                parcelasPagto.children[i].innerHTML = `A vista com desconto ${avista}`;
                break;
            case 2:
                parcelasPagto.children[i].innerHTML = `Em 2x de ${numeroParaReal(parseFloat(parcela2))} sem juros`;
                break;
            case 3:
                parcelasPagto.children[i].innerHTML = `Em 3x de ${numeroParaReal(parseFloat(parcela3))} sem juros`;
                break;

            default:
                break;
        }
    }
}
//#endregion

MontaItensCkeckoutLS();