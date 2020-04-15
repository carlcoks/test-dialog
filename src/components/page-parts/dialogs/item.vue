<template>
  <router-link
    :to="`/dialogs/${item.id}`"
    class="dialog">
    <div
      class="dialog__header">
      <div
        class="dialog__title">
        {{ item.subject }}
      </div>
      <div
        class="dialog__date">
        {{ date }}
      </div>
    </div>

    <div
      class="dialog__text">
      {{ item.parts[item.parts.length - 1].text }}
    </div>

  </router-link>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    date() {
      return this.$dayjs(this.item.created).format('DD MMM YYYY')
    }
  }
}
</script>

<style lang="css">
</style>
