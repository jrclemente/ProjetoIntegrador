let msgCookies = document.getElementById('cookies-mgs')

let hoje = DataAtual();
// let idAceitoLGPD = `LGPD.ACEITO ${hoje}`;
let idAceitoLGPD = "LGPD.ACEITO";

function Aceitar(){    
    localStorage.idLGPD = idAceitoLGPD;
    // Remove uma classe - nome da classe: exibir - dinamicamente, através dE configuração no CSS
    msgCookies.classList.remove('exibir');
}

if(localStorage.idLGPD == idAceitoLGPD){
    msgCookies.classList.remove('exibir');
}else{
    msgCookies.classList.add('exibir');
}

function Personalizar(){

}

function Desabilitar(){

}

function DataAtual() {
    let hoje = new Date();
    let dia = hoje.getDate(),
        mes = hoje.getMonth(),
        ano = hoje.getFullYear();
    let hora = hoje.getHours(),
        minutos =  hoje.getMinutes(),
        segundos = hoje.getSeconds();
    //Concatenando utilizando: `template string`
    let dataF = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    // return hoje.getDate() + "/" + hoje.getMonth() + "/" + hoje.getFullYear() + " "
    //     + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds();
    return dataF;
}