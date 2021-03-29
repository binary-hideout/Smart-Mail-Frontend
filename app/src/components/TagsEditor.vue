<template>
<v-container>
    <v-row>
        <v-col cols="2">
            <v-sheet rounded="lg">
                <v-list color="transparent">
                    <v-list-item v-for="tag in tags" :key="tag.title" link>
                        <v-list-item-content>
                            <v-list-item-title @click="editTag(tag)">
                                {{ tag.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider class="my-2"></v-divider>

                    <v-list-item link color="grey lighten-4">
                        <v-list-item-content>
                            <v-list-item-title @click="addTag()">
                                Add tag
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-sheet>
        </v-col>

        <v-col>
            <v-sheet min-height="70vh" rounded="lg">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <template>
                                <v-subheader>{{ formTitle }}</v-subheader>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-chip :color="editedItem.color" dark>
                                {{ editedItem.title }}
                            </v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-color-picker v-model="editedItem.color" dot-size="25" swatches-max-height="200">
                            </v-color-picker>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <div class="text-center" @click="saveTag">
                                <v-btn rounded color="cyan lighten-1" dark>
                                    Save
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <div class="text-center" @click="deleteTag">
                                <v-btn rounded color="cyan lighten-1" dark>
                                    Delete
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tags: [],
            editedIndex: -1,
            editedItem: {
                title: '',
                color: '',
            },
            defaultItem: {
                title: '',
                color: '',
            },
            actions: ['Edit', 'Delete'],
            menu: false,
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Tag' : 'Edit Tag'
        },
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
                    color: this.editedItem.color,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteTag() {
            axios.delete(`https://smart-mail-api.azurewebsites.net/tag/${this.editedItem.title}`)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editTag(tag) {
            this.editedIndex = this.tags.indexOf(tag)
            this.editedItem = Object.assign({}, tag)
        },
        addTag() {
            this.editedIndex = -1;
            this.editedItem = Object.assign({}, this.defaultItem)
        },
        saveTag() {
            if (this.editedIndex > -1) {
                this.putTag()
            } else {
                this.postTag()
            }
        },
    }
}
</script>
