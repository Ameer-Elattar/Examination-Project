<template>
  <section class="container mt-5">
    <div class="d-flex justify-content-between mb-2">
      <h4>List of users</h4>
      <addStudentComponent @onAddPressed="addStudent" />
    </div>
    <table
      class="table table-striped shadow-lg table-bordered caption-top text-center align-middle"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>grades</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(std, index) in students" :key="std.id">
          <td>{{ index + 1 }}</td>
          <td>{{ std.name }}</td>
          <td class="w-25">
            <table
              v-if="Object.keys(std.grades).length"
              class="table border table-sm table-hover m-0"
            >
              <thead>
                <tr>
                  <th>subject</th>
                  <th>mark</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="(sub, key) in std.grades" :key="sub">
                  <td>{{ key }}</td>
                  <td>{{ sub }}</td>
                </tr>
              </tbody>
            </table>
            <h6 class="alert alert-danger m-0" v-else>Student has no grades</h6>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteStudent(std.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import addStudentComponent from "./addStudentComponent.vue";
import { useMainStore } from "@/stores/useMainStore";

export default {
  data: () => ({
    students: [],
    store: useMainStore(),
  }),
  async created() {
    if (!this.store.checkAuthentication()) {
      this.$router.push("/");
      return false;
    }
    if (!this.store.checkRole()) {
      this.$router.push("/unauthorized");
    }
    const res = await fetch("http://localhost:5000/user");
    const data = await res.json();
    this.students = data;
    this.students = this.students.filter(
      (student) => student.role === "student"
    );
  },
  methods: {
    deleteStudent(_id) {
      fetch(`http://localhost:5000/user/${_id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("student deleted", data);
          this.students = this.students.filter((std) => std.id != _id);
        })
        .catch((error) => {
          console.error("There was a problem deleting the student:", error);
        });
    },
    addStudent(studentData) {
      console.log(studentData);
      let id = parseInt(this.students[this.students.length - 1].id) + 1;
      studentData.id = `${id}`;
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(studentData),
      })
        .then((res) => this.students.push(studentData))
        .catch((err) => console.log(err));
    },
  },
  components: {
    addStudentComponent,
  },
  computed: {
    async studentUpdate() {
      const res = await fetch("http://localhost:5000/user");
      const data = await res.json();
      this.students = data;
      this.students = this.students.filter(
        (student) => student.role === "student"
      );
    },
  },
};
</script>

<style></style>
