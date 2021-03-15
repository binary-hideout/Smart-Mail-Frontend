<template>
<v-app id="inspire">
    <ApplicationBar />
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col cols="2">
                    <Sidebar />
                </v-col>

                <v-col>
                    <Contacts />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import Sidebar from './Sidebar';
import ApplicationBar from './ApplicationBar';
import Contacts from './Contacts';

export default {
    components: {
        ApplicationBar,
        Sidebar,
        Contacts,
    }
}
</script>
