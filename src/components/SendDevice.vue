<template>
  <div>
    <q-input
      v-model="device"
      ref="device"
      :hint="config.deviceHint"
      :label="config.deviceLabel"
      :prefix="config.devicePrefix"
      style="width: 250px"
      class="q-ma-sm text-h6"
      type="text"
      clearable
      clear-icon="close"
      @keyup.enter="NextInput"
    >
      <template v-slot:prepend>
        <q-icon :name="config.deviceIcon"/>
      </template>
    </q-input>
    <q-input
      v-model.number="amount"
      class="q-ma-sm text-h6"
      input-class="text-right"
      ref="amount"
      type="number"
      :hint="`From ${unit}${lowest} to ${unit}${highest+fee}${fee ? `, ${unit}${fee} FEE`: ' ~ NO FEE'}`"
      :label="`${config.amountLabel}${amount > lowest && fee ? ` you get ${amount -3}` : ''}`"
      :prefix="config.currency"
      :suffix="`${fee ? '-'+ fee : ''}`"
      style="width: 250px"
      @keyup.enter="Process"
    >
      <template v-slot:append>
        <q-btn :icon="config.sendIcon" flat round class="text-primary" @click="Process"/>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'Cashpower',
  props: ['config'],
  data() {
    return {
      amount: null,
      device: null,
      lowest: this.config.lowest,
      highest: this.config.highest,
      fee: this.config.fee,
      unit: this.config.unit,
      validation: this.rules
    }
  },
  computed: {
    input() {
      return { device: this.device, amount: this.amount }
    }
  },
  methods: {
    NextInput() {
      this.$refs.amount.focus()
    },

    Process() {
      this.$emit('data', this.input)
      try {
        this.Validate()
        const notification = {
          position: 'bottom',
          icon: 'info',
          color: 'primary',
          textColor: 'white',
          message: `Processing request...`,
          timeout: 3000,
          caption: this.config.notificationCaption
          // badgeColor: 'red',
          // badgeTextColor: 'dark',
          // badgeClass: 'shadow-3 glossy my-badge-class',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
        this.$q.notify(notification)
        this.meterToGet = this.device
        this.device = null
        this.amount = null
      } catch (error) {
        const notification = {
          position: 'bottom',
          // group: 'cart',
          icon: 'warning',
          color: 'red',
          textColor: 'white',
          message: error.message,
          timeout: 5000
          // multiLine: true,
          // badgeColor: 'red',
          // badgeTextColor: 'dark',
          // badgeClass: 'shadow-3 glossy my-badge-class',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
        this.$q.notify(notification)
      }
    },
    Validate() {
      this.config.validation.rules.forEach(item => {
        if (item.check(this.device)) throw Error(item.error)
      })
      if (!this.amount)
        throw Error(
          `Enter an amount between ${this.lowest} and ${this.highest +
            this.fee}`
        )
      if (this.amount < this.lowest)
        throw Error(`Enter an amount more than ${this.lowest}`)
      if (this.amount > this.highest + this.fee)
        throw Error(`Enter an amount less than ${this.highest + this.fee}`)
    }
  }
}
</script>

