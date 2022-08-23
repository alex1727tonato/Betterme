<template>
  <div class="mt-16">
    <v-row>
      <v-col>
        <VueApexCharts width="500" type="bar" :options="chartOptions" :series="series" />
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="444"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                BIENVENIDO
              </div>
              <v-list-item-title class="text-h5 mb-1">
                BIENVENIDO
              </v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar
              size="120"
            >
              <img
                src="~/assets/imgs/avatarBot.png"
                alt="Bot"
              >
            </v-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'InicioPage',
  data () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }]
    }
  },
  head () {
    return { title: 'Inicio' }
  },
  mounted () {
    if (this.$route.query.reset) {
      this.login = false
    }
  },
  methods: {
    onSubmit () {
      console.log('hola')
    }
  }
})
</script>
