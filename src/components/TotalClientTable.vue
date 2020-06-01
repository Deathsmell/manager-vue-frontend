<template>
    <v-card>
        <v-card-title>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            >
            </v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                fixed-header
                :height="height"

                :items="cashboxes"
                item-key="id"
                sort-by="id"

                hide-default-footer
                :page.sync="page"
                @page-count="pageCount = $event"

                :items-per-page="itemsPerPage"
                :loading="loading"
                :search="search"

        >

            <template #item.skno="{item}">
                <v-chip :color="getColor(item.skno)" dark>{{item.skno}}</v-chip>
            </template>

            <template #item.master="{item,value}">
                <v-menu top :close-on-content-click="closeOnContentClick">
                    <template v-slot:activator="{ on }">
                        <v-chip
                                color="primary"
                                dark
                                v-on="on"
                        >
                            {{item.master.name}}
                        </v-chip>
                    </template>

                    <v-list>
                        <v-list-item
                                v-for="(master, index) in masters"
                                :key="index"
                                @click="setMaster(item, master,value)"
                        >
                            <v-list-item-title>{{ master.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <template v-if="edit" v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
            </template>

            <template v-slot:footer="">
                <v-container class="pa-0">
                    <v-row no-gutters class="d-flex justify-space-around">
                        <v-col
                                cols="3"
                        >
                            <v-btn-toggle
                                    v-model="icon"
                                    class="align-content-center"
                            >
                                <v-btn value="left">
                                    <span class="hidden-sm-and-down">Все</span>
                                </v-btn>

                                <v-btn value="center">
                                    <span class="hidden-sm-and-down">Город</span>
                                </v-btn>

                                <v-btn value="right">
                                    <span class="hidden-sm-and-down">Иногородние</span>
                                </v-btn>

                            </v-btn-toggle>
                        </v-col>
                        <v-col

                        >
                            <v-pagination
                                    v-model="page"
                                    :length="pageCount"
                                    total-visible="7"
                                    class="text-center pt-2"
                            ></v-pagination>
                        </v-col>
                        <v-col
                                cols="3"
                        >
                            <v-switch
                                    v-model="edit"
                                    :label="`Редактировать`"
                            ></v-switch>
                        </v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:top="">
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-if="edit" v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.client.contract"
                                                      label="Договор"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.dateEnter" label="Дата ввода"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.client.vat" label="УНП"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.client.name" label="Фирма"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-switch v-model="editedItem.skno" label="СКНО"></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.nameModel" label="КСА"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.address   " label="Адрес"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.dateCreate" label="Дата ввода"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.master.name" label="Мастер"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    const API = 'http://localhost:8080';
    export default {
        data() {
            return {
                icon: 'justify',
                edit: false,
                dialog: false,
                search: '',
                page: 1,
                pageCount: 0,
                itemsPerPage: 15,
                height: 0,
                loading: true,
                cashboxes: [],
                headers: [
                    // {text: "Id", value: "client.id", sortable: false},
                    {text: "№ договора", value: "client.contract", sortable: false},
                    {text: "Дата ввода", value: "dateEnter", sortable: false},
                    {text: "УНП", value: "client.vat", sortable: false},
                    {text: "Имя фирмы", value: "client.name", sortable: false},
                    {text: "СКНО", value: "skno", sortable: false},
                    // {text: "casId", value: "id", sortable: false},
                    {text: "КСА", value: "nameModel", sortable: false},
                    {text: "Адрес", value: "address", sortable: false},
                    {text: "Год выпуска", value: "dateCreate", sortable: false},
                    {text: "Мастер", value: "master", sortable: false},
                    // {text: '', value: 'data-table-expand'},
                    {text: '', value: 'actions', sortable: false},
                ],
                masters: [],
                closeOnContentClick: true,
                editedIndex: -1,
                editedItem: {
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
                },
                defaultItem: {
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
                },
            }
        },
        created() {
            window.addEventListener('resize', this.calculateParamComponent);
            this.getMasters();
            this.getClientFromApi();
            this.calculateParamComponent();
        },

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        methods: {
            editItem(item) {
                this.editedIndex = this.cashboxes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                console.log(item);
                this.dialog = true
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },

            getMasters() {
                this.$axios.get(API + '/masters').then(res => {
                    res.data.forEach(master => {
                        this.masters.push(
                            {
                                id: master.id,
                                title: master.name,
                                avatar: null,
                            }
                        )
                    })
                })
            },

            setMaster(cashbox, master) {
                this.$axios.post(API + '/cashboxes/setMaster/' + cashbox.id, master)
                    .then(res => {
                        let position = this.cashboxes.indexOf(cashbox);
                        this.cashboxes.splice(position, 1, res.data)
                    })
            },

            getClientFromApi() {
                this.$axios.get(API + '/cashboxes/getAll').then(res => {
                    this.loading = true;
                    res.data.forEach(cashbox => {
                        if (cashbox.master === null) {
                            cashbox.master = {
                                name: 'Выбери мастера!',
                            }
                        }
                        this.cashboxes.push(cashbox)
                    })
                    this.loading = false;
                })
            },
            calculateParamComponent() {
                this.height = document.documentElement.clientHeight - 190;
                this.itemsPerPage = (this.height / 48) - 1
            },
            getColor(item) {
                if (item) return 'green'
                else return 'red'
            },

        },
    }
</script>

<style>
</style>