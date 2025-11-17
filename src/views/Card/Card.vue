<template>
  <div class="container card-page">
    <h2>Your Card Details</h2>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <p><strong>Name:</strong> {{ card.user.first_name }}</p>
      <p><strong>Email:</strong> {{ card.user.email }}</p>
      <p><strong>Phone:</strong> {{ card.user.phone }}</p>
      <!-- <p><strong>Member ID:</strong> {{ card.member_id }}</p> -->
    </div>
  </div>
</template>

<script>
import api from "../../services/api.js";

export default {
  data() {
    return {
      card: {},
      loading: true
    };
  },

  async created() {
    await this.fetchCard();
  },

  methods: {
    async fetchCard() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          this.$router.push("/login");
          return;
        }

        const res = await api.getCard(token);

        this.card = res.data;
        // alert(JSON.stringify(this.card.user.first_name));
        this.loading = false;

      } catch (err) {
        console.error(err);
        alert("Failed to load card details");
      }
    }
  }
};
</script>
