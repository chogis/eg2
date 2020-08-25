<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <send-device :config="cashpower"/>
  </q-page>
</template>

<script>
import SendDevice from 'components/SendDevice'

export default {
  name: 'Cashpower',
  components: { SendDevice },
  data() {
    return {
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
                const res = !/^[1-9]\d{6}$|^\d{11}$/.test(input)
                console.log(res, input)
                return res
              },
              error: 'Meter numbers are exactly 7 or 11 digits'
            }
          ]
        }
      }
    }
  }
}
</script>
