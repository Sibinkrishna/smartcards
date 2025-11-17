<template>
  <transition name="fade" mode="out-in">
  <router-view />
  </transition>
</template>
<style>
body, html, #app {
  margin: 0 !important;
  /* height: 100vh !important; */
  overflow: hidden;
   overscroll-behavior: none;
}
</style>
<script>
window.addEventListener("focusout", () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
});
</script>