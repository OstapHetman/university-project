import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewEngine from "@/components/NewEngine";
import ViewEngine from "@/components/ViewEngine";
import EditEngine from "@/components/EditEngine";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new-engine",
      name: "new-engine",
      component: NewEngine,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:engine_code",
      name: "edit-engine",
      component: EditEngine,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/view-engine/:engine_code",
      name: "view-engine",
      component: ViewEngine,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        requiresGuest: true
      }
    }
  ],
  mode: "history"
});

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
