<template>
  <section>
    <button
      class="btn btn-primary "
      data-bs-toggle="modal"
      data-bs-target="#addStudent"
    >
      Add Student
    </button>
    <div class="modal fade" id="addStudent">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Add student</h3>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body gap-3 row">
            <div class="row align-items-center gx-0">
              <label for="name" class="col-2 ps-1">Name:</label>
              <input
                type="text"
                class="form-control col"
                id="name"
                v-model="name"
              />
              <p class="text-danger d-none text-center" ref="name">
                the name field should not be empty
              </p>
            </div>
            <div class="row align-items-center gx-0">
              <label for="password" class="col-2 ps-1">Password:</label>
              <input
                type="password"
                class="form-control col"
                id="password"
                v-model="password"
              />
              <p class="text-danger d-none text-center" ref="password">
                the password field should not be empty
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="raiseEvent">Add</button>
            <button
              class="btn btn-danger"
              data-bs-dismiss="modal"
              ref="dismiss"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    name: "",
    password: "",
  }),
  methods: {
    inputValidation() {
      this.$refs.name.classList.add("d-none");
      this.$refs.password.classList.add("d-none");
      if (this.name === "") {
        this.$refs.name.classList.remove("d-none");
        if (this.password === "") {
          this.$refs.password.classList.remove("d-none");
        }
        return false;
      }
      return true;
    },
    raiseEvent() {
      if (!this.inputValidation()) return false;
      let studentData = {
        name: this.name,
        password: this.password,
        role: "student",
        grades: {},
      };
      this.$emit("onAddPressed", studentData);
      this.$refs.dismiss.click();
    },
  },
};
</script>

<style scoped>
</style>
