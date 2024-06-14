function AnoAtual() {
    let hoje = new Date(),
        ano = hoje.getFullYear();
    return ano;
}
function numeroParaReal(numero) {
    return "R$ " + numero.toFixed(2).replace('.', ',');
}