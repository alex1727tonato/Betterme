<template>
  <div class="mt-16">
    <v-row>
      <v-col>
        <div class="text-h2 mb-10">
          Tu progreso
        </div>
        <VueApexCharts
          v-if="isLoading"
          width="550"
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="544"
          outlined
        >
          <v-row style="margin: 16px;">
            <v-col cols="9">
              <div class="text-h5 mb-1">
                BIENVENIDO
              </div>
              <div class="mt-5" style="text-align: center; font-style: italic;">
                "La vida es como montar en bicicleta. para mantener el equilibrio tienes que avanzar" - Albert Einstein
              </div>
            </v-col>
            <v-col cols="3">
              <v-avatar
                size="120"
              >
                <img
                  src="~/assets/imgs/avatarBot.png"
                  alt="Bot"
                >
              </v-avatar>
            </v-col>
          </v-row>
          <div>
            <v-card
              elevation="4"
              class="mx-auto"
              max-width="444"
            >
              <v-row style="margin: 16px;">
                <v-col>
                  <div class="text-h6" style="text-align: center;">
                    Tu progreso es del: <b> {{ series[0].data[series[0].data.length-1] }} % </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div>
            <v-card
              class="mx-auto"
              color="#ba66ca"
              dark
              max-width="440"
            >
              <v-container>
                <div class="text-h6" style="text-align: center;">
                  Palabras positivas: {{ positivo }} <br>
                  Palabras negativas: {{ negativo }} <br>
                  Progreso: {{ series[0].data[series[0].data.length-1] }} %
                </div>
              </v-container>
            </v-card>
          </div>
          <v-card-actions>
            <v-btn
              class="mt-5"
              outlined
              rounded
              text
              to="/chat"
            >
              Chat
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
      positivo: 0,
      negativo: 0,
      isLoading: false,
      series: [{
        name: 'Desktops',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Score',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      }
    }
  },
  head () {
    return { title: 'Inicio' }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const scores = await this.$axios.$get('/api/clients/scores')
        this.series[0].data.push('0')
        this.chartOptions.xaxis.categories.push('Inicio')
        scores.forEach((element) => {
          this.negativo += element.score.negative
          this.positivo += element.score.positive
          let valor = element.score.total * 100
          valor = valor.toFixed(2)
          let fecha = element._date
          fecha = fecha.substring(0, 10)
          this.series[0].data.push(valor)
          this.chartOptions.xaxis.categories.push(fecha)
        })
        // this.series[0].data.push('100')
        // this.chartOptions.xaxis.categories.push('2')
        console.log(this.positivo)
        console.log(this.negativo)
        this.isLoading = true
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>
