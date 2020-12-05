<template>
  <form @submit.prevent="sendMessage">
    <div class="chat-input-bar">
      <div class="chat-input-text">
        <input type="text" v-model="message" />
      </div>
      <div class="chat-input-submit">
        <input type="submit" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component<ChatInputBar>({})
export default class ChatInputBar extends Vue {
  message: string = '';
  sendMessage() {
    if (this.message) {
      this.$emit('send-message', this.message);
      this.message = '';
    }
  }
}
</script>

<style scoped>
.chat-input-bar {
  display: flex;
}
.chat-input-text {
  flex: 1;
  display: flex;
}
.chat-input-text * {
  flex: 1;
}
.chat-input-submit {
}
</style>
