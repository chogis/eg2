<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <send-device :config="cashpower"/>
    <!-- <show-token :sale="token"/> -->
  </q-page>
</template>

<script>
import SendDevice from 'components/SendDevice'
import ShowToken from 'components/ShowToken'
export default {
  name: 'Cashpower',
  components: { SendDevice, ShowToken },
  data() {
    return {
      token: {
        name: 'Jammeh Musa',
        meter: '1234567',
        amount: 300,
        token: '5828558880951500',
        kwh: '39.9'
      },
      cashpower: {
        deviceLabel: 'Cashpower Meter Number',
        deviceHint: 'Either 11 or 7 digits',
        devicePrefix: '',
        deviceIcon: 'power',
        amountLabel: 'Amount',
        sendLabel: 'Send',
        sendIcon: 'send',
        lowest: 40,
        highest: 5000,
        fee: 3,
        unit: 'D',
        currency: '',
        notificationCaption: 'Your number will be with you shortly',
        validation: {
          rules: [
            {
              check: input => {
                return !/^[1-9]\d{6}$|^\d{11}$/.test(input)
              },
              error: 'Meter numbers are exactly 7 or 11 digits'
            }
          ]
        }
      }
    }
  },
  methods: {
    showLoading() {
      this.$q.loading.show()

      // hiding in 5s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 5000)
    }
  },
  created() {
    // this.showLoading()
  }
}
</script>
