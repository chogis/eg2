<template>
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-card dark bordered v-show="showToken" class="bg-primary q-my-lg" style="width: 250px">
        <q-card-section>
          <div class="text-subtitle2">D{{sale.amount}}, NAWEC Cashpower</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h4 text-center">{{t.pin1}} {{t.pin2}}</div>
          <div class="text-h4 text-center">{{t.pin3}} {{t.pin4}}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2">{{sale.name}}</div>
          <div class="text-subtitle2">Meter No {{sale.meter}}</div>
          <div class="text-subtitle2">{{sale.kwh}} kWh</div>
        </q-card-section>
      </q-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Token',
  props: ['sale'],
  data() {
    return {
      showToken: true
    }
  },
  computed: {
    t() {
      let pin = this.sale.token.split('')
      const q = pin.length / 4

      return {
        pin1: pin.splice(0, q).join(''),
        pin2: pin.splice(0, q).join(''),
        pin3: pin.splice(0, q).join(''),
        pin4: pin.splice(0, q).join('')
      }
    }
  }
}
</script>

