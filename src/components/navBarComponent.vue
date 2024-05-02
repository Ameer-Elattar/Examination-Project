<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img src="@/assets/icons8-test-40.png" alt="" /> Online Test</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-white" id="offcanvasNavbar">
        <div class="offcanvas-header justify-content-end">
          <button
            type="button"
            class="btn fs-3 text-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end row-gap-4 flex-grow-1 pe-3">
            <!-- <li class="nav-item">
              <a
                class="nav-link active text-white fs-4"
                aria-current="page"
                href="#"
                ><i class="fa-solid fa-house"></i> Home</a
              >
            </li> -->
            <li class="nav-item" v-if="store.checkRole === false">
              <router-link to="/users" class="nav-link active text-white fs-4"
                ><i class="fa-solid fa-user"></i> Users</router-link
              >
            </li>
            <li class="nav-item dropdown" v-if="store.checkRole === false">
              <a
                class="nav-link dropdown-toggle text-white fs-4"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-book"></i> Exams
              </a>
              <ul class="dropdown-menu text-center">
                <li>
                  <router-link to="/admin" class="dropdown-item"
                    >Show all Exams</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link to="/addExam" class="dropdown-item"
                    >Add Exam</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link
                to="/"
                @click="logOut"
                class="nav-link active text-white fs-4"
                ><i class="fa-solid fa-right-from-bracket"></i>
                LogOut</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import addExamcomponent from "./addExamComponent.vue";
import addStudentcomponent from "./addStudentComponent.vue";
import { useMainStore } from "@/stores/useMainStore";

export default {
  data: () => ({
    store: useMainStore(),
  }),
  components: {
    addStudentcomponent,
    addExamcomponent,
  },
  methods: {
    logOut() {
      sessionStorage.clear();
    },
  },
};
</script>

<style>
/* li:hover{
background-color: #2D849F !important;
} */
.offcanvas {
  background-color: #155a70 !important;
  width: 15% !important;
}
.offcanvas-backdrop.show {
  opacity: 0 !important;
}
</style>
