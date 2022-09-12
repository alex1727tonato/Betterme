<template>
  <v-app>
    <v-row>
      <v-col>
        <div class="text-h4 mb-10 mt-10 text-center">
          REGISTRO
        </div>
        <v-timeline
          align-top
          :dense="$vuetify.breakpoint.smAndDown"
        >
          <v-timeline-item
            v-for="(item, i) in data"
            :key="i"
            :color="item.color"
            fill-dot
            large
          >
            <template #icon>
              <v-icon
                :color="'white'"
                :size="'50px'"
              >
                {{ `${item.icono}` }}
              </v-icon>
            </template>
            <template #opposite>
              <span
                :class="`headline font-weight-bold ${item.colorBase}--text`"
                v-text="item.fecha "
              />
            </template>
            <v-card
              :color="item.color"
              dark
            >
              <v-card-text class="white text--primary text-h6 text-center">
                <p>En este día, te sentiste así: <b>{{ item.estado }}</b></p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'BitacoraPage',
  data () {
    return {
      items: [
        {
          color: 'blue darken-2',
          colorBase: 'blue',
          icon: 'mdi-emoticon-cry',
          estado: 'Triste'
        },
        {
          color: 'blue',
          colorBase: 'light-blue',
          icon: 'mdi-emoticon-sad',
          estado: 'Abrumado'
        },
        {
          color: 'yellow',
          colorBase: 'yellow',
          icon: 'mdi-emoticon-neutral',
          estado: 'Tranquilo'
        },
        {
          color: 'green lighten-1',
          colorBase: 'light-green',
          icon: 'mdi-emoticon-happy',
          estado: 'Feliz'
        },
        {
          color: 'green darken-3',
          colorBase: 'green',
          icon: 'mdi-emoticon-excited',
          estado: 'Alegre'
        }
      ],
      data: []
    }
  },
  head () {
    return { title: 'Bitacora' }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const scores = await this.$axios.$get('/api/clients/scores')
        this.data = scores.map((item) => {
          const object = {}
          object.fecha = moment(item._date).format('YYYY-MM-DD')
          let valor = item.score.total * 100
          valor = valor.toFixed(2)
          valor = Math.round(valor / 20)
          object.score = valor
          switch (object.score) {
            case 1 :
              object.icono = this.items[0].icon
              object.color = this.items[0].color
              object.estado = this.items[0].estado
              object.colorBase = this.items[0].colorBase
              break
            case 2 :
              object.icono = this.items[1].icon
              object.color = this.items[1].color
              object.estado = this.items[1].estado
              object.colorBase = this.items[1].colorBase
              break
            case 3 :
              object.icono = this.items[2].icon
              object.color = this.items[2].color
              object.estado = this.items[2].estado
              object.colorBase = this.items[2].colorBase
              break
            case 4 :
              object.icono = this.items[3].icon
              object.color = this.items[3].color
              object.estado = this.items[3].estado
              object.colorBase = this.items[3].colorBase
              break
            case 5 :
              object.icono = this.items[4].icon
              object.color = this.items[4].color
              object.estado = this.items[4].estado
              object.colorBase = this.items[4].colorBase
              break
          }
          return object
        })
        console.log(this.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>
