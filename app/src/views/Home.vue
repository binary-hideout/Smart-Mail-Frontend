<template>
  <div class="home">
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col cols="2">
                    <Sidebar />
                </v-col>
                <v-col>
                    <CasesTable />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import CasesTable from '@/components/CasesTable.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    CasesTable,
    Sidebar
  }
}
</script>
