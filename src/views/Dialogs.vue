<template>
  <section
    class="dialogs">

    <div
      class="dialogs__side">

      <div
        class="dialogs__header">
        <p
          class="dialogs__title">
          Сообщения
          <span
            class="dialogs__count">
            {{ count }}
          </span>
        </p>
      </div>

      <div
        class="dialogs__list">

        <Dialog
          v-for="(item, i) in dialogs"
          :key="i"
          :item="item"
        />

      </div>

    </div>

    <div
      v-if="!$route.params.id"
      class="dialogs__content dialogs__content--empty">
      <p>
        Выберите диалог
      </p>
    </div>

    <div
      v-else
      class="dialogs__content">

      <router-view
        ref="scrollList"
        class="dialogs__messages" />

      <div
        class="dialogs__form">
        <div
          class="dialogs__input">

          <v-txtarea
            :value="message"
            holder="Введите текст..."
            @changeInput="message = $event"
            :rows="1" />

        </div>
        <div
          class="dialogs__btn">
          <v-btn
            class="btn-send"
            :loading="formLoad"
            @click="submit()">
            <svg-icon
              name="send"
              width="22"
              height="18"
            />
          </v-btn>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Dialog from '@/components/page-parts/dialogs/item'

export default {
  components: {
    Dialog
  },
  data() {
    return {
      array: [{}, {}, {}, {}],
      message: '',
      formLoad: false
    }
  },
  computed: {
    ...mapState('dialogs', ['dialogs']),
    ...mapState('user', ['user']),

    count() {
      let count = 0
      this.dialogs.forEach(item => {
        count += item.parts.length
      })
      return count
    }
  },
  methods: {
    ...mapActions('dialogs', ['sendMessage']),

    async submit() {
      if (!this.message) {
        return false
      }

      this.formLoad = true
      await this.sendMessage({
        id: this.$route.params.id,
        mess: {
          text: this.message,
          author: this.user.name,
          created: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm')
        }
      })

      this.message = ''
      this.formLoad = false
      this.scroll()
    },

    scroll() {
      this.$nextTick(() => {
        this.$refs.scrollList.$el.scrollTop = this.$refs.scrollList.$el.scrollHeight
      })
    }
  }
}
</script>

<style lang="css">
</style>
