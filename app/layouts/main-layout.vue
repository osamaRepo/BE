<template>
  <div>
    <PortableHeader
      :rail="rail"
      :drawer="drawer"
      logo-icon="/favicon.ico"
      app-name="Flossly"
      @small-screen-drawer="onDrawerChange"
    />
    
    <PortableSidebar
      v-if="!(smAndDown && rail)"
      :rail="rail"
      :drawer="drawer"
      :menu-items="menuItems"
      :app-bar-height="70"
      @update:drawer="updateDrawer"
      @update:rail="updateRail"
    />
    
    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import PortableHeader from '~/components/PortableHeader.vue';
import PortableSidebar from '~/components/PortableSidebar.vue';

const { smAndDown, mdAndUp } = useDisplay();

console.log('Layout mounted!');

const rail = ref(false);
const drawer = ref(true);

const updateDrawer = (value) => {
  drawer.value = value;
};

const updateRail = (value) => {
  rail.value = value;
};

const onDrawerChange = (value) => {
  drawer.value = !drawer.value;
};

// Auto-manage rail state based on screen size
watch(mdAndUp, (newVal) => {
  if (newVal) {
    rail.value = false;
  }
});

// Define menu items
const menuItems = [
  {
    title: 'Dashboard',
    to: '/',
    value: 'dashboard',
    icon: 'mdi-view-dashboard',
  },
  {
    title: 'Settings',
    to: '/settings',
    value: 'settings',
    icon: 'mdi-cog',
    children: [
      {
        title: 'Profile',
        to: '/settings/profile',
        value: 'profile',
        icon: 'mdi-account'
      },
      {
        title: 'Preferences',
        to: '/settings/preferences',
        value: 'preferences',
        icon: 'mdi-tune'
      }
    ]
  },
  {
    title: 'Users',
    to: '/users',
    value: 'users',
    icon: 'mdi-account-group',
  },
];
</script>

<style scoped>
.v-main {
  padding-top: 70px;
}
</style>
