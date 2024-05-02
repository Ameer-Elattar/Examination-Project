<template>
  <template>{{ getExam($route.params.id) }}</template>
  <section>
    <div
      class="container bg-light d-flex justify-content-evenly my-2 rounded-3 p-2 shadow"
    >
      <h3>{{ this.examDetails.examName }}</h3>
      <button class="btn btn-primary" @click="StartExam">Start Exam</button>
      <h3 class="timer">Time: {{ this.examDetails.examDuration }} min</h3>
    </div>
    <div class="container text-center" v-if="this.isExamStarted">
      <div
        class="card my-3"
        v-for="question in this.examDetails.examQuestions"
        :key="question.questionNumber"
      >
        <div class="row">
          <h3>
            {{ question.QuestionTitle }}
          </h3>
          <small class="w-25 offset-10 text-danger"
            >{{ question.degree }} Mark</small
          >
        </div>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="ans in question.questionAnswers"
            :key="ans"
          >
            <input type="radio" :name="question.questionNumber" id="" />
            <span class="mx-3 answerLabel" @click="selectAnswer">{{
              ans
            }}</span>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <button class="btn btn-danger" @click="submitExam">Submit</button>
      </div>
    </div>
    <div v-if="isResultShown" class="text-center">
      <h1>{{ this.examResult }}</h1>
      <router-link to="/student">Back to Exams page</router-link>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "@/stores/useMainStore";
export default {
  data: () => ({
    store: useMainStore(),
    isExamStarted: false,
    isResultShown: false,
    examResult: 0,
    examDetails: {},
  }),
  created() {
    if (!this.store.checkAuthentication()) {
      this.$router.push("/");
    }
  },
  methods: {
    async getExam(_id) {
      const response = await fetch(`http://localhost:5000/exam/${_id}`);
      this.examDetails = await response.json();
      // console.log(this.examDetails);
    },
    startTimer() {
      let timer = document.querySelector(".timer");
      let min = this.examDetails.examDuration;
      let sec = 0;
      let timerInterval = setInterval(() => {
        if (this.isResultShown) clearInterval(timerInterval);
        if (sec === 0 && min === 0) {
          clearInterval(timerInterval);
        } else {
          if (sec === 0) {
            min--;
            sec = 59;
          } else {
            sec--;
          }
          timer.innerText = `Time: ${min.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`;
        }
      }, 1000);
    },
    StartExam($event) {
      this.startTimer();
      this.isExamStarted = true;
      $event.target.classList.add("d-none");
    },
    selectAnswer($event) {
      $event.target.previousElementSibling.checked = true;
    },
    submitExam() {
      let allRadio = [...document.querySelectorAll("input[type=radio]")];
      allRadio = allRadio.filter((input) => input.checked === true);
      let allAnswers = [];
      allRadio.map((input) =>
        allAnswers.push(input.nextElementSibling.innerText)
      );
      let degree = 0;
      for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i] === this.examDetails.examQuestions[i].correctAnswer) {
          degree += parseInt(this.examDetails.examQuestions[i].degree);
        }
      }
      this.examResult = degree;
      this.isResultShown = true;
      this.isExamStarted = false;
      const updatedData = this.store.userData[0];
      updatedData.grades[`${this.examDetails.examName}`] = degree;
      fetch(`http://localhost:5000/user/${this.store.userData[0].id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
