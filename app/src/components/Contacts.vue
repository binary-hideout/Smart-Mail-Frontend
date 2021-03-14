<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <!--  -->
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-if="contacts.length == 0"
                item-key="name"
                class="elevation-1"
                loading
                loading-text="Loading... Please wait"
              ></v-data-table>
              <v-data-table
                v-else
                :headers="headers"
                :items="contacts"
                :search="search"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      contacts: [],
      search: '',
      headers: [
          {
            text: 'Email',
            align: 'start',
            value: 'email',
          },
          { text: 'First name', value: 'first_name' },
          { text: 'Last name', value: 'last_name' },
          { text: 'Phone', value: 'phone' },
          { text: 'Date', value: 'created' },
          { text: 'Status', value: 'status' },
      ],
    }),
    mounted () {
      this.fetchContacts()
    },
    methods: {
      fetchContacts () {
        axios
        .get('https://bh-smart-mail.azurewebsites.net/contacts')
        .then(response => (this.contacts = response.data.content))
      }
    }
  }
</script>