<template>
  <div
    class="txtarea">

    <textarea
      v-model.trim="text"
      :placeholder="holder"
      @change="$emit('changeInput', $event.target.value)"
      :rows="rows"
    />

  </div>
</template>

<script>
export default {
  props: {
    value: String,
    holder: String,
    rows: Number
  },
  data() {
    return {
      text: this.value
    }
  },
  watch: {
    value(data) {
      this.text = data
    }
  }
}
</script>

<style lang="css">
</style>
