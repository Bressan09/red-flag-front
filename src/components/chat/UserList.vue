<template>
  <div class="user-list">
    <div class="online-users">
      Online Users
      <p v-for="(onlineUser, index) in onlineUsers" :key="index">
        {{ onlineUser }}
      </p>
    </div>
    <hr class="rounded" />
    <div class="offline-users">
      Offline Users
      <p v-for="(offlineUser, index) in offlineUsers" :key="index">
        {{ offlineUser }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component<UserList>({})
export default class UserList extends Vue {
  @Prop()
  onlineUsers: string[];
  @Prop({ default: [] })
  offlineUsers: string[];
}
</script>

<style />
