// Função para carregar o conteúdo da página
function navigate(page) {
    // console.log(`Aqui: ${page}`);
    const content = document.getElementById('content');
    /* 
    XMLHttpRequest é um objeto que permite que os navegadores
    realizem solicitações para um servidor web de forma assíncrona.
    Com ele, é possível enviar(POST) e receber(GET) dados sem a necessidade de atualizar toda a página.
    */
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        /*  Os diferentes estágios da requisição:
            quando a requisição é enviada (readyState igual a 1),
            quando a resposta começa a ser recebida (readyState igual a 2),
            quando a resposta está sendo processada (readyState igual a 3) e
            quando a resposta está completa (readyState igual a 4).
        */
        // A requisição foi concluída com sucesso
        if (this.readyState == 4 && this.status == 200) {
            content.innerHTML = this.responseText;
        } else {
            // Ocorreu um erro durante a requisição - 404=Not Found
            if (this.readyState == 4 && this.status == 404) {
                alert(`Erro: ${this.status} - Página não encontrada (${this.statusText}) ${this.responseText}`)
            }
        }
    };
    xhttp.open('GET', page + '.html', true);
    xhttp.send();
}

//O controle abaixo é para inibir a opção de ver o código fonte da pagina quando
//o usuario utiliza a opção do botão direito do mouse.
//Mas este controle não é 100% seguro. Um bom programador consegue visualizar o código fonte(Control+u)
//Uma opção muito melhor seria lidar com o seu servidor de lógica, e apenas enviar ao cliente
// a informação que eles precisam saber / solicitar.
//Observação: isso não é recomendado em seu site.
document.addEventListener('contextmenu', event => event.preventDefault());