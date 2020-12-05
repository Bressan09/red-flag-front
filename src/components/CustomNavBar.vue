<template>
  <div class="navbar">
    <nav class="navbar-nav">
      <router-link to="/about" exact tag="div" class="navbar-link">
        About
      </router-link>
      <router-link to="/" exact tag="div" class="navbar-link">
        Home
      </router-link>
      <router-link to="/chat" exact tag="div" class="navbar-link">
        Chat
      </router-link>
    </nav>
    <div class="brand">Red Flag</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component<CustomNavBar>({})
export default class CustomNavBar extends Vue {}
</script>

<style scoped>
.navbar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: var(--primary-color);
  align-items: stretch;
}

.navbar-nav {
  display: flex;
  flex: 1;
}

.navbar-link {
  text-transform: uppercase;
  padding: 5px;
  color: white;
  cursor: pointer;
}

.navbar-link.router-link-exact-active {
  background-color: var(--secondary-color);
}

.brand {
  text-transform: uppercase;
  color: white;
  padding-right: 10px;
}
</style>
