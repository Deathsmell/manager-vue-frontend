
export let header = [
        // {text: "Id", value: "client.id", sortable: false, align: 'center'},
        {
            text: "№ договора",
            value: "client.contract",
            sortable: false,
            align: 'center'
        },
        {
            text: "Дата ввода",
            value: "dateEnter",
            sortable: false,
            align: 'center'
        },
        {
            text: "УНП",
            value: "client.vat",
            sortable: false,
            align: 'center'
        },
        {
            text: "Имя фирмы",
            value: "client.name",
            sortable: false,
            align: 'center'
        },
        {
            text: "СКНО",
            value: "skno",
            sortable: false,
            align: 'center'
        },
        // {text: "casId", value: "id", sortable: false, align: 'center'},
        {
            text: "КСА",
            value: "nameModel",
            sortable: false,
            align: 'center'
        },
        {
            text: "Адрес",
            value: "address",
            sortable: false,
            align: 'center'
        },
        {
            text: "Год выпуска",
            value: "dateCreate",
            sortable: false,
            align: 'center'
        },
        {
            text: "Мастер",
            value: "master",
            sortable: false,
            align: 'center'
        },
        // {text: '', value: 'data-table-expand', align: 'center'},
        {
            text: '',
            value: 'actions',
            sortable: false,
            align: 'center'
        },
];


export let cashbox = {
    address: '',
    client: {
        contract: '',
        id: 0,
        mail: '',
        masters: {},
        name: '',
        nonresident: false,
        vat: 0,
    },
    dateCreate: '',
    dateEnter: '',
    id: 0,
    master: {
        avatar: null,
        clients: Array(0),
        id: 0,
        name: '',
    },
    nameModel: '',
    serialNumber: '',
    skno: false,
};