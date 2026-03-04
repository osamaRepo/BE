<template>
  <div>
    <v-container fluid class="pa-8">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-4">Dashboard</h1>
          <p class="text-body-1">Welcome to your dashboard!</p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-4">
            <h3 class="text-h6 mb-2">Total Users</h3>
            <p class="text-h4 text-primary">1,234</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-4">
            <h3 class="text-h6 mb-2">Active Sessions</h3>
            <p class="text-h4 text-primary">56</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-4">
            <h3 class="text-h6 mb-2">Total Revenue</h3>
            <p class="text-h4 text-primary">$45,678</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main-layout'
});
</script>