<template>
  <div class="chat-view">
    <user-list
      :offlineUsers="offlineUsers"
      :onlineUsers="onlineUsers"
      class="chat-user-list"
    />

    <div class="chat-area">
      <message-list
        :messages="messages"
        class="chat-messages"
        id="chat-messages"
        @scroll-bottom="scrollBottom"
      />
      <chat-input-bar @send-message="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Socket } from 'vue-socket.io-extended';
import UserList from '../components/chat/UserList.vue';
import MessageList from '../components/chat/MessageList.vue';
import ChatInputBar from '../components/chat/ChatInputBar.vue';
import IMessage from '../interfaces/IMessage';

@Component<Chat>({
  components: { UserList, MessageList, ChatInputBar }
})
export default class Chat extends Vue {
  createSystemMessage(message: string): IMessage {
    return { user: 'System', body: message };
  }

  beforeMount() {
    this.$socket.client.open();
  }

  beforeDestroy() {
    this.$socket.client.close();
  }

  @Socket('chatMessage')
  chatMessage(data: { user: string; body: string }): void {
    this.messages.push(data);
  }

  @Socket('userConnected')
  userConnected(data: string): void {
    this.onlineUsers.push(data);
    this.messages.push(this.createSystemMessage('User Connected: ' + data));
  }

  @Socket('userDisconnected')
  userDisconnected(data: string): void {
    const index = this.onlineUsers.indexOf(data);
    this.onlineUsers.splice(index, 1);
    this.offlineUsers.push(data);
    this.messages.push(this.createSystemMessage('User Disconnected: ' + data));
  }

  messages: IMessage[] = [];
  onlineUsers: string[] = [];
  offlineUsers: string[] = [];

  scrollBottom() {
    const element = document.getElementById('chat-messages');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  sendMessage(message: string): void {
    this.$socket.client.emit('chatMessage', message);
    this.messages.push({ user: 'Me', body: message });
  }
}
</script>

<style scoped>
.chat-view {
  display: flex;
  flex: 1;
  column-gap: 10px;
}
.chat-user-list {
  overflow: auto;
}

.chat-area {
  overflow: auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.chat-messages {
  overflow: auto;
  flex: 1;
}
</style>
