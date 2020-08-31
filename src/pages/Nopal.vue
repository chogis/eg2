<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <send-device :config="cash" @data="test"/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import SendDevice from 'components/SendDevice'

export default {
  name: 'Nopal',
  components: { SendDevice },

  data() {
    return {
      cash: {
        deviceLabel: 'Mobile Number',
        deviceHint: 'Gamcel, Africell, Comium, Qcell available',
        devicePrefix: '+220',
        deviceInputType: 'number',
        deviceIcon: 'call',
        amountLabel: 'Amount',
        sendLabel: 'Send',
        sendIcon: 'send',
        lowest: 5,
        highest: 5000,
        fee: 0,
        unit: '',
        currency: 'D',
        notificationCaption: '',
        validation: {
          rules: [
            {
              check: input => {
                const res = !/^[235679]\d{6}$/.test(input)
                // console.log(res, input)
                return res
              },
              error: 'Enter a valid mobile number'
            }
          ]
        }
      },
      amount: null,
      mobile: null,
      lowest: 5,
      highest: 5000,
      fee: 0,
      unit: ''
    }
  },
  methods: {
    test(data) {
      console.log(data)
    },

    NextInput() {
      this.$refs.amount.focus()
    },
    Process() {
      const notification = {
        position: 'bottom',
        // group: 'cart',
        icon: 'info',
        color: 'primary',
        textColor: 'white',
        message: `Processing request...`,
        timeout: 5000
        // multiLine: true,
        // caption: `Earn ${this.amount} B as rewards`
        // badgeColor: 'red',
        // badgeTextColor: 'dark',
        // badgeClass: 'shadow-3 glossy my-badge-class',
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      }
      this.$q.notify(notification)
      this.mobile = null
      this.amount = null
      this.$refs.mobile.resetValidation()
      this.$refs.amount.resetValidation()
    },
    CheckDot(e) {
      console.log(this.amount)
    }
  },
  computed: {
    ...mapGetters('store', ['page']),

    Send() {
      return !(
        this.amount &&
        this.mobile &&
        this.amount >= this.lowest &&
        this.amount <= this.highest &&
        /^\d{1,4}$/.test(this.amount) &&
        /^[235679]\d{6}$/.test(this.mobile)
      )
    }
  }
}
</script>
