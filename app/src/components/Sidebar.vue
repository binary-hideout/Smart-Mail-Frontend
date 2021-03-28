<template>
<v-sheet rounded="lg">
    <v-list color="transparent">
        <v-list-item v-for="tag in tags" :key="tag.title" link>
            <v-list-item-content>
                <v-list-item-title>
                    {{ tag.title }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item link color="grey lighten-4">
            <v-list-item-content>
                <template>
                    <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn rounded color="cyan lighten-1" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Add tag
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Add new tag</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.title" label="Title" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-color-picker v-model="editedItem.color" dot-size="25" swatches-max-height="200"></v-color-picker>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Close
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </template>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-sheet>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tags: [],
            dialog: false,
            editedIndex: -1,
            editedItem: {
                title: '',
                color: '',
            },
            defaultItem: {
                title: '',
                color: '',
            },
        }
    },
    created() {
        this.fetchTags()
    },
    methods: {
        fetchTags() {
            axios({
                method: 'get',
                url: 'https://smart-mail-api.azurewebsites.net/tags',
                responseType: 'json',
            }).then(response => (this.tags = response.data.content))
        },
        postTag() {
            axios.post(`https://smart-mail-api.azurewebsites.net/tag/${this.editedItem.title}`, {
                    title: this.editedItem.title,
                    color: this.editedItem.color,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        putTag() {
            axios.put(`https://smart-mail-api.azurewebsites.net/tag/${this.editedItem.title}`, {
                    title: this.editedItem.title,
                    color: this.editedItem.color,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        save() {
            this.postTag()
            this.close()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    }
}
</script>
