<template>
  <section class="row g-0 justify-content-evenly">
    <div
      class="card text-center shadow"
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
        <router-link :to="'exam/' + exam.id" class="btn btn-outline-success"
          >Take Exam</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    exams: [],
  }),
  async created() {
    const response = await fetch("http://localhost:5000/exam");
    this.exams = await response.json();
  },
};
</script>

<style></style>
