<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="`${page ? 'arrow_back' : 'home'}`"
          aria-label="Home"
          @click="home"
        />

        <q-toolbar-title>
          {{title}}
          <q-badge v-if="page" color="amber-5" text-color="black" align="middle">{{page}}</q-badge>
        </q-toolbar-title>

        <div>{{rightTitle}}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainLayout',

  data() {
    return {
      title: 'tesito',
      rightTitle: '',
      leftDrawerOpen: false
    }
  },
  methods: {
    ...mapMutations('store', ['updatePage']),
    home() {
      this.updatePage(null)
      this.$router.replace('/')
    }
  },
  computed: {
    ...mapGetters('store', ['page'])
  }
}
</script>
