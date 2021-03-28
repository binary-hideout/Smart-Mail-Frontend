<template>
<v-data-table :headers="headers" :items="cases" :search="search" sort-by="email" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" scrollable max-width="700px">
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
                                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select :items="contacts" v-model="editedItem.contact" item-text="email" item-value="id" label="contact" return-object></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select :items="tags" v-model="editedItem.tag" item-text="title" item-value="id" attach chips label="tag" return-object>
                                        <template #selection="{ item }">
                                            <v-chip :color="item.color" dark>{{item.title}}</v-chip>
                                        </template>
                                    </v-select>
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
    <template v-slot:item.tag.title="{ item }">
        <v-chip :color="item.tag.color" dark>
            {{ item.tag.title }}
        </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-icon small @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
            mdi-delete
        </v-icon>
    </template>
    <template v-slot:item.call="{ item }">
        <v-icon small @click="editItem(item)">
            mdi-cellphone
        </v-icon>
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="fetchCases">
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
                text: 'Title',
                align: 'start',
                value: 'title',
            },
            {
                text: 'Description',
                value: 'description'
            },
            {
                text: 'Email',
                value: 'contact.email'
            },
            {
                text: 'Phone',
                value: 'contact.phone'
            },
            {
                text: 'Date',
                value: 'created'
            },
            {
                text: 'Status',
                value: 'tag.title'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
            {
                text: 'Call',
                value: 'call',
                sortable: false
            },
        ],
        cases: [],
        contacts: [],
        tags: [],
        editedIndex: -1,
        editedItem: {
            title: '',
            description: '',
            contact: {},
            tag: {},
        },
        defaultItem: {
            title: '',
            description: '',
            contact: {},
            tag: {},
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
        this.fetchCases(),
        this.fetchTags(),
        this.fetchContacts()
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.cases.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.cases.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.deleteCase()
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
                this.updateCase()
            } else {
                this.postCase()
            }
            this.close()
        },
        fetchCases() {
            axios({
                method: 'get',
                url: 'https://smart-mail-api.azurewebsites.net/cases',
                responseType: 'json',
            }).then(response => (this.cases = response.data.content))
        },
        fetchTags() {
            axios({
                method: 'get',
                url: 'https://smart-mail-api.azurewebsites.net/tags',
                responseType: 'json',
            }).then(response => (this.tags = response.data.content))
        },
        fetchContacts() {
            axios({
                method: 'get',
                url: 'https://smart-mail-api.azurewebsites.net/contacts',
                responseType: 'json',
            }).then(response => (this.contacts = response.data.content))
        },
        postCase() {
            axios.post(`https://smart-mail-api.azurewebsites.net/case/${this.editedItem.title}`, {
                    description: this.editedItem.description,
                    tag_id: this.editedItem.tag.id,
                    contact_id: this.editedItem.contact.id,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                console.log(this.editedItem);
        },
        updateCase() {
            axios.put(`https://smart-mail-api.azurewebsites.net/case/${this.editedItem.title}`, {
                    description: this.editedItem.description,
                    tag_id: this.editedItem.tag.id,
                    contact_id: this.editedItem.contact.id,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteCase() {
            axios.delete(`https://smart-mail-api.azurewebsites.net/case/${this.editedItem.title}`)
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
