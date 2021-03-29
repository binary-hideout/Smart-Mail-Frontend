<template>
<v-app id="inspire">
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col>
                    <TagsEditor />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
// import Contacts from './Contacts';
import TagsEditor from './TagsEditor';

export default {
    components: {
        TagsEditor,
    }
}
</script>
