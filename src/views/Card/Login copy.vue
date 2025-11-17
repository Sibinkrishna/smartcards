<template>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <div class="login-wrapper">

    <!-- HEADER GRADIENT -->
    <div class="header">
      <div class="top-bar">
        <span>Don't have an account?</span>
        <router-link class="get-started" to="/register">Get Started</router-link>
      </div>

      <h1 class="app-title">Jobsly</h1>
    </div>

    <!-- WHITE ROUNDED CARD -->
    <div class="form-card">

      <h2 class="title">Welcome Back</h2>
      <p class="subtitle">Enter your details below</p>

      <!-- Email / Phone -->
      <div class="form-group">
        <label>Email / Phone</label>
        <input type="text" v-model="identifier" placeholder="Enter email or phone" />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label>Password</label>
        <div class="password-group">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="password" 
            placeholder="Enter password"
          />
          <span class="toggle" @click="showPassword = !showPassword">
            {{ showPassword ? '' : '' }}
          </span>
        </div>
      </div>

      <!-- LOGIN BUTTON -->
      <button class="btn primary" @click="handleLogin">Sign In</button>

      <!-- Forgot password -->
      <p class="forgot">Forgot your password?</p>

      <!-- Divider -->
      <div class="divider">
        <span></span>
        <p>Or sign in with</p>
        <span></span>
      </div>

      <!-- SOCIAL BUTTONS -->
      <div class="social-btns">
        <button class="social google">Google</button>
        <button class="social facebook">Facebook</button>
      </div>

    </div>
  </div>
</template>

<script>
import api from "../../services/api.js";

export default {
    data() {
        return {
            identifier: "",
            password: ""
        };
    },

    methods: {
        async handleLogin() {
    try {
        const id = this.identifier.trim();

        if (!id || !this.password) {
            alert("Please enter identifier and password");
            return;
        }

        // Just send as login — backend will decide email/phone
        const payload = {
            login: id,
            password: this.password
        };

        const res = await api.login(payload);

        if (res?.data?.token) {
            localStorage.setItem("token", res.data.token);
            alert("Login success");
            this.$router.push("/card");
        } else {
            alert("Login failed");
        }

    } catch (err) {
        console.error(err);
        const msg =
            err?.response?.data?.message ||
            "Login failed. Check email/phone and password.";
        alert(msg);
    }
}

    }
};
</script>

<style scoped>
@import "../../assets/styles/auth.css";
</style>
