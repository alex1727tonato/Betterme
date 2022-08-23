<template>
  <v-app>
    <div>hola</div>
  </v-app>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'AboutPage',
  data () {
    return {
      messages: [{
        content: 'HOLA MUNDO',
        date: '21/08/2022',
        user: 'LuchoBot'
      },
      {
        content: 'COMO ESTAS?',
        date: '21/08/2022',
        user: 'Alex'
      }],
      username: 'LuchoBot'
    }
  },
  head () {
    return { title: 'Chat' }
  },
  methods: {
    sendMessage (value) {
      console.log('MENSAJE INGRESADO')
      console.log(value)
    }
  }
})
</script>
