import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import LoginView from "./views/LoginView.vue";
import HomeView from "./views/HomeView.vue";
import Logout from "./components/Logout.vue";
import SkillsCatalogue from "./components/SkillsCatalogue.vue";
import PaymentError from "./components/PaymentError.vue";
import PaymentFail from "./components/PaymentFail.vue";
import PaymentSuccess from "./components/PaymentSuccess.vue";
import UserProfile from "./components/UserProfile.vue";
import NotFound from "./components/NotFound.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
// import PaymentsDashboard from "./components/PaymentsDashboard.vue";
import RegistrationsDashboard from "./components/RegistrationsDashboard.vue";
import SkillsDashboard from "./components/SkillsDashboard.vue";
import StudentsDashboard from "./components/StudentsDashboard.vue";
import TrainersDashboard from "./components/TrainersDashboard.vue";

// Define route components
const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: SkillsCatalogue,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-success",
    name: "PaymentSuccess",
    component: PaymentSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-failure",
    name: "PaymentFailed",
    component: PaymentFail,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-error",
    name: "PaymentError",
    component: PaymentError,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Userprofile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: AdminDashboard,
    children: [
      { path: "skills", component: SkillsDashboard },
      { path: "trainers", component: TrainersDashboard },
      { path: "students", component: StudentsDashboard },
      { path: "registrations", component: RegistrationsDashboard },
      // { path: "payments", component: PaymentsDashboard },
      { path: "", redirect: "/admin/skills" },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
