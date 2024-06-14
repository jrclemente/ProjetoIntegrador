// import { AnoAtual } from './util.js';

// Controle jquery para chamar a página LGPD
$(document).ready(function () {
    let caminho = "/paginas/lgpd.html"
    $("#conteudoLGPDlgpd").load(caminho, function () {
        // alert("O Load da página foi realizada!");
    });
});
//Monta as páginas de Cabeçalho e Rodapé:
$(document).ready(function () {
    // *** Linha abaixo foi alterada ***
    $('#header').load("/paginas/includes/header.html");
    $('#footer').load("/paginas/includes/footer.html");
});
// Outra forma de montar uma página:
// $(document).ready(function () {
//     $.get("/paginas/includes/header.html", function (data) {
//         $("#header").html(data);
//     });
// });

//Gera o ano atual no texto do rodapé(Antes verifica se o elemento(#anoHoje) da página foi carregado)
// $("#anoHoje").on("load", function () {
//     document.getElementById('anoHoje').innerHTML = `&copy; ${AnoAtual()} Todos os direitos reservados`;
// });
$(window).on('load', function () {
    $('#anoHoje').html(`&copy; ${AnoAtual()} *** Todos os direitos reservados ***`);
})
$(document).ready(function () {   
    let texto = `&copy; ${AnoAtual()} ** Todos os direitos reservados **`
    $('#anoHoje').text(texto);
});

function AnoAtual() {
    let hoje = new Date(),
        ano = hoje.getFullYear();
    return ano;
};

//#region Teste Interno
// let host = location.host,
//     porta = location.port,
//     urlAtual = location.href,
//     pathName = location.pathname,
//     protocolo = location.protocol,
//     search = location.search;

// console.log(`URL: ${urlAtual}`);
// console.log(`PROTOCOLO: ${protocolo}`);
// console.log(`HOST: ${host}`);
// console.log(`PORTA: ${porta}`);
// console.log(`CAMINHO: ${pathName}`);
// console.log(`SEARCH: ${search}`);
//#endregion