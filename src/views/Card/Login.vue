<template>
<div class="w-full max-w-[768px] h-100 overflow-y-auto bg-[#f5f7fb] flex flex-col mx-auto">
    <!-- HEADER GRADIENT -->
    <div class="w-full p-6 pt-8 pb-20 bg-gradient-to-r from-black via-gray-900 to-black text-white text-center rounded-b-[30px]">
      
      <div class="flex justify-between text-[13px] opacity-90 items-center">
        <span>Don't have an account?</span>
        <router-link 
          class="text-white bg-white/25 px-4 py-1.5 rounded-full text-[12px]"
          to="/register">
          Get Started
        </router-link>
      </div>

      <h1 class="mt-6 text-[28px] font-bold">Smart Cards</h1>
    </div>

    <!-- WHITE ROUNDED CARD -->
    <div class="w-full h-100 bg-white p-6 -mt-12 rounded-[25px]">

      <h2 class="text-[22px] font-bold">Welcome Back</h2>

      <p class="text-red-600 text-[12px] mt-2">{{ message }}</p>
      <!-- Email / Phone -->
      <div class="mb-2 mt-2">
  <label class="text-[13px] text-gray-600 block mb-1">Email / Phone</label>

    <input
      type="text"
      v-model="identifier"
      @input="validateIdentifier"
      placeholder="Enter email or phone"
      :class="[
    'w-full px-[12px] py-[12px] border rounded-xl text-[12px] text-gray-900 focus:outline-none focus:border-black/100 focus:ring-1 focus:ring-black/100',
    identifierError
      ? 'border-red-500'
      : identifier && !identifierError
      ? 'border-green-500'
      : 'border-gray-300'
  ]"
    />
  
  <!-- Error message -->
  <p v-if="identifierError" class="text-red-600 text-[12px] mt-1">{{ identifierError }}</p>
</div>

<!-- Password -->
<div class="mb-2">
  <label class="text-[13px] text-gray-600 block mb-1">Password</label>

  <div class="relative">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      @input="validatePassword"
      placeholder="Enter password"
      :class="[
        'w-full px-[12px] py-[12px] border rounded-xl text-[12px] focus:outline-none focus:border-black/100 focus:ring-1 focus:ring-black/100',
        passwordError ? 'border-red-500' : 
        password && !passwordError ? 'border-green-500' : 'border-gray-300'
      ]"
    />

    <!-- Toggle Icon -->
    <button
      type="button"
      @click="showPassword = !showPassword"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
      tabindex="-1"
    >
      <Eye v-if="!showPassword" :size="20" />
      <EyeOff v-else :size="20" />
    </button>
  </div>
  <!-- Password error -->
  <p v-if="passwordError" class="text-red-600 text-[12px] mt-1">{{ passwordError }}</p>
</div>

<!-- LOGIN BUTTON -->
<button
  class="w-full py-3.5 mt-3 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl text-[16px] flex items-center justify-center"
  @click="handleLogin"
  :disabled="loading"
>
   <span v-if="!loading">Login</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Login.....
            </span>
</button>

      <!-- Forgot password -->
      <p class="mt-3 text-[13px] text-center text-gray-600">Forgot your password?</p>

      <!-- Divider -->
      <div class="flex items-center my-3">
        <span class="flex-1 h-px bg-gray-300"></span>
        <p class="mx-3 text-[12px] text-gray-500">Or sign in with</p>
        <span class="flex-1 h-px bg-gray-300"></span>
      </div>

      <!-- SOCIAL BUTTONS -->
      <div class="flex justify-between">
        <button class="w-[48%] py-3 border-[1px] border-black rounded-xl text-[14px] bg-white flex items-center justify-center gap-2"><FontAwesomeIcon :icon="['fab', 'google']" class="text-black-600 w-5 h-5" />Google</button>
        <button class="w-[48%] py-3 border-[1px] border-black rounded-xl text-[14px] bg-white flex items-center justify-center gap-2"><FontAwesomeIcon :icon="['fab', 'facebook']" class="text-black-600 w-5 h-5" />Facebook</button>
      </div>

    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import api from "../../services/api.js"
import { Eye, EyeOff } from 'lucide-vue-next'
export default {
  components: { FontAwesomeIcon, Eye, EyeOff },

  data() {
    return {
      identifier: "",
      password: "",
      showPassword: false,
      loading: false,

      identifierError: "",
      passwordError: "",
    };
  },

  methods: {
    // --------------------------
    // Email / Phone Validation
    // --------------------------
    validateIdentifier() {
      const id = this.identifier.trim();

      if (!id) {
        this.identifierError = "This field is required";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!emailRegex.test(id) && !phoneRegex.test(id)) {
        this.identifierError = "Enter valid email or 10-digit phone";
      } else {
        this.identifierError = "";
      }
    },

    // --------------------------
    // Password Validation
    // --------------------------
    validatePassword() {
      if (!this.password) {
        this.passwordError = "Password is required";
      } else if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters";
      } else {
        this.passwordError = "";
      }
    },

    // --------------------------
    // Login API
    // --------------------------
    async handleLogin() {
      this.validateIdentifier();
      this.validatePassword();

      if (this.identifierError || this.passwordError) return;

      try {
        this.loading = true;

        const payload = {
          login: this.identifier.trim(),
          password: this.password,
        };

        const res = await api.login(payload);

        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/card");
        } else {
          this.message = "Login failed. Try again.";
        }
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          "Login failed. Check email/phone and password.";
        // alert(msg);
         this.message = msg;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
@import "../../assets/styles/auth.css";
</style>
