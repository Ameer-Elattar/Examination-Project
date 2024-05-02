<template>
  <section class="row justify-content-center gx-0 mt-5">
    <div class="form-control">
      <p class="title text-center">Welcome Back</p>
      <div class="input-field">
        <input
          required=""
          class="input"
          type="text"
          autocomplete="off"
          v-model="this.name"
        />
        <label class="label" for="input">Enter Name</label>
      </div>
      <div class="input-field">
        <input
          required=""
          class="input"
          type="password"
          v-model="this.password"
        />
        <label class="label" for="input">Enter Password</label>
      </div>
      <h3 class="text-danger text-center" v-if="isValid">
        Invalid name or password
      </h3>
      <button @click="checkInfo" class="submit-btn">Log In</button>
    </div>
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
      if (this.name === "" || this.password === "") {
        this.isValid = true;
        return false;
      }
      const response = await fetch(
        `http://localhost:5000/user?name=${this.name}&password=${this.password}`
      );
      const data = await response.json();
      if (data.length > 0) {
        sessionStorage.setItem("userData", JSON.stringify(data));
        data[0].role === "admin"
          ? this.$router.push("admin")
          : this.$router.push("student");
      } else {
        this.isValid = true;
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 20px;
  background-color: #ffffff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  border-radius: 8px;
}
.title {
  font-size: 28px;
  font-weight: 800;
}
.input-field {
  position: relative;
  width: 100%;
}

.input {
  margin-top: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  height: 45px;
  border: 1.5px solid #ecedec;
  background: transparent;
  padding-left: 10px;
}
.input:focus {
  border: 1.5px solid #2d79f3;
}
.input-field .label {
  position: absolute;
  top: 25px;
  left: 15px;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}
.input-field .input:focus ~ .label,
.input-field .input:valid ~ .label {
  top: 5px;
  left: 5px;
  font-size: 12px;
  color: #2d79f3;
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}
.submit-btn {
  margin-top: 30px;
  height: 55px;
  background: #f2f2f2;
  border-radius: 11px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(180deg, #363636 0%, #1b1b1b 50%, #000000 100%);
  box-shadow: 0px 0px 0px 0px #ffffff, 0px 0px 0px 0px #000000;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.submit-btn:hover {
  box-shadow: 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #0000003a;
}
</style>
