<template>
  <div
    id="app">

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk}` : 'Test Messages';
    },
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '',
      },
    ],
  }
}
</script>

<style lang="sass">
  @import '@/styles/main.sass'
</style>
