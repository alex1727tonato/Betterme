<template>
  <div>
    <v-row class="image">
      <v-col class="d-none d-sm-flex justify-center align-center text-center" style="height: 90vh; background: linear-gradient(#245c94, #ba66ca);">
        <div class="img">
          <img src="~/assets/imgs/logo.png" width="650px">
        </div>
      </v-col>
      <v-col v-if="!registro" class="d-flex justify-center align-center text-center derecha" style="height: 90vh">
        <div style="width: 355px">
          <h1 class="secondary--text">
            Bienvenido
          </h1>
          <h3 class="mb-5 secondary--text">
            Iniciar sesión
          </h3>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              :rules="validations.emailRules"
              prepend-inner-icon="mdi-at"
              class="secondary--text"
              required
              type="email"
              rounded
              outlined
              large
            />
            <v-text-field
              v-model="password"
              label="Contraseña"
              rounded
              outlined
              class="secondary--text"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="validations.passwordRules"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              large
              @click:append="showPassword = !showPassword"
            />
            <v-btn
              block
              large
              :loading="isLoading"
              color="primary"
              class="mb-5"
              rounded
              type="primary"
            >
              Ingresar
            </v-btn>
          </v-form>
          <v-spacer />
          <p class="mt-3" dark>
            <span class="secondary--text">¿Eres nuevo? </span><a class="text-decoration-none" @click="registro = true"><u>Regístrate ahora</u></a>
          </p>
        </div>
      </v-col>
      <v-col v-else class="d-flex justify-center align-center text-center" style="height: 90vh">
        <div style="width: 355px">
          <h1 class="secondary--text">
            Crea tu cuenta
          </h1>
          <h3 class="mb-5 secondary--text">
            Registrate
          </h3>
          <v-form
            ref="form"
            v-model="validRegistro"
            lazy-validation
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="nombres"
              label="Nombres"
              :rules="validations.requerida"
              prepend-inner-icon="mdi-account"
              class="secondary--text"
              required
              rounded
              outlined
              large
            />
            <v-text-field
              v-model="apellidos"
              label="Apellidos"
              :rules="validations.requerida"
              prepend-inner-icon="mdi-account"
              class="secondary--text"
              required
              rounded
              outlined
              large
            />
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              :rules="validations.emailRules"
              prepend-inner-icon="mdi-at"
              class="secondary--text"
              required
              type="email"
              rounded
              outlined
              large
            />
            <v-text-field
              v-model="password"
              label="Contraseña"
              rounded
              outlined
              class="secondary--text"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="validations.passwordRules"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              large
              @click:append="showPassword = !showPassword"
            />
            <v-btn
              block
              large
              :loading="isLoading"
              color="primary"
              class="mb-5"
              rounded
              type="primary"
            >
              Crear cuenta
            </v-btn>
          </v-form>
          <v-spacer />
          <p class="mt-3" dark>
            <span class="secondary--text">¿Ya tienes una cuenta? </span><a class="text-decoration-none" @click="registro = false"><u>Iniciar sesión</u></a>
          </p>
        </div>
      </v-col>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        absolute
        rounded="pill"
        color="red accent-5"
        outlined
        top
      >
        <div class="justify-center align-center text-center">
          {{ mensaje }}
        </div>
      </v-snackbar>
      <v-snackbar
        v-model="creado"
        :timeout="2000"
        absolute
        rounded="pill"
        color="success"
        outlined
        top
      >
        <div class="justify-center align-center text-center">
          {{ 'Cuenta creada correctamente' }}
        </div>
      </v-snackbar>
      <v-overlay :value="isLoading">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'emptyLay',
  data () {
    return {
      isLoading: false,
      snackbar: false,
      creado: false,
      showPassword: false,
      mensaje: 'Complete los campos del formulario',
      valid: true,
      validRegistro: true,
      registro: false,
      email: '',
      password: '',
      nombres: '',
      apellidos: '',
      validations: {
        emailRules: [
          v => !!v || 'El correo electronico es requerido',
          v => /.+@.+/.test(v) || 'Ingrese un correo electronico valido'
        ],
        passwordRules: [
          v => !!v || 'La contraseña es requerida'
        ],
        requerida: [
          v => !!v || 'El campo es requerido'
        ]
      }
    }
  },
  head () {
    return { title: 'Login' }
  },
  mounted () {
    if (this.$route.query.reset) {
      this.login = false
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      try {
        const data = {
          email: this.email,
          password: this.password
        }
        if (this.registro) {
          data.names = this.nombres
          data.surnames = this.apellidos
        }
        if (this.$refs.form.validate()) {
          console.log('FORMULARIO VALIDADO')
          console.log(data)
          if (!this.registro) {
            if (data.email === 'katonato@uce.edu.ec' && data.password === '12345678') {
              this.$router.push('/')
            } else {
              this.mensaje = 'El correo o contraseña no son validos.'
              this.snackbar = true
            }
          } else {
            await this.$axios.$post('/api/clients', data)
            this.creado = true
            this.registro = false
          }
        } else {
          this.snackbar = true
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        console.log(message)
        this.snackbar = true
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #230064;
}
</style>
