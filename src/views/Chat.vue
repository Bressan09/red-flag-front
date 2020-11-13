<template>
  <v-container
    fluid
    class="grey lighten-3"
    style="display: flex; flex: 1 1 auto; height: 100%;"
  >
    <v-row style="max-height: 85vh">
      <v-col cols="3">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item
              v-for="onlineUser in onlineUsers"
              :key="onlineUser"
              link
            >
              <v-list-item-content>
                <v-list-item-title> {{ onlineUser }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
              v-for="offlineUser in offlineUsers"
              :key="offlineUser"
              link
            >
              <v-list-item-content>
                <v-list-item-title> {{ offlineUser }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col cols="9" style="overflow: auto; height: 100%;">
        <!--v-form @submit.prevent="sendMessage">
          <v-col style="padding:0">
            <v-list two-line shaped fill-height>
              <template v-for="(item, index) in messages">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                />

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                />

                <v-list-item v-else :key="item.title">
                  <v-list-item-avatar>
                    <v-skeleton-loader type="avatar" boilerplate />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Meu nome</v-list-item-title>
                    <v-list-item-subtitle> {{ item }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-col>

          <v-row>
            <v-btn tile depressed type="submit" outlined color="primary"
              >Send!</v-btn
            >
            <v-text-field label="Message" v-model="message"></v-text-field>
          </v-row>
        </!--v-form-->
        <v-list
          two-line
          shaped
          style="overflow: auto; height: 100%; flex-wrap: wrap;"
        >
          <template v-for="(item, index) in messages">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            />
            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            />

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-skeleton-loader type="avatar" boilerplate />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Meu nome</v-list-item-title>
                <v-list-item-subtitle> {{ item }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Socket } from 'vue-socket.io-extended';

@Component<Chat>({})
export default class Chat extends Vue {
  beforeMount() {
    this.$socket.client.open();
  }

  beforeDestroy() {
    this.$socket.client.close();
  }

  @Socket('chatMessage')
  chatMessage(data: string): void {
    this.messages.push(data);
  }

  @Socket('userConnected')
  userConnected(data: string): void {
    this.messages.push('User Connected: ' + data);
  }

  @Socket('userDisconnected')
  userDisconnected(data: string): void {
    this.messages.push('User Disconnected: ' + data);
  }

  messages: string[] = ['', '', '', '', '', '', '', '', '', ''];
  onlineUsers: string[] = ['João', 'Maria'];
  offlineUsers: string[] = ['Rodrigo', 'José'];
  message: string = '';

  sendMessage(): void {
    this.$socket.client.emit('chatMessage', this.message);
    this.messages.push(this.message);
    this.message = '';
  }
}
</script>
