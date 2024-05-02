<template>
  <navBarComponent v-show="showNavbar" />
  <RouterView></RouterView>
</template>

<script>
import navBarComponent from "./components/navBarComponent.vue";
export default {
  components: {
    navBarComponent,
  },
  computed: {
    showNavbar() {
      const paths = ["admin", "student", "addExam", "unauthorized","users"];
      const currentPath = this.$route.path.split("/").pop();
      return paths.includes(currentPath);
    },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
</style>
