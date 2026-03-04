<template>
  <div class="login-page">
    <v-row>
      <v-col cols="12" md="6" class="d-flex align-center justify-center px-12">
        <div style="width: 100%; max-width: 500px">
          <div class="logo-placeholder d-block mx-auto mb-6 text-center">
            <h1 style="font-size: 36px; color: #266DF0;">Flossly</h1>
          </div>
          <h2 class="text-center login-heading">Welcome!</h2>
          <h2 class="mb-6 text-center login-sub-heading" style="color: #8b8b8b">
            Let's get signed in securely.
          </h2>
          <v-form ref="form" @submit.prevent="login">
            <label class="lbl">Email</label>
            <v-text-field
              v-model="credentials.email"
              label="Email"
              type="email"
              :rules="emailRules"
              density="comfortable"
              variant="solo"
              single-line
              required
              class="mb-2 input-bordered"
              flat
            />
            <label class="lbl">Password</label>

            <v-text-field
              v-model="credentials.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              required
              variant="solo"
              single-line
              density="comfortable"
              class="input-bordered"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="togglePasswordVisibility"
              flat
            />
            <div v-if="loginError" class="error-message pa-3 mb-4" style="background-color: #ffebee; border: 1px solid #ef5350; border-radius: 8px;">
              <p style="color: #c62828; margin: 0;">{{ loginError }}</p>
            </div>
            <v-btn
              type="submit"
              color="primary"
              block
              variant="flat"
              class="mt-5 rounded-lg"
              height="48"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? 'Logging in...' : 'Log In' }}
            </v-btn>
          </v-form>
        </div>
      </v-col>
      <v-col v-if="!smAndDown" cols="12" md="6" class="d-flex align-center justify-center pa-0">
        <div class="px-4 w-100">
          <div
            class="background-image relative d-flex align-center justify-center"
          >
            <!-- Centered content box -->
            <div class="overlay-box pa-8">
              <!-- Logo -->
              <div class="mb-6">
                <h2 style="font-size: 32px; color: #fff;">Flossly</h2>
              </div>

              <!-- Heading -->
              <h1
                style="
                  font-family: 'Garnett';
                  font-weight: 600;
                  font-size: 44px;
                  color: #fff;
                  margin-bottom: 16px;
                  text-align: left;
                "
              >
                All-in-One CRM and Task Manager
              </h1>

              <!-- Subheading -->
              <p
                style="
                  font-size: 18px;
                  line-height: 1.5;
                  color: #fff;
                  text-align: left;
                  max-width: 600px;
                "
              >
                <strong>
                  Automate patient flows, manage staff, and track clinic
                  performance</strong
                >
                with the only dental-specific platform you'll ever need.
              </p>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { smAndDown, mdAndUp, lgAndUp } = useDisplay();

const authStore = useAuthStore();

const credentials = ref({
  email: "",
  password: "",
});
const showPassword = ref(false);
const form = ref(null);
const loginError = ref(null);
const loading = ref(false);

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
];

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  const formValidation = await form.value.validate();
  
  if (formValidation.valid) {
    try {
      loading.value = true;
      loginError.value = null;
      
      await authStore.login(credentials.value.email.trim(), credentials.value.password);
      
      // Navigation handled by store
    } catch (err) {
      console.error('Login error:', err);
      loginError.value = err.data?.error || err.message || 'Login failed';
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.login-page .v-container {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.overlay-box {
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.1); /* translucent white */
  backdrop-filter: blur(10px); /* blur effect */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  max-width: 530px;
  width: 100%;
  text-align: left;
  border-radius: 15px;
}

.login-page {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}
.logoimg {
  width: 250px;
}

.background-image {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  width: 100%;
  height: 99vh;
  border-radius: 12px;
}
.login-heading {
  font-family: "Garnett";
  font-weight: 600;
  font-size: 44px;
}
.login-sub-heading {
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
}
.lbl {
  font-family: "Inter";
  font-weight: 400;
  font-style: "Regular";
  font-size: 16px;
  color: #1e1e1e;
}
.input-bordered :deep(.v-field) {
  border: 1px solid #dfdfdf !important;
  border-radius: 8px !important;
  background-color: white !important;
  min-height: 40px;
  font-size: 14px;
}
</style>
