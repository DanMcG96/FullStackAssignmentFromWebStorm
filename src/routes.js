import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { categoriesController } from "./controllers/categories-controller.js";

export const routes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.signUpForm },
    { method: "GET", path: "/login", config: accountsController.loginForm },
    { method: "GET", path: "/logout", config: accountsController.logOut },
    { method: "POST", path: "/register", config: accountsController.signUp },
    { method: "POST", path: "/authenticate", config: accountsController.logIn },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },

    { method: "GET", path: "/category/{id}", config: categoriesController.index },
    { method: "POST", path: "/category/{id}/addogham", config: categoriesController.addOgham },
    { method: "PUT", path: "/category/{id}/addogham", config: categoriesController.updateOgham },

    { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },
    { method: "GET", path: "/category/{id}/deleteogham/{oghamid}", config: categoriesController.deleteOgham },
];
