"use strict";

//#region  Monta controle de para verificação item válido
let inputCorretos = new Object();
inputCorretos.nome = false;
inputCorretos.cpf = false;
inputCorretos.dtNascimento = false;
inputCorretos.sexo = false;
inputCorretos.telefone = true;
inputCorretos.celular = false;
inputCorretos.email = false;
inputCorretos.senha = false;
inputCorretos.confirSenha = true;
inputCorretos.cep = false;
inputCorretos.tpLogradouro = false;
inputCorretos.logradouro = false;
inputCorretos.numero = true;
inputCorretos.complemento = false;
inputCorretos.bairro = false;
inputCorretos.cidade = false;
inputCorretos.estado = false;
//
let itensValidacao = [
    {
        id: 'nome',
        valido: false
    },
    {
        id: 'cpf',
        valido: false
    },
    {
        id: 'dtNascimento',
        valido: false
    },
    {
        id: 'sexo',
        valido: false
    },
    {
        id: 'telefone',
        valido: false
    },
    {
        id: 'celular',
        valido: false
    },
    {
        id: 'email',
        valido: false
    },
    {
        id: 'senha',
        valido: false
    },
    {
        id: 'confirSenha',
        valido: false
    },
    {
        id: 'cep',
        valido: false
    },
    {
        id: 'tpLogradouro',
        valido: false
    },
    {
        id: 'logradouro',
        valido: false
    },
    {
        id: 'numero',
        valido: false
    },
    {
        id: 'complemento',
        valido: false
    },
    {
        id: 'bairro',
        valido: false
    },
    {
        id: 'cidade',
        valido: false
    },
    {
        id: 'estado',
        valido: false
    },
]
//#endregion

const vazio = '',
    traco = '-',
    ponto = '.';
let tituloModal;

// Verifica valores repetidos sequencialmente
const eRepetidos = function (str) {
    return /([0-9])\1+/g.test(str);
}

function senhaValida(senha) {
    let eValida = true;
    const er = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z])(?!\1)|[!@#$%;*(){}_+^&]){6,}$/);
    if ((senha == '') || (!er.test(senha))) {
        eValida = false;
    }
    return eValida;
}
function emailValido(email) {
    let eValido = true;
    const er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if ((email == '') || (!er.test(email))) {
        eValido = false;
    }
    return eValido;
}

function CEPValido(event) {
    let cep = event.value;
    cep = TrocaString(cep, traco, vazio);
    if (eRepetidos(cep)) {
        formEndereco.cep_Cad.focus();
        tituloModal = 'CEP inválido!'
        AbrirPopUp(tituloModal, 'CEP não pode ter valores repetidos!', 1);
    }
}
function MostraMensCampoObr(campoInput, label) {
    // Mostrar 'popup' de campo obrigatório
    campoInput.addEventListener('focus', function () {
        label.classList.add('required-popup')
    })
    // Ocultar 'popup' de campo obrigatório
    campoInput.addEventListener('blur', function () {
        label.classList.remove('required-popup')
    })
}

function VerificaObr(e) {
    let pesquisa,
        label;
    // Inicializa o valor do campo(input) quando este recebe focus
    e.value = ''
    const id = e.id;
    pesquisa = `label[for=${id}]`
    switch (id) {
        case 'nome_cad':
        case 'cpf_cad':
        case 'data_nasc_cad':
        case 'sexo_Cad':
        case 'cel_cad':
        case 'email_cad':
        case 'senha_Cad':
        case 'senhaConfir_Cad':
            label = document.querySelector(pesquisa);
            break;
        case 'cep_Cad':
        case 'tipoEnd_Cad':
        case 'logradouro_Cad':
        case 'numero_Cad':
        case 'bairro_Cad':
        case 'cidade_Cad':
        case 'estado_Cad':
            label = document.querySelector(pesquisa);
            break;
        default:
            break;
    }
    if ((label != null) && (typeof label != "undefined")) {
        // label.classList.add('required-popup');
        label.classList.toggle('required-popup');
    }
}

function RetiraObr(e) {
    let pesquisa,
        label;
    const id = e.id;
    pesquisa = `label[for=${id}]`
    switch (id) {
        case 'nome_cad':
        case 'cpf_cad':
        case 'data_nasc_cad':
        case 'sexo_Cad':
        case 'cel_cad':
        case 'email_cad':
        case 'senha_Cad':
        case 'senhaConfir_Cad':
            label = document.querySelector(pesquisa);
            break;
        case 'cep_Cad':
        case 'tipoEnd_Cad':
        case 'logradouro_Cad':
        case 'numero_Cad':
        case 'bairro_Cad':
        case 'cidade_Cad':
        case 'estado_Cad':
            label = document.querySelector(pesquisa);
            break;
        default:
            break;
    }
    if ((label != null) && (typeof label != "undefined")) {
        // label.classList.remove('required-popup')
        label.classList.toggle('required-popup')
    }
}

//#region Valida CPF
function VerificaCPF(strCpf) {
    let soma = 0,
        resto,
        i;
    if (strCpf == "00000000000") {
        return false;
    }

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }
    return true;
}
//#endregion

function ValidaDados(event) {
    let required;
    let dadosValidos = true;
    /*
    Existem duas formas de recuperar a informação do input em um formulário:
    via getElementById ou do próprio nome do formulário(Tem que estar com a propriedade 'name' preenchido)
    const nome = document.getElementById('nome_cad')
    */

    //#region Consiste Dados Pessoais

    //#region Nome
    const nome = formCadastro.nome_cad.value;
    required = formCadastro.nome_cad.required
    if (required) {
        if (nome.trim() == "") {
            dadosValidos = false;
            // formCadastro.nome_cad.focus();
        } else {
            inputCorretos.nome = true;
            itensValidacao[0].valido = true;
        }
    }
    //#endregion

    //#region CPF
    let cpf = formCadastro.cpf_cad.value;
    // O ponto tem que ficar dentro dos colchetes para ele poder ser "escapado" pelo Regex
    const regex = /[.]/g;
    cpf = TrocaString(TrocaString(cpf, regex, vazio), traco, vazio);
    required = formCadastro.cpf_cad.required
    if (required) {
        if (cpf.trim() == "") {
            dadosValidos = false;
            // formCadastro.cpf_cad.focus();
        } else {
            if (eRepetidos(cpf)) {
                dadosValidos = false;
                // formCadastro.cpf_cad.focus();
            } else {
                if (!VerificaCPF(cpf.toString())) {
                    dadosValidos = false;
                    // formCadastro.cpf_cad.focus();
                } else {
                    inputCorretos.cpf = true
                    itensValidacao[1].valido = true;
                }
            }
        }
    }
    //#endregion

    //#region Data Nascimento
    const dtNascimento = formCadastro.data_nasc_cad.value;
    required = formCadastro.data_nasc_cad.required
    if (required) {
        if (dtNascimento.trim() == "") {
            dadosValidos = false;
            // formCadastro.data_nasc_cad.focus();
        } else {
            inputCorretos.dtNascimento = true;
            itensValidacao[2].valido = true;
        }
    }
    //#endregion

    //#region Sexo
    const sexo = formCadastro.sexo_Cad.value;
    required = formCadastro.sexo_Cad.required
    if (required) {
        if (sexo.trim() == "") {
            dadosValidos = false;
            // formCadastro.sexo_Cad.focus();
        } else {
            inputCorretos.sexo = true;
            itensValidacao[3].valido = true;
        }
    }
    //#endregion

    //#region Telefone
    const telefone = formCadastro.tel_cad.value;
    required = formCadastro.tel_cad.required
    if (required) {
        if (telefone.trim() == "") {
            dadosValidos = false;
            // formCadastro.tel_cad.focus();
        } else {
            inputCorretos.telefone = true;
            itensValidacao[4].valido = true;
        }
    } else {
        itensValidacao[4].valido = true;
    }
    //#endregion

    //#region Celular
    const celular = formCadastro.cel_cad.value;
    required = formCadastro.cel_cad.required
    if (required) {
        if (celular.trim() == "") {
            dadosValidos = false;
            // formCadastro.cel_cad.focus();
        } else {
            inputCorretos.celular = true;
            itensValidacao[5].valido = true;
        }
    }
    //#endregion

    //#region Email
    const email = formCadastro.email_cad.value;
    required = formCadastro.email_cad.required
    if (required) {
        if (email.trim() == "") {
            dadosValidos = false;
            // formCadastro.email_cad.focus();
        } else {
            if (!emailValido(email)) {
                dadosValidos = false;
                // formCadastro.email_cad.focus();
            } else {
                inputCorretos.email = true;
                itensValidacao[6].valido = true;
            }
        }
    }
    //#endregion

    //#region Senha
    const senha = formCadastro.senha_Cad.value;
    required = formCadastro.senha_Cad.required
    if (required) {
        if (senha.trim() == "") {
            dadosValidos = false;
            // formCadastro.senha_Cad.focus();
        } else {
            if (eRepetidos(senha)) {
                dadosValidos = false;
                // formCadastro.senha_Cad.focus();
            } else {
                if (senha.length < 8) {
                    dadosValidos = false;
                    // formCadastro.senha_Cad.focus();
                } else {
                    if (!senhaValida(senha)) {
                        dadosValidos = false;
                        // formCadastro.senha_Cad.focus();
                    } else {
                        inputCorretos.senha = true;
                        itensValidacao[7].valido = true;
                    }
                }
            }
        }
    }
    //#endregion

    //#region Confirma Senha
    const confirSenha = formCadastro.senhaConfir_Cad.value;
    required = formCadastro.senhaConfir_Cad.required
    if (required) {
        if (confirSenha.trim() == "") {
            dadosValidos = false;
            // formCadastro.senhaConfir_Cad.focus();
        } else {
            if (!(senha === confirSenha)) {
                dadosValidos = false;
                // formCadastro.senhaConfir_Cad.focus();
            } else {
                inputCorretos.confirSenha = true;
                itensValidacao[8].valido = true;
            }
        }
    }
    //#endregion    

    //#endregion

    //#region Consiste Dados Endereço

    //#region  CEP
    let cep = formEndereco.cep_Cad.value;
    cep = TrocaString(cep, traco, vazio);
    required = formEndereco.cep_Cad.required
    if (required) {
        if (cep.trim() == "") {
            dadosValidos = false;
            // formEndereco.cep_Cad.focus();
        } else {
            if (eRepetidos(cep)) {
                dadosValidos = false;
                // formEndereco.cep_Cad.focus();
            } else {
                inputCorretos.cep = true;
                itensValidacao[9].valido = true;
            }
        }
    }
    //#endregion

    //#region Tipo Logradouro
    const tpLogradouro = formEndereco.tipoEnd_Cad.value;
    required = formEndereco.tipoEnd_Cad.required
    if (required) {
        if (tpLogradouro.trim() == "") {
            dadosValidos = false;
            // formEndereco.tipoEnd_Cad.focus();
        } else {
            inputCorretos.tpLogradouro = true;
            itensValidacao[10].valido = true;
        }
    }
    //#endregion

    //#region Logradouro
    const logradouro = formEndereco.logradouro_Cad.value;
    required = formEndereco.logradouro_Cad.required
    if (required) {
        if (logradouro.trim() == "") {
            dadosValidos = false;
            // formEndereco.logradouro_Cad.focus();
        } else {
            inputCorretos.logradouro = true;
            itensValidacao[11].valido = true;
        }
    }
    //#endregion

    //#region Número
    const numero = formEndereco.numero_Cad.value;
    required = formEndereco.numero_Cad.required
    if (required) {
        if (numero.trim() == "") {
            dadosValidos = false;
            // formEndereco.numero_Cad.focus();
        } else {
            inputCorretos.numero = true;
            itensValidacao[12].valido = true;
        }
    }
    //#endregion

    //#region Complemento
    const complemento = formEndereco.compl_Cad.value;
    required = formEndereco.compl_Cad.required
    if (required) {
        if (complemento.trim() == "") {
            dadosValidos = false;
            // formEndereco.compl_Cad.focus();
        } else {
            inputCorretos.complemento = true;
            itensValidacao[13].valido = true;
        }
    }
    //#endregion

    //#region Bairro
    const bairro = formEndereco.bairro_Cad.value;
    required = formEndereco.bairro_Cad.required
    if (required) {
        if (bairro.trim() == "") {
            dadosValidos = false;
            // formEndereco.bairro_Cad.focus();
        } else {
            inputCorretos.bairro = true;
            itensValidacao[14].valido = true;
        }
    }
    //#endregion

    //#region Cidade
    const cidade = formEndereco.cidade_Cad.value;
    required = formEndereco.cidade_Cad.required
    if (required) {
        if (cidade.trim() == "") {
            dadosValidos = false;
            // formEndereco.cidade_Cad.focus();
        } else {
            inputCorretos.cidade = true;
            itensValidacao[15].valido = true;
        }
    }
    //#endregion

    //#region Estado(UF)
    const estado = formEndereco.estado_Cad.value;
    required = formEndereco.estado_Cad.required
    if (required) {
        if (estado.trim() == "") {
            dadosValidos = false;
            // formEndereco.estado_Cad.focus();
        } else {
            inputCorretos.estado = true;
            itensValidacao[16].valido = true;
        }
    }
    //#endregion

    //#endregion

    //#region Verifica Situação Itens
    let temItemInvalido = false
    for (const key in itensValidacao) {
        if (temItemInvalido) {
            dadosValidos = false;
            break;
        }
        if (Object.hasOwnProperty.call(itensValidacao, key)) {
            const element = itensValidacao[key];
            const id = element.id
            const valido = element.valido
            switch (id) {
                case 'nome':
                    if (!valido) {
                        formCadastro.nome_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'cpf':
                    if (!valido) {
                        formCadastro.cpf_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'dtNascimento':
                    if (!valido) {
                        formCadastro.data_nasc_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'sexo':
                    if (!valido) {
                        formCadastro.sexo_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'telefone':
                    if (!valido) {
                        formCadastro.tel_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'celular':
                    if (!valido) {
                        formCadastro.cel_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'email':
                    if (!valido) {
                        formCadastro.email_cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'senha':
                    if (!valido) {
                        formCadastro.senha_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'confirSenha':
                    if (!valido) {
                        formCadastro.senhaConfir_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'cep':
                    if (!valido) {
                        formEndereco.cep_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'tpLogradouro':
                    if (!valido) {
                        formEndereco.tipoEnd_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'logradouro':
                    if (!valido) {
                        formEndereco.logradouro_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'numero':
                    if (!valido) {
                        formEndereco.numero_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'complemento':
                    if (!valido) {
                        formEndereco.compl_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'bairro':
                    if (!valido) {
                        formEndereco.bairro_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'cidade':
                    if (!valido) {
                        formEndereco.cidade_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                case 'estado':
                    if (!valido) {
                        formEndereco.estado_Cad.focus();
                        temItemInvalido = true;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    //#endregion

    return dadosValidos;
}

//#region Envio Dados do Cadastro
const btnSubmit = document.getElementById("btnSubmit");
// btnSubmit.addEventListener("click", Submit);Utilizando este modelo se faz necessário criar o método Submit, com os mesmo controles abaixo
if ((btnSubmit != null) && (typeof btnSubmit != "undefined")) {
    btnSubmit.addEventListener('click', (event) => {
        const dadosValidos = ValidaDados(event)
        if (dadosValidos) {
            tituloModal = 'Envio do Cadastro'
            AbrirPopUp(tituloModal, `Cadastro Realizado com Sucesso! Time stamp: ${event.timeStamp}`, 2);
            event.preventDefault();
        } else {
            tituloModal = 'Preenchimento de Campos!'
            AbrirPopUp(tituloModal, 'Favor preencher o(s) campo(s) obrigatório(s) em destaque!', 1);
            event.preventDefault();
            // event.stopPropagation();
        }
    })
}
//#endregion

//#region Envio Dados do Contato
const btnSubmitContato = document.getElementById("btnSubmitContato");
if ((btnSubmitContato != null) && (typeof btnSubmitContato != "undefined")) {
    btnSubmitContato.addEventListener('click', (event) => {
        let dadosContatoOK = true;
        const contatoNome = formContato.contatoNome.value.trim();
        const contatoEmail = formContato.contatoEmail.value.trim();
        const contatoMensagem = formContato.contatoMensagem.value.trim();
        if ((contatoNome == "") || (contatoEmail == "") || (contatoMensagem == "")) {
            dadosContatoOK = false;
        }
        if (dadosContatoOK) {
            tituloModal = 'Envio do Contato'
            AbrirPopUp(tituloModal, `Envio da mensagem de contato realizada com Sucesso! Time stamp: ${event.timeStamp}`, 2);
            event.preventDefault();
        } else {
            tituloModal = 'Preenchimento de Campos!'
            AbrirPopUp(tituloModal, 'Favor preencher o(s) campo(s) obrigatório(s) em destaque!', 1);
            event.preventDefault();
            // event.stopPropagation();
        }
    })
}
//#endregion

//#region Envio Dados Login
const btnSubmitLogin = document.getElementById("btnSubmitLogin");
if ((btnSubmitLogin != null) && (typeof btnSubmitLogin != "undefined")) {
    btnSubmitLogin.addEventListener('click', (event) => {
        let dadosLogingOK = true;
        const nomeLogin = formLogin.nome_login.value.trim();
        const senhaLogin = formLogin.senha_login.value.trim();
        if ((nomeLogin == "") || (senhaLogin == "") ) {
            dadosLogingOK = false;
        }
        if (dadosLogingOK) {
            tituloModal = 'Envio Login'
            AbrirPopUp(tituloModal, `Login realizado com Sucesso! Time stamp: ${event.timeStamp}`, 2);
            event.preventDefault();
        } else {
            tituloModal = 'Preenchimento de Campos!'
            AbrirPopUp(tituloModal, 'Favor preencher o(s) campo(s) obrigatório(s) em destaque!', 1);
            event.preventDefault();
            // event.stopPropagation();
        }
    })
}
//#endregion