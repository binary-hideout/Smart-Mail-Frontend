<template>
<v-data-table :headers="headers" :items="contacts" :search="search" sort-by="email" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded color="cyan lighten-1" dark class="mb-2" v-bind="attrs" v-on="on">
                        New Item
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.first_name" label="First name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.last_name" label="Last name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
            mdi-delete
        </v-icon>
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="fetchContacts">
            Reset
        </v-btn>
    </template>
</v-data-table>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Email',
                align: 'start',
                value: 'email',
            },
            {
                text: 'First name',
                value: 'first_name'
            },
            {
                text: 'Last name',
                value: 'last_name'
            },
            {
                text: 'Phone',
                value: 'phone'
            },
            {
                text: 'Date',
                value: 'created'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        contacts: [],
        editedIndex: -1,
        editedItem: {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
        },
        defaultItem: {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.fetchContacts()
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.contacts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.contacts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.deleteContact()
            this.closeDelete()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save() {
            if (this.editedIndex > -1) {
                this.updateContact()
            } else {
                this.postContact()
            }
            this.close()
        },
        fetchContacts() {
            axios({
                method: 'get',
                url: 'https://smart-mail-api.azurewebsites.net/contacts',
                responseType: 'json',
            }).then(response => (this.contacts = response.data.content))
        },
        postContact() {
            axios.post(`https://smart-mail-api.azurewebsites.net/contact/${this.editedItem.email}`, {
                    first_name: this.editedItem.first_name,
                    last_name: this.editedItem.last_name,
                    phone: this.editedItem.phone,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateContact() {
            axios.put(`https://smart-mail-api.azurewebsites.net/contact/${this.editedItem.email}`, {
                    first_name: this.editedItem.first_name,
                    last_name: this.editedItem.last_name,
                    phone: this.editedItem.phone,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteContact() {
            axios.delete(`https://smart-mail-api.azurewebsites.net/contact/${this.editedItem.email}`)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
}
</script>
