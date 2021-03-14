<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <Contacts/>
    </v-main>
  </v-app>
</template>

<script>
import Contacts from './components/Contacts';

export default {
  name: 'App',

  components: {
    Contacts,
  },

  data: () => ({
    //
  }),
};
</script>
