<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="'Betterme'" />
      <v-spacer />
      <v-menu offset-y transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list class="px-5">
          <!-- <v-btn outlined flat>
            <v-icon>mdi-logout-variant</v-icon> {{ 'Cerrar sesión' }}
          </v-btn> -->
          <v-list-action style="cursor: pointer" @click="logout">
            <v-list-item-title><v-icon>mdi-logout-variant</v-icon> {{ 'Cerrar sesión' }}</v-list-item-title>
          </v-list-action>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-chat-processing-outline',
          title: 'Bitacora',
          to: '/recordMe'
        },
        {
          icon: 'mdi-chat-processing-outline',
          title: 'Chat',
          to: '/chat'
        },
        {
          icon: 'mdi-chat-processing-outline',
          title: 'Acerca de nosotros',
          to: '/aboutOur'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    async logout () {
      this.$store.dispatch('session/clientLogout')
      await this.$router.push('/login')
    }
  }
}
</script>
