<template>
  <v-app-bar
    elevation="0"
    height="70"
    class="pr-5 cust-border bg-secondary"
  >
    <!-- Mobile menu toggle -->
    <v-btn icon class="d-md-none" @click="handleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Logo section -->
    <template v-slot:prepend>
      <div 
        :class="
          !rail
            ? 'logo-parent pl-5 bg-secondary'
            : 'logo-parent-sm pl-3 bg-secondary'
        "
      >
        <div class="logo-wrapper">
          <!-- Expanded state: logo + title -->
          <template v-if="!rail">
            <img
              :src="logoIcon"
              alt="Logo"
              width="35"
              height="100%"
            />
            <span class="text-h6 text-sm-h5 text-md-h5 font-weight-bold text-primary ml-4 text-no-wrap">
              {{ appName }}
            </span>
          </template>

          <!-- Collapsed state: only icon -->
          <template v-else>
            <img
              :src="logoIcon"
              alt="Logo"
              width="30"
              height="100%"
            />
          </template>
        </div>
      </div>
    </template>

    <v-spacer />

    <!-- Right side - Add logout button -->
    <div class="d-flex align-center">
      <v-btn
        icon
        @click="handleLogout"
        title="Logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
const emit = defineEmits(["small-screen-drawer"]);
const authStore = useAuthStore();

const props = defineProps({
  drawer: Boolean,
  rail: Boolean,
  logoIcon: {
    type: String,
    required: true
  },
  appName: {
    type: String,
    default: 'My App'
  }
});

const handleDrawer = () => {
  emit("small-screen-drawer", !props.rail);
};

const handleLogout = () => {
  authStore.logout();
};

watch(
  () => props.drawer,
  (newVal) => {
    console.log("Drawer changed:", newVal);
  }
);
</script>

<style scoped>
.logo-parent {
  width: 255px;
  height: 100%;
  margin-left: 20px;
}
.logo-parent-sm {
  width: 56px;
  height: 100%;
}
.cust-border { 
  border-bottom: 1px solid rgba(0,0,0,0.08); 
}
:deep(.v-toolbar__prepend) {
  margin-inline: 0 !important;
}
.logo-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
