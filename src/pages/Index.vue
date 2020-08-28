<template>
  <q-page class="fit column wrap justify-start items-center content-center q-pa-md">
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered>
        <template v-for="item in Complete">
          <q-item clickable v-ripple :disable="item.disabled" @click="test(item)" :key="item.link">
            <q-item-section avatar>
              <q-icon size="md" :color="item.color" :name="item.icon"/>
            </q-item-section>

            <q-item-section>
              <q-item-label :class="`text-${item.color} text-h6`">{{item.title}}</q-item-label>
              <q-item-label caption :class="`text-${item.color}`">{{item.caption}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
        </template>
        <!-- <q-item-label header>Coming Soon</q-item-label>
        <template v-for="item in Incomplete">
          <q-item clickable v-ripple :to="item.link" :disable="item.disabled">
            <q-item-section avatar>
              <q-icon size="md" :color="item.color" :name="item.icon"/>
            </q-item-section>

            <q-item-section>
              <q-item-label :class="`text-${item.color} text-h6`">{{item.title}}</q-item-label>
              <q-item-label caption :class="`text-${item.color}`">{{item.caption}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
        </template>-->
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      amount: null,
      mobile: null,
      essentialLinks: [
        {
          title: 'Cash Power',
          caption: 'NAWEC prepaid electricity',
          icon: 'power',
          link: '/cashpower',
          color: 'black',
          disabled: false
        },
        {
          title: 'Nopal',
          caption: 'Mobile airtime for all networks',
          icon: 'call',
          link: '/nopal',
          color: 'black',
          disabled: false
        },
        {
          title: 'Points',
          caption: 'For everything',
          icon: 'insert_emoticon',
          link: '/points',
          color: 'black',
          disabled: false
        },
        {
          title: 'History',
          caption: 'Track your activities',
          icon: 'history',
          link: '/history',
          color: 'black',
          disabled: true
        },
        {
          title: 'Settings',
          caption: 'Personalise the app',
          icon: 'settings',
          link: '/settings',
          disabled: true
        },
        {
          title: 'Sign Up',
          caption: 'To access services',
          icon: 'person',
          link: '/auth',
          disabled: false
        },
        {
          title: 'Shopping',
          caption: 'Home delivery',
          icon: 'shopping_cart',
          link: '/shop',
          color: 'black',
          disabled: true
        }
        // {
        //   title: 'Facebook',
        //   caption: '@QuasarFramework',
        //   icon: 'public',
        //   link: 'https://facebook.quasar.dev'
        // },
        // {
        //   title: 'Quasar Awesome',
        //   caption: 'Community Quasar projects',
        //   icon: 'favorite',
        //   link: 'https://awesome.quasar.dev'
        // }
      ]
    }
  },
  methods: {
    ...mapMutations('store', ['updatePage']),
    test(e) {
      // console.log(e.title, 'test')
      this.updatePage(e.title)
      this.$router.push(e.link)
    },
    SendNopal() {
      const notification = {
        position: 'bottom',
        // group: 'cart',
        icon: 'info',
        color: 'black',
        textColor: 'white',
        message: `Sending D${this.amount} nopal to ${this.mobile}... `,
        timeout: 5000
        // multiLine: true,
        // caption: `Earn ${this.amount} B as rewards`
        // badgeColor: 'red',
        // badgeTextColor: 'dark',
        // badgeClass: 'shadow-3 glossy my-badge-class',
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      }
      this.$q.notify(notification)
    }
  },
  computed: {
    Complete() {
      return this.essentialLinks.filter(item => !item.disabled)
    },
    Incomplete() {
      return this.essentialLinks.filter(item => item.disabled)
    },
    Send() {
      return !(
        this.amount &&
        this.mobile &&
        this.amount > 4 &&
        this.amount < 5000
      )
    }
  },
  created() {
    this.updatePage(null)
  }
}
</script>
