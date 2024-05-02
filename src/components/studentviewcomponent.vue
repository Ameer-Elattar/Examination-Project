<template>
  <section class="row g-0 justify-content-evenly my-2">
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
        <p v-if="exam.examName in studentGrades">
          Marks: {{ studentGrades[exam.examName] }}
        </p>
      </div>
      <div class="card-footer">
        <p v-if="takenExam.includes(exam.examName)" class="btn btn-success">
          Exam Completed
        </p>
        <router-link
          :to="'exam/' + exam.id"
          class="btn btn-outline-primary"
          v-else
          >Take Exam</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "@/stores/useMainStore";
export default {
  data: () => ({
    store: useMainStore(),
    exams: [],
    takenExam: [],
    studentGrades: {},
  }),
  async created() {
    if (!this.store.checkAuthentication()) {
      this.$router.push("/");
    }
    const response = await fetch("http://localhost:5000/exam");
    this.exams = await response.json();
    let names = [];
    this.exams.map((exam) => names.push(exam.examName));
    let userID = JSON.parse(sessionStorage.getItem("userData"))[0].id;
    const updatedUserData = await fetch(`http://localhost:5000/user/${userID}`);
    const data = await updatedUserData.json();
    // console.log(data);
    this.studentGrades = data.grades;
    if (Object.keys(data.grades).length > 0) {
      Object.keys(data.grades).forEach((key) => {
        if (names.includes(key)) this.takenExam.push(key);
      });
    }
    console.log(this.takenExam);
    console.log(this.studentGrades);
  },
};
</script>

<style scoped>
.btn-success {
  cursor: default;
}
</style>
