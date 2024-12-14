export const TIPO_ANIMAIS = [
    { label: 'Selecione', value: '' },
    { label: 'Cachorro', value: 'CACHORRO' },
    { label: 'Gato', value: 'GATO' }
]

export const PORTE_ANIMAIS = [
    { label: 'Selecione', value: '' },
    { label: 'Pequeno', value: 'PEQUENO' },
    { label: 'Médio', value: 'MEDIO' },
    { label: 'Grande', value: 'GRANDE' }]

export const TAMANHOS_CAIXAS = [
    { label: 'Pequena', value: 'PEQUENA' },
    { label: 'Média', value: 'MEDIA' },
    { label: 'Grande', value: 'GRANDE' }]



export const MOCK_FILA_ESPERA = [
    {
        id: 1,
        nomeRequerente: 'Carlos Almeida',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Bolt',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '01/06/2022'
    },
    {
        id: 2,
        nomeRequerente: 'Ana Pereira',
        tipoAnimal: 'Gato',
        nomeAnimal: 'Mia',
        porteAnimal: 'PEQUENO',
        dataSolicitacao: '15/01/2022'
    },
    {
        id: 3,
        nomeRequerente: 'Fernanda Costa',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Max',
        porteAnimal: 'MEDIO',
        dataSolicitacao: '28/01/2022'
    },
    {
        id: 4,
        nomeRequerente: 'Lucas Ferreira',
        tipoAnimal: 'Coelho',
        nomeAnimal: 'Luna',
        porteAnimal: 'MEDIO',
        dataSolicitacao: '05/02/2022'
    },
    {
        id: 5,
        nomeRequerente: 'Juliana Souza',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Thor',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '12/02/2022'
    },
    {
        id: 6,
        nomeRequerente: 'Paulo Mendes',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Spike',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '20/02/2022'
    },
    {
        id: 7,
        nomeRequerente: 'Camila Rocha',
        tipoAnimal: 'Gato',
        nomeAnimal: 'Lola',
        porteAnimal: 'MEDIO',
        dataSolicitacao: '01/03/2022'
    },
    {
        id: 8,
        nomeRequerente: 'Rafael Lima',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Brutus',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '10/03/2022'
    },
    {
        id: 9,
        nomeRequerente: 'Tatiana Oliveira',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Buddy',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '18/03/2022'
    },
    {
        id: 10,
        nomeRequerente: 'Roberto Martins',
        tipoAnimal: 'Gato',
        nomeAnimal: 'Ziggy',
        porteAnimal: 'PEQUENO',
        dataSolicitacao: '25/03/2022'
    },
    {
        id: 11,
        nomeRequerente: 'Mariana Silva',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Simba',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '01/04/2022'
    },
    {
        id: 12,
        nomeRequerente: 'Eduardo Nascimento',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Rocky',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '10/04/2022'
    },
    {
        id: 13,
        nomeRequerente: 'Bianca Fonseca',
        tipoAnimal: 'Gato',
        nomeAnimal: 'Oscar',
        porteAnimal: 'PEQUENO',
        dataSolicitacao: '20/04/2022'
    },
    {
        id: 14,
        nomeRequerente: 'Fábio Cardoso',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Hunter',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '30/04/2022'
    },
    {
        id: 15,
        nomeRequerente: 'Luciana Reis',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Chloe',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '05/05/2022'
    },
    {
        id: 16,
        nomeRequerente: 'André Teixeira',
        tipoAnimal: 'Gato',
        nomeAnimal: 'Snow',
        porteAnimal: 'PEQUENO',
        dataSolicitacao: '15/05/2022'
    },
    {
        id: 17,
        nomeRequerente: 'Natália Duarte',
        tipoAnimal: 'Cachorro',
        nomeAnimal: 'Apollo',
        porteAnimal: 'GRANDE',
        dataSolicitacao: '25/05/2022'
    }
];

export const MOCK_CASTRACAO = {
    id: 1,
    data: '12/10/2021',
    quantidadeAnimais: 10,
    observacao: 'teste',
    animais:[
        {
            id: 1,
            nomeRequerente: 'Carlos Almeida',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Bolt',
            porteAnimal: 'GRANDE',
            dataSolicitacao: '10/12/2024'
        },
        {
            id: 2,
            nomeRequerente: 'Ana Pereira',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Mia',
            porteAnimal: 'PEQUENO',
            dataSolicitacao: '12/12/2024'
        },
        {
            id: 3,
            nomeRequerente: 'Fernanda Costa',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Max',
            porteAnimal: 'MEDIO',
            dataSolicitacao: '08/12/2024'
        },
        {
            id: 4,
            nomeRequerente: 'Lucas Ferreira',
            tipoAnimal: 'Coelho',
            nomeAnimal: 'Luna',
            porteAnimal: 'MEDIO',
            dataSolicitacao: '10/12/2024'
        },
        {
            id: 5,
            nomeRequerente: 'Juliana Souza',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Thor',
            porteAnimal: 'GRANDE',
            dataSolicitacao: '11/12/2024'
        },
        {
            id: 6,
            nomeRequerente: 'Paulo Mendes',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Spike',
            porteAnimal: 'GRANDE',
            dataSolicitacao: '12/12/2024'
        },
        {
            id: 7,
            nomeRequerente: 'Camila Rocha',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Lola',
            porteAnimal: 'MEDIO',
            dataSolicitacao: '12/12/2024'
        },
        {
            id: 8,
            nomeRequerente: 'Rafael Lima',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Brutus',
            porteAnimal: 'GRANDE',
            dataSolicitacao: '11/12/2024'
        },
     
    ]
}



export const MOCK_CASTRACOES = [
    {
        id: 1,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 2,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 3,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 4,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 5,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 6,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 7,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 8,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 9,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
    {
        id: 10,
        data: '12/10/2021',
        quantidadeAnimais: 10,
        observacao: 'teste'
    },
]