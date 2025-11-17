<template>
  <div class="w-full max-w-[768px] h-screen overflow-y-auto bg-[#f5f7fb] flex flex-col mx-auto">
    <div class="w-full p-6 pt-8 pb-20 bg-gradient-to-r from-black via-gray-900 to-black text-white text-center rounded-b-[30px]">
      <div class="flex justify-between text-[13px] opacity-90 items-center">
        <span>Already have an account?</span>
        <router-link class="text-white bg-white/25 px-4 py-1.5 rounded-full text-[12px]" to="/login">Login</router-link>
      </div>
      <h1 class="mt-6 text-[28px] font-bold">Smart Cards</h1>
    </div>

    <div class="w-full h-screen bg-white p-6 -mt-12 rounded-[25px]">
      <h2 class="text-[22px] font-bold">Create Your Account</h2>
      <p class="text-red-600 text-[12px] mt-2">{{ message }}</p>

      <!-- First Name -->
       <div class="grid grid-cols-2 gap-4 mb-2">
      <div>
        <label class="text-[13px] text-gray-600 block mb-1">First Name</label>
        <input type="text" v-model="fname" @input="validateFname" placeholder="Enter first name"
          :class="inputClass(fname, fnameError) " />
        <p v-if="fnameError" class="text-red-600 text-[12px] mt-1">{{ fnameError }}</p>
      </div>

      <!-- Last Name -->
      <div>
        <label class="text-[13px] text-gray-600 block mb-1">Last Name</label>
        <input type="text" v-model="lname" @input="validateLname" placeholder="Enter last name"
          :class="inputClass(lname, lnameError) " />
        <p v-if="lnameError" class="text-red-600 text-[12px] mt-1">{{ lnameError }}</p>
      </div>
      </div>
      <!-- Email + Phone -->
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label class="text-[13px] text-gray-600 block mb-1">Email</label>
          <input type="text" v-model="email" @input="validateEmail" placeholder="Enter email"
            :class="inputClass(email, emailError)" />
          <p v-if="emailError" class="text-red-600 text-[12px] mt-1">{{ emailError }}</p>
        </div>

        <div>
          <label class="text-[13px] text-gray-600 block mb-1">Phone</label>
          <input type="tel" v-model="phone" @input="validatePhone" placeholder="Enter phone"
            :class="inputClass(phone, phoneError)" />
          <p v-if="phoneError" class="text-red-600 text-[12px] mt-1">{{ phoneError }}</p>
        </div>
      </div>

      <!-- Password -->
      <div class="mb-2">
        <label class="text-[13px] text-gray-600 block mb-1">Password</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" @input="validatePassword"
            placeholder="Enter password" :class="inputClass(password, passwordError)" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" tabindex="-1">
            <Eye v-if="!showPassword" :size="20" />
            <EyeOff v-else :size="20" />
          </button>
        </div>
        <p v-if="passwordError" class="text-red-600 text-[12px] mt-1">{{ passwordError }}</p>
      </div>

      <!-- Confirm Password -->
      <div class="mb-2">
        <label class="text-[13px] text-gray-600 block mb-1">Confirm Password</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword"
            @input="validateConfirmPassword" placeholder="Confirm password"
            :class="inputClass(confirmPassword, confirmPasswordError)" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" tabindex="-1">
            <Eye v-if="!showPassword" :size="20" />
            <EyeOff v-else :size="20" />
          </button>
        </div>
        <p v-if="confirmPasswordError" class="text-red-600 text-[12px] mt-1">{{ confirmPasswordError }}</p>
      </div>

      <!-- Register -->
      <button class="w-full py-3.5 mt-3 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl text-[16px] flex items-center justify-center"
        @click="handleRegister" :disabled="loading">
        <span v-if="!loading">Register</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Registering...
        </span>
      </button>

      <!-- OTP POPUP (Slide Up) -->
      <transition name="slide-up">
  <div v-if="showOtpPopup"
    class="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-xl rounded-t-2xl border-t z-50">

    <h3 class="text-lg font-bold text-center">OTP Sent</h3>
    <p class="text-center mt-1 text-gray-600">Enter OTP sent to {{ phone }}</p>

    <!-- OTP INPUT BOXES -->
    <div class="flex justify-center gap-2 mt-4">
      <input
        v-for="(digit, index) in otpDigits"
        :key="index"
        ref="otpInputs"
        maxlength="1"
        @input="handleOtpInput(index, $event)"
        @keydown.backspace="handleBackspace(index, $event)"
        class="w-10 h-12 text-center border rounded-lg text-lg font-bold focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>

    <!-- TIMER -->
    <p class="text-center mt-3 text-red-600 text-sm">
      Expires in: {{ timerText }}
    </p>

    <!-- VERIFY BUTTON -->
    <button
      @click="verifyOtp"
      :disabled="verifying"
      class="w-full mt-4 bg-black text-white py-3 rounded-xl"
    >
      <span v-if="!verifying">Verify OTP</span>
      <span v-else>Verifying...</span>
    </button>

  </div>
</transition>


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
      // Registration fields
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      loading: false,
      message: "",

      // OTP POPUP
      showOtpPopup: false,
      otpDigits: ["", "", "", "", "", ""], // 6-digit OTP
      otp: "",
      verifying: false,

      // Timer
      timer: 0,
      timerText: "",

      // Errors
      fnameError: "",
      lnameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
      confirmPasswordError: "",
    };
  },

  methods: {
    /* ---------- INPUT CLASS ---------- */
    inputClass(value, error) {
      return [
        "w-full px-[12px] py-[12px] border rounded-xl text-[12px] text-gray-900",
        "focus:outline-none focus:border-black/100 focus:ring-1 focus:ring-black/100",
        error ? "border-red-500" : value ? "border-green-500" : "border-gray-300"
      ];
    },

    /* ---------- VALIDATIONS ---------- */
    validateFname() {
      this.fnameError = this.fname.trim() ? "" : "First name is required";
    },
    validateLname() {
      this.lnameError = this.lname.trim() ? "" : "Last name is required";
    },
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) this.emailError = "Email is required";
      else if (!regex.test(this.email)) this.emailError = "Enter valid email";
      else this.emailError = "";
    },
    validatePhone() {
      const regex = /^[0-9]{10}$/;
      if (!this.phone) this.phoneError = "Phone is required";
      else if (!regex.test(this.phone)) this.phoneError = "Enter valid 10-digit phone";
      else this.phoneError = "";
    },
    validatePassword() {
      if (!this.password) this.passwordError = "Password is required";
      else if (this.password.length < 6) this.passwordError = "Minimum 6 characters";
      else this.passwordError = "";
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) this.confirmPasswordError = "Confirm your password";
      else if (this.confirmPassword !== this.password) this.confirmPasswordError = "Passwords do not match";
      else this.confirmPasswordError = "";
    },

    /* ---------- OTP INPUT HANDLING ---------- */
    handleOtpInput(index, event) {
      const value = event.target.value.replace(/\D/g, "");

      this.otpDigits[index] = value;

      if (value && index < 5) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },

    handleBackspace(index, event) {
      if (!this.otpDigits[index] && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },

    /* ---------- TIMER ---------- */
    startTimer(seconds) {
      this.timer = seconds;
      this.timerText = `${seconds}s`;

      const interval = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(interval);
          this.timerText = "Expired";
          return;
        }

        this.timer--;
        this.timerText = `${this.timer}s`;
      }, 1000);
    },

    /* ---------- REGISTER ---------- */
    async handleRegister() {
      this.validateFname();
      this.validateLname();
      this.validateEmail();
      this.validatePhone();
      this.validatePassword();
      this.validateConfirmPassword();

      if (
        this.fnameError || this.lnameError || this.emailError ||
        this.phoneError || this.passwordError || this.confirmPasswordError
      ) return;

      this.loading = true;
      this.message = "";

      try {
        const res = await api.register({
          fname: this.fname.trim(),
          lname: this.lname.trim(),
          email: this.email.trim(),
          phone: this.phone.trim(),
          password: this.password,
          app_signature: "s2c6RYetthc",
        });

        if (res.data.success) {
          this.otp = res.data.otp;
          this.showOtpPopup = true;

          // Show timer
          const seconds = Math.abs(res.data.otp_expiry_time.seconds);
          this.startTimer(seconds);
        }

      } catch (err) {
        this.message =
          err?.response?.data?.message ||
          "Registration failed. Please check your details.";
      }

      this.loading = false;
    },

    /* ---------- VERIFY OTP ---------- */
    async verifyOtp() {
      const otpValue = this.otpDigits.join("");

      if (otpValue.length !== 6) {
        alert("Enter 6-digit OTP");
        return;
      }

      this.verifying = true;

      try {
        const res = await api.verifyOtp({
          phone: this.phone,
          otp: otpValue,
        });

        if (res.data.success) {

      // Close OTP popup
      this.showOtpPopup = false;

      // Save token
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Call user card API
      const cardResponse = await api.getCard();

      // Save card details globally (OPTIONAL)
      localStorage.setItem("userCard", JSON.stringify(cardResponse.data));

      // Redirect to card page
      this.$router.push("/card");
    }  
        else {
          alert(res.data.message || "Invalid OTP");
        }
      } catch (err) {
        alert("OTP verification failed");
      }

      this.verifying = false;
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/auth.css";

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

</style>