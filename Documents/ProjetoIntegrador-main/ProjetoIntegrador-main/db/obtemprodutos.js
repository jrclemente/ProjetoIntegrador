import obtemProdutos from './dados.js';

const objeto = obtemProdutos();
// const objeto = getProdutos();

let cont = 0;

//Criar um Elemento Principal(Pai/parent):
const secao = document.querySelector('.secao4')

//Criar um Elemento Pai(Filho(Child)-1):
const secaoDiv = document.createElement('div');
secaoDiv.className = 'secao4-div';

objeto.produtos.forEach(element => {

    //Criar um Elemento Filho(Child)-2:
    const secaoDivCard = document.createElement('div');
    secaoDivCard.className = 'secao4-div-card';

    cont++;
    secaoDivCard.id = `produto_${cont}`

    secaoDivCard.innerHTML = `
    <img class="imagemProduto" decoding="async" src=${element.imagem} alt=imagem do card ${cont}>
    <h3>${element.nome}</h3>
    <article>
        ${element.descricao}
    </article>    
    <a href=paginas/produto.html?id=${element.id} class="btn-verProduto">VER PRODUTO</a>
    `
    //Adicionar o Elemento(Filho/Child) ao Pai(parent):
    secaoDiv.appendChild(secaoDivCard)

    //Adicionar o Elemento(Filho/Child) na Página(Pai/parent):
    secao.appendChild(secaoDiv);
});