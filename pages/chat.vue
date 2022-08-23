<template>
  <v-row>
    <v-col class="text-center">
      <v-card
        class="py-4 justify-start pb-0"
        elevation="4"
        outlined
      >
        <v-card-title class="pt-1 pb-1">
          <v-avatar class="mr-4">
            <img
              src="~/assets/imgs/avatarBot.png"
              alt="Bot"
            >
          </v-avatar>
          <div class="d-flex flex-column">
            <v-badge dot color="green">
              Betterme
            </v-badge>
            <p style="font-size: medium" class="font-weight-light text--disabled mb-0">
              online
            </p>
          </div>
        </v-card-title>
        <v-divider class="mx-4" />
        <v-container fluid style="padding: 0;">
          <v-row no-gutters>
            <v-col sm="12" style="position: relative;">
              <div ref="chatContainer" class="chat-container">
                <div v-for="(message, index) in messages" :key="index" class="message" :class="{own: message.user == username}">
                  <div style="margin-top: 5px" />
                  <v-app-bar v-if="message.user !== username" color="rgba(0,0,0,0)" flat class="mb-16">
                    <v-spacer />
                    <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="mb-4">
                            {{ message.content }}
                          </div>
                          <v-list-item-subtitle>
                            {{ message.date }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-badge
                      bordered
                      bottom
                      color="green"
                      dot
                      offset-x="10"
                      offset-y="10"
                    >
                      <v-avatar color="secondary" class="mt-n5 white--text" size="30" elevation="10">
                        <span>{{ message.user.charAt(0) }}</span>
                      </v-avatar>
                    </v-badge>
                  </v-app-bar>
                  <v-app-bar v-else color="rgba(0,0,0,0)" class="mb-16" flat>
                    <v-badge
                      bordered
                      bottom
                      color="green"
                      dot
                      offset-x="16"
                      offset-y="9"
                    >
                      <v-avatar size="40" elevation="10">
                        <img
                          src="~/assets/imgs/avatarBot.png"
                          alt="Bot1"
                        >
                      </v-avatar>
                    </v-badge>
                    <v-card class="mt-10 ml-2" max-width="350px">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="mb-4">
                            {{ message.content }}
                          </div>
                          <v-list-item-subtitle>
                            {{ message.date }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-app-bar>
                </div>
              </div>
              <div class="typer">
                <div class="your-input-box">
                  <input v-model="contentMessage" type="text" placeholder="Ingrese su mensaje aquí..." @keyup.enter="(value) => sendMessage(value.target.value)">
                </div>
                <v-spacer />
                <div>
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    color="primary"
                    :disabled="!contentMessage"
                    @click="sendMessage(contentMessage)"
                  >
                    <v-icon>
                      mdi-send
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'AbautPage',
  data () {
    return {
      messages: [{
        content: 'HOLA MUNDO',
        date: '2022/08/22, 8:11:14 am',
        user: 'Betterme'
      },
      {
        content: 'COMO ESTAS?',
        date: '2022/08/22, 8:12:14 am',
        user: 'Alex'
      }],
      username: 'Betterme',
      contentMessage: ''

    }
  },
  head () {
    return { title: 'Chat' }
  },
  mounted () {
    if (this.$route.query.reset) {
      this.login = false
    }
  },
  methods: {
    sendMessage (value) {
      this.messages.push({
        content: value,
        date: moment().format('YYYY/MM/DD, h:mm:ss a'),
        user: 'Alex'
      })
      this.contentMessage = ''
    }
  }
})
</script>

<style scoped>
.listScroll{
  height:90%;/* or any height you want */
  overflow-y:auto
}
.sheetScroll{
  height:700px;/* or any height you want */
  overflow-y:auto
}
.v-card__text {
  overflow: auto;
}
.tool {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.tool::-webkit-scrollbar:horizontal {
  height: 3px;
}
.chat-container{
  box-sizing: border-box;
  height: calc(100vh - 14.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.chat-container .username{
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content{
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display:inline-block;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content{
    max-width: 60%;
  }
}
.message{
  margin-bottom: 3px;
  text-align: left;
}
.message.own{
  text-align: left;
}
.typer{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 3.5rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
.typer input[type=text]{
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}
.your-input-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
