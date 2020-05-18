import Vue from "vue";
import VueRouter from "vue-router";
import SendOpinion from "../views/SendOpinion.vue";
import SeeOpinion from "../views/SeeOpinion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SendOpinion",
    component: SendOpinion
  },
  {
    path: "/see",
    name: "SeeOpinion",
    component: SeeOpinion
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
