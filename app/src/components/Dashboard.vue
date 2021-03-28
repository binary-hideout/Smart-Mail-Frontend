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
                    <Cases />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import Sidebar from './Sidebar';
import ApplicationBar from './ApplicationBar';
// import Contacts from './Contacts';
import Cases from './Cases';

export default {
    components: {
        ApplicationBar,
        Cases,
        Sidebar,
    }
}
</script>
