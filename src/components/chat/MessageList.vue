<template>
  <div class="message-list">
    <template v-for="(item, index) in messages">
      <message :item="item" :key="index" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Message from './Message.vue';
import IMessage from '../../interfaces/IMessage';

@Component<MessageList>({ components: { Message } })
export default class MessageList extends Vue {
  @Prop()
  messages: IMessage[];

  updated() {
    console.log('updated');
    this.$emit('scroll-bottom');
  }
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
}

.message-list .message:nth-child(odd) {
  background: rgb(255, 212, 148);
}
</style>
