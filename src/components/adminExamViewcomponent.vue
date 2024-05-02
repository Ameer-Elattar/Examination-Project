<template>
  <section>
    <section class="row g-0 justify-content-evenly my-3">
      <div
        class="card text-center shadow my-2"
        v-for="exam in this.exams"
        :key="exam.id"
        style="width: 22rem"
      >
        <div class="card-header">Subject Name: {{ exam.examName }}</div>
        <div class="card-body">
          <p>Exam Duration: {{ exam.examDuration }} min</p>
          <p>No of Questions: {{ exam.examQuestions.length }}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline-danger" @click="removeExam(exam.id)">
            Remove Exam
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import addExamcomponent from "./addExamComponent.vue";
import addStudentcomponent from "./addStudentComponent.vue";
import { useMainStore } from "@/stores/useMainStore";
export default {
  data: () => ({
    store: useMainStore(),
    exams: [],
  }),
  async created() {
    if (!this.store.checkAuthentication()) {
      console.log("admin view");
      this.$router.push("/");
      return false;
    }
    if (!this.store.checkRole()) {
      this.$router.push("/unauthorized");
    }
    const response = await fetch("http://localhost:5000/exam");
    this.exams = await response.json();
  },
  methods: {
    async removeExam(id) {
      await fetch(`http://localhost:5000/exam/${id}`, {
        method: "DELETE",
      });
      this.exams = this.exams.filter((exam) => exam.id != id);
    },
  },
  components: {
    addExamcomponent,
    addStudentcomponent,
  },
};
</script>

<style></style>
