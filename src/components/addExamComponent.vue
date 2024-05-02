<template>
  <section class="container">
    <div>
      <label for="name">Exam Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="examName"
        autocomplete="off"
      />
      <p class="text-danger d-none" ref="examName-val">
        you should enter the exam name
      </p>
    </div>
    <div>
      <label for="duration">Exam Duration</label>
      <input
        type="number"
        min="0"
        class="form-control"
        id="duration"
        v-model="examDuration"
      />
      <p class="text-danger d-none" ref="examDuration-val">
        you should enter the exam duration
      </p>
    </div>
    <div>
      <label for="question-no">Number of Questions</label>
      <input
        type="number"
        min="0"
        class="form-control"
        id="question-no"
        v-model="questions_no"
        ref="count"
      />
      <p class="text-danger d-none" ref="question-no-val">
        you must enter the number of questions
      </p>
    </div>
    <button class="btn btn-info my-2" @click="showQform">
      inset questions
    </button>
    <div v-if="isFormShown">
      <div
        v-for="x in this.questions_no"
        :key="x"
        :id="'question' + x"
        class="question"
      >
        <h2>Question number: {{ x }}</h2>
        <div class="form-floating">
          <input
            type="text"
            ref="title"
            id="title"
            class="form-control"
            placeholder="title"
          />
          <label for="title">Question Title</label>
        </div>
        <div>
          <h4>Question Answers</h4>

          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-1"></i></span>
            <input type="text" ref="ans1" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-2"></i></span>
            <input type="text" ref="ans2" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-3"></i></span>
            <input type="text" ref="ans3" class="form-control" />
          </div>
        </div>
        <div class="form-floating my-3">
          <input
            type="text"
            ref="correct"
            id="correct"
            class="form-control"
            placeholder="correct"
          />
          <label for="correct">Correct Answers</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            ref="degree"
            id="degree"
            class="form-control"
            placeholder="degree"
          />
          <label for="degree">Degree</label>
        </div>
        <hr />
      </div>
      <button class="btn btn-primary my-2" @click="addExam">Add Exam</button>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "@/stores/useMainStore";
export default {
  data: () => ({
    store: useMainStore(),
    examName: "",
    examDuration: "",
    questions_no: "",
    examQuestions: [],
    isFormShown: false,
  }),
  methods: {
    showQform() {
      if (this.questions_no === "" || this.questions_no <= 0) {
        this.$refs["question-no-val"].classList.remove("d-none");
        return false;
      }
      this.$refs["question-no-val"].classList.add("d-none");
      this.$refs["count"].disabled = true;
      this.isFormShown = true;
    },
    addExam() {
      if (this.examName === "") {
        this.$refs["examName-val"].classList.remove("d-none");
        if (this.examDuration === "" || this.examDuration <= 0)
          this.$refs["examDuration-val"].classList.remove("d-none");
        return false;
      }
      this.$refs["examName-val"].classList.add("d-none");
      this.$refs["examDuration-val"].classList.add("d-none");
      this.prepareQurestions();
      console.log(this.examQuestions);
      const Exam = {
        examName: this.examName,
        examDuration: this.examDuration,
        examQuestions: this.examQuestions,
      };
      fetch("http://localhost:5000/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Exam),
      })
        .then((response) => {
          this.$router.push("admin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prepareQurestions() {
      const allQurestions = document.querySelectorAll(".question");
      let allQuestions = [];
      for (let i = 0; i < allQurestions.length; i++) {
        const question = {
          questionNumber: i + 1,
          QuestionTitle: "",
          questionAnswers: [],
          correctAnswer: "",
          degree: "",
        };
        question.QuestionTitle = this.$refs.title[i].value;
        question.correctAnswer = this.$refs.correct[i].value;
        question.questionAnswers.push(this.$refs.ans1[i].value);
        question.questionAnswers.push(this.$refs.ans2[i].value);
        question.questionAnswers.push(this.$refs.ans3[i].value);
        question.degree = this.$refs.degree[i].value;
        allQuestions.push(question);
      }
      console.log(allQuestions);
      this.examQuestions = allQuestions;
    },
  },
  created() {
    if (!this.store.checkAuthentication()) {
      this.$router.push("/");
      return false;
    }
    if (!this.store.checkRole()) {
      this.$router.push("/unauthorized");
    }
  },
};
</script>

<style></style>
