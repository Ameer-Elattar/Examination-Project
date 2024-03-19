<template>
  <section class="card w-50 mx-auto">
    <div class="input-group mx-auto my-2">
      <span class="input-group-text"><i class="fa-solid fa-user" /></span>
      <input
        type="text"
        id="username"
        name="username"
        class="form-control"
        placeholder="Pls Enter Your Name"
        autocomplete="off"
        v-model="this.name"
      />
    </div>
    <div class="input-group mx-auto my-2">
      <span class="input-group-text"><i class="fa-solid fa-lock" /></span>
      <input
        type="password"
        id="password"
        class="form-control"
        name="password"
        placeholder="Pls Enter Your password"
        v-model="this.password"
      />
    </div>
    <router-link
      :to="this.toRoute"
      @click="checkInfo"
      class="btn btn-outline-primary mx-auto my-2"
      >Log in</router-link
    >
    <h3 class="text-danger text-center" v-if="isValid">
      Invalid name or password
    </h3>
  </section>
</template>

<script>
export default {
  data: () => ({
    name: "",
    password: "",
    toRoute: "",
    isValid: false,
  }),
  methods: {
    async checkInfo() {
      const response = await fetch(
        `http://localhost:5000/user?name=${this.name}&password=${this.password}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        // console.log(data[0].role);
        data[0].role === "admin"
          ? (this.toRoute = "/admin")
          : (this.toRoute = "/student");
      } else {
        this.isValid = true;
      }
    },
  },
};
</script>

<style scoped>
section {
  margin: 5rem auto !important;
  padding: 5rem 3rem;
}
</style>
