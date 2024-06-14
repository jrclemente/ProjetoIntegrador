function GeraImagem(descricao) {
    const dirApp = location.pathname;
    // Obtem o diretório onde se encontra a aplicação principal e montar o diretório da imagem
    let inicio = dirApp.indexOf('indice.html'),
        dirImagem = dirApp.substring(0, (inicio)).concat('imagens/'),
        img = `${dirImagem}${descricao}`;
    return img;
}

//#region Dados Produtos (Simula um Banco de Dados)
const obj = {
    "produtos": [{
        "imagem": `${GeraImagem('IMG-20240422-WA0011.jpg')}`,
        "id": 1,
        "nome": 'Óleo Essencial Manacá PALMA-ROSA',
        "descricao": `O óleo essencial de palmarosa tem propriedades antioxidante e hidratante e é um poderoso
      regenerador da pele, atuando no combate a marcas de acnes, manchas de sol, linhas de expressão,
      dermatites, estrias e cicatrizes.
      É muito indicado para peles maduras, ressecadas e envelhecidas.`,
        "valor": 55.00,
        "tamanho": '15ml',
        "avaliacoes": [
            "alternativa A",
            "alternativa B",
            "alternativa C",
            "alternativa D",
            "alternativa E"
        ]
    }, {
        "imagem": `${GeraImagem('IMG-20240422-WA0012.jpg')}`,
        "id": 2,
        "nome": 'Óleo Essencial Manacá FUNCHO',
        "descricao": `Tem ação diurética, auxiliando a reduzir edemas e celulite, quando utilizado em massagens e
      drenagens linfáticas.
      Pode ajudar a promover a atividade funcional do estômago, para isso dilua em óleo vegetal, como
      o de Semente de Uva ou Gergelim e massageie a região do estômago.`,
        "valor": 35.00,
        "tamanho": '15ml',
        "avaliacoes": [
            "alternativa A",
            "alternativa B",
            "alternativa C",
            "alternativa D",
            "alternativa E"
        ]
    }, {
        "imagem": `${GeraImagem('IMG-20240422-WA0014.jpg')}`,
        "id": 3,
        "nome": 'Óleo Essencial Manacá BERGAMOTA',
        "descricao": `O óleo essencial de Bergamota possui propriedade antidepressiva, alivia tensão e ansiedade,
      ajuda no combate à insônia e regula o apetite.
      Também é digestivo e carminativo, estimula fígado, baço e estômago, ajuda em casos de
      flatulência, dispepsia, cólicas e náuseas.`,
        "valor": 45.00,
        "tamanho": '15ml',
        "avaliacoes": [
            "alternativa A",
            "alternativa B",
            "alternativa C",
            "alternativa D",
            "alternativa E"
        ]
    }, {
        "imagem": `${GeraImagem('IMG-20240422-WA0015.jpg')}`,
        "id": 4,
        "nome": 'Óleo Essencial Manacá LARANJA-DOCE',
        "descricao": `Tradicionalmente, as laranjas eram oferecidas aos outros como símbolo de boa sorte.
      Embora essa fruta tenha inúmeras espécies diferentes, o óleo essencial de laranja doce é considerado um dos mais comuns de serem encontrados. Com tons de amarelo bem escuro, produz um aroma doce e cítrico.
      A China foi a primeira região a descobrir os benefícios do óleo essencial de laranja doce.
      E até hoje, este elemento é usado para auxiliar no combate de bactérias, na redução da inflamação, além da possibilidade de melhorar a saúde da pele.`,
        "valor": 80.00,
        "tamanho": '15ml',
        "avaliacoes": [
            "alternativa A",
            "alternativa B",
            "alternativa C",
            "alternativa D",
            "alternativa E"
        ]
    }, {
        "imagem": `${GeraImagem('IMG-20240422-WA0016.jpg')}`,
        "id": 5,
        "nome": 'Óleo Essencial Manacá ALEGRIM',
        "descricao": `O óleo essencial de alecrim promove a melhora da circulação sanguínea, além de possuir
      propriedades analgésicas, ajudando em tratamentos de cãibras, de dores musculares e das
      articulações.
      Também ajuda a eliminar as toxinas do organismo, sendo super eficaz na hora de diminuir as
      gordurinhas localizadas.`,
        "valor": 25.00,
        "tamanho": '15ml',
        "avaliacoes": [
            "alternativa A",
            "alternativa B",
            "alternativa C",
            "alternativa D",
            "alternativa E"
        ]
    }
    ]
}
//#endregion

export default function getProdutos() {
    return obj;
}