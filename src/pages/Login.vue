<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <q-input
      v-if="showMobile"
      v-model="mobile"
      type="number"
      ref="mobile"
      hint="Include country code. e.g. 2206098999"
      label="Whatsapp number"
      prefix="+"
      style="width: 80vw"
      class="q-ma-sm text-h5"
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
      v-model="pin"
      type="number"
      ref="pin"
      hint="Enter the PIN from WhatsApp"
      label="PIN"
      style="width: 80vw"
      class="q-ma-sm text-h5"
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
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      pin: '',
      showMobile: true
      // showPIN: false
    }
  },
  methods: {
    GetCode() {
      this.showMobile = !this.showMobile
      const notification = {
        position: 'bottom',
        // group: 'cart',
        icon: 'info',
        color: 'primary',
        textColor: 'white',
        message: `Check WhatsApp for PIN`,
        timeout: 5000,
        // multiLine: true,
        caption: `From +220 983 7486`
        // badgeColor: 'red',
        // badgeTextColor: 'dark',
        // badgeClass: 'shadow-3 glossy my-badge-class',
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      }
      this.$q.notify(notification)
    },

    VerifyCode() {
      let notification = null
      if (this.mobile && this.pin === '123') {
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
        this.pin = ''
        this.mobile = ''
        this.showMobile = true
      }
      this.$q.notify(notification)
    }
  },
  computed: {}
}
</script>
