<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <q-input
      v-if="showMobile"
      v-model.number="mobile"
      type="number"
      ref="mobile"
      hint="Include country code. e.g. 2206098999"
      label="Whatsapp mobile number"
      prefix="+"
      style="width: 80vw"
      class="q-ma-sm text-h5"
      @keyup.enter="GetCode"
    >
      <template v-slot:prepend>
        <q-icon name="call"/>
      </template>
      <template v-slot:append>
        <q-btn icon="send" unelevated round class="text-primary" @click="GetCode"/>
      </template>
    </q-input>
    <q-input
      v-if="!showMobile"
      v-model.number="code"
      type="number"
      ref="code"
      hint="Enter the PIN from WhatsApp"
      label="PIN"
      style="width: 80vw"
      class="q-ma-sm text-h5"
      @keyup.enter="VerifyCode"
    >
      <template v-slot:prepend>
        <q-icon name="lock"/>
      </template>
      <template v-slot:append>
        <q-btn icon="send" unelevated round class="text-primary" @click="VerifyCode"/>
      </template>
    </q-input>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from 'components/I'

export default {
  name: 'Login',
  data() {
    return {
      mobile: null,
      code: null,
      showMobile: true,
      verifyQuery: `mutation CompleteSignup($mobile: Float, $code: Int) {CompleteSignup(mobile: $mobile, code: $code)}`,
      registerQuery:
        'mutation ($mobile: Float!) {  BeginSignup(mobile: $mobile)}'

      // showPIN: false
    }
  },
  methods: {
    GetCode() {
      this.showMobile = !this.showMobile
      get(this.registerQuery, { mobile: this.mobile })
      const notification = {
        position: 'bottom',
        // group: 'cart',
        icon: 'info',
        color: 'primary',
        textColor: 'white',
        message: `Check WhatsApp for PIN`,
        timeout: 5000,
        // multiLine: true,
        caption: `From +220 9837486`
        // badgeColor: 'red',
        // badgeTextColor: 'dark',
        // badgeClass: 'shadow-3 glossy my-badge-class',
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      }
      this.$q.notify(notification)
    },

    async VerifyCode() {
      let notification = null
      const data = {
        code: this.code,
        mobile: this.mobile
      }
      const auth =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOjIyMDk4Mzc0ODYsImlhdCI6MTU5ODY0NzAyMywiZXhwIjoxNTk4NjQ3MDgzfQ.ctZZWHsfr04HxL-qXtHb3FIcr4d-jdt7UYlfyO3t_TI'
      const confirmed = await get(this.verifyQuery, data, auth)
      if (confirmed.CompleteSignup) {
        notification = {
          position: 'bottom',
          // group: 'cart',
          icon: 'info',
          color: 'green',
          textColor: 'white',
          message: `Welcome to tesito`,
          timeout: 5000
          // multiLine: true,
          // caption: `Please enter a valid WhatsApp number`
          // badgeColor: 'red',
          // badgeTextColor: 'dark',
          // badgeClass: 'shadow-3 glossy my-badge-class',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
        this.$router.replace('/')
      } else {
        notification = {
          position: 'bottom',
          // group: 'cart',
          icon: 'info',
          color: 'red',
          textColor: 'white',
          message: `Failed to verify`,
          timeout: 5000,
          // multiLine: true,
          caption: `Please enter a valid WhatsApp number`
          // badgeColor: 'red',
          // badgeTextColor: 'dark',
          // badgeClass: 'shadow-3 glossy my-badge-class',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
        this.code = ''
        this.mobile = ''
        this.showMobile = true
      }
      this.$q.notify(notification)
    }
  },
  computed: {
    ...mapGetters('store', ['graphqlUrl'])
  },

  created() {}
}
</script>
