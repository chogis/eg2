<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'EssentialLink',

  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapMutations('store', ['updatePage']),
    test() {
      console.log('test')
    }
  },
  computed: {
    ...mapGetters('store', ['page'])
  }
}
</script>
