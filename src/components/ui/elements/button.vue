<template>
  <button
    class="btn"
    @click.prevent="$emit('click')">

    <span
      v-if="!loading">

      <slot />

    </span>

    <span
      v-if="loading"
      class="btn__loader">
      <spinner
        :size="24"
        :color="loadingColor"
      />
    </span>

  </button>
</template>

<script>
import Spinner from '../Spinner'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    Spinner
  }
}
</script>

<style lang="css">
</style>
