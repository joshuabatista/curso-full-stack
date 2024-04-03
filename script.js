
let participantes = [
    {
        nome: "Joshua B.",
        email: "joshuabatista40@gmail.com",
        dataInscricao: new Date(2020, 1, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Maria S.",
        email: "mariasilva@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 10, 15),
        dataCheckIn: null
    },
    {
        nome: "Pedro A.",
        email: "pedroalmeida@gmail.com",
        dataInscricao: new Date(2024, 2, 24, 14, 45),
        dataCheckIn: new Date(2024, 2, 27, 10, 0)
    },
    {
        nome: "Ana R.",
        email: "anarodrigues@gmail.com",
        dataInscricao: new Date(2024, 2, 25, 16, 0),
        dataCheckIn: null
    },
    {
        nome: "Luiz F.",
        email: "luizfernandes@gmail.com",
        dataInscricao: new Date(2024, 2, 26, 8, 30),
        dataCheckIn: new Date(2024, 2, 29, 14, 45)
    },
    {
        nome: "Carla M.",
        email: "carlamartins@gmail.com",
        dataInscricao: new Date(2024, 2, 27, 11, 45),
        dataCheckIn: new Date(2024, 2, 30, 17, 30)
    },
    {
        nome: "Rafaela C.",
        email: "rafaelacosta@gmail.com",
        dataInscricao: new Date(2024, 2, 28, 13, 0),
        dataCheckIn: null
    },
    {
        nome: "Daniel G.",
        email: "danielgomes@gmail.com",
        dataInscricao: new Date(2024, 2, 29, 17, 20),
        dataCheckIn: null
    },
    {
        nome: "Camila P.",
        email: "camilapereira@gmail.com",
        dataInscricao: new Date(2024, 2, 30, 20, 10),
        dataCheckIn: new Date(2024, 3, 3, 14, 30)
    },
    {
        nome: "João M.",
        email: "joaomachado@gmail.com",
        dataInscricao: new Date(2024, 2, 31, 22, 0),
        dataCheckIn: null
    }
];

const criarNovoParticipante = (participante) => {

    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    //condicional

    if(participante.dataCheckIn == null) {

        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)"> 
                Confirmar Check-in
            </button>
        `
    }


    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
            ${participante.email}
            </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {

    let output = ""

    // estrutura de repetição - loop

    for(let participante of participantes) {

        output = output + criarNovoParticipante(participante)

    }

    //pegar a info do HTML


    //substituir a info do HTML

    document.querySelector('tbody').innerHTML = output


}

atualizarLista(participantes)

const adicionarParticipante = (event) => {

    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //verificar se o partcipante ja existe

    const participanteExiste = participantes.find(

        (p) => p.email == participante.email
         
    )

    if(participanteExiste) {
        alert('Email ja cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
    //confirmar se realmente quer o checkin
    const mensagemConfirmacao = 'Tem certeza que deseja realizar o check-in?'

    if(confirm(mensagemConfirmacao) == false) {
        return
    }
    

    //enconytrar participante na list5a
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email

    })

    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //atualizar a lista de participante
    atualizarLista(participantes)

}