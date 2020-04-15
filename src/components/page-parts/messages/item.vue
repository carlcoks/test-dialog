<template>
  <div
    class="message"
    :class="{ 'message--me' : user.name === item.author }">
    <div
      class="message__box">

      <div
        class="message__wrap">
        <div
          class="message__text">
          {{ item.text }}
        </div>
      </div>

      <div
        class="message__bottom">
        <div
          class="message__author">
          {{ item.author }}
        </div>
        <div
          class="message__date">
          {{ item.created }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style lang="css">
</style>
