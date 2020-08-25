<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <!-- <q-input
      v-model.number="mobile"
      ref="mobile"
      hint="Send points to any mobile"
      label="Mobile Number"
      prefix="+220"
      style="width: 250px"
      class="q-ma-sm text-h6"
      type="number"
      clearable
      clear-icon="close"
      @keyup.enter="NextInput"
    >
      <template v-slot:prepend>
        <q-icon name="insert_emoticon"/>
      </template>
    </q-input>
    <q-input
      v-model.number="amount"
      ref="amount"
      type="number"
      :hint="`From ${unit}${lowest} to ${unit}${highest}${fee ? `. -D${fee} FEE`: '. FREE'}`"
      label="Points to send"
      style="width: 250px"
      class="q-ma-sm text-h6"
    >
      <template v-slot:append v-if="!Send">
        <q-btn
          v-if="!Send"
          icon-right="send"
          unelevated
          rounded
          label="Send"
          class="bg-primary text-white"
          @click="Process"
        />
      </template>
    </q-input>-->
    <send-device :config="device"/>
  </q-page>
</template>

<script>
import SendDevice from 'components/SendDevice'

export default {
  name: 'Points',
  components: { SendDevice },

  data() {
    return {
      device: {
        deviceLabel: 'Mobile number',
        deviceHint: 'Send points to anyone',
        devicePrefix: '+220',
        deviceIcon: 'insert_emoticon',
        amountLabel: 'Points',
        sendLabel: 'Send',
        sendIcon: 'send',
        lowest: 1,
        highest: 1000,
        fee: 0,
        unit: '',
        currency: '',
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
      }
      // amount: null,
      // mobile: null,
      // lowest: 1,
      // highest: 1000,
      // fee: 0,
      // unit: ''
    }
  }
  // methods: {
  //   NextInput() {
  //     this.$refs.amount.focus()
  //   },

  //   Process() {
  //     const notification = {
  //       position: 'bottom',
  //       // group: 'cart',
  //       icon: 'info',
  //       color: 'primary',
  //       textColor: 'white',
  //       message: `Processing request...`,
  //       timeout: 5000
  //       // multiLine: true,
  //       // caption: `Earn ${this.amount} B as rewards`
  //       // badgeColor: 'red',
  //       // badgeTextColor: 'dark',
  //       // badgeClass: 'shadow-3 glossy my-badge-class',
  //       // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
  //     }
  //     this.$q.notify(notification)
  //     this.mobile = null
  //     this.amount = null
  //     this.$refs.mobile.resetValidation()
  //     this.$refs.amount.resetValidation()
  //   },
  //   CheckDot(e) {
  //     console.log(this.amount)
  //   }
  // },
  // computed: {
  //   Send() {
  //     return !(
  //       this.amount &&
  //       this.mobile &&
  //       this.amount >= this.lowest &&
  //       this.amount <= this.highest &&
  //       /^\d{1,4}$/.test(this.amount) &&
  //       /^[235679]\d{6}$/.test(this.mobile)
  //     )
  //   }
  // }
}
</script>
