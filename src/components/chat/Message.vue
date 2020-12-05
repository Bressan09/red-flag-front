<template>
  <div class="message">
    <div>
      <b>{{ item.user }}</b>
    </div>
    <div>{{ item.body }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import IMessage from '../../interfaces/IMessage';

@Component<Message>({})
export default class Message extends Vue {
  @Prop()
  item: IMessage;
}
</script>

<style />
