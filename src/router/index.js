import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewEngine from "@/components/NewEngine";
import ViewEngine from "@/components/ViewEngine";
import EditEngine from "@/components/EditEngine";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/new-engine",
      name: "new-engine",
      component: NewEngine
    },
    {
      path: "/edit/:engine_id",
      name: "edit-engine",
      component: EditEngine
    },
    {
      path: "/view-engine/:engine_id",
      name: "view-engine",
      component: ViewEngine
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ],
  mode: "history"
});
