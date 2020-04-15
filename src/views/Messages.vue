<template>
  <div
    ref="scrollList"
    class="messages">

    <Spinner
      v-if="!messages"
      color="#398BFF"
    />

    <div
      v-else
      class="messages__list">

      <Message
        v-for="(item, i) in messages"
        :key="i"
        :item="item"
      />

    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import Message from '@/components/page-parts/messages/item'
import Spinner from '@/components/ui/Spinner'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Message,
    Spinner
  },
  watch: {
    id() {
      this.getMessagesF()
    }
  },
  computed: {
    ...mapState('dialogs', ['dialogs', 'messages'])
  },
  created() {
    this.getMessagesF()
  },
  methods: {
    ...mapMutations('dialogs', ['RESET_MESSAGES']),
    ...mapActions('dialogs', ['getMessages']),

    async getMessagesF() {
      this.RESET_MESSAGES()
      const id = this.id
      if (!isNaN(+id) && +id > 0)
        await this.getMessages({
          id
        })
      this.scroll()
    },

    scroll() {
      if (process.browser) {
        this.$nextTick(() => {
          this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
