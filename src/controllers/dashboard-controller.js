/*
import { db } from "../models/db.js";

export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const categories = await db.categoryMembersStore.getUserCategories(loggedInUser._id);
            //  const categories = await db.categoryMembersStore.getUserCategories(loggedInUser._id);
            //  const categories = await db.categoryMembersStore.getAllCategories();
            const viewData = {
                title: "test data",
                user: loggedInUser,
                categories: categories,
            };
            return h.view("dashboard-view", viewData);
        },
    },

    addCategory: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newCategory = {
                userid: loggedInUser._id,
                title: request.payload.title,
            };
            await db.categoryMembersStore.addCategory(newCategory);
            return h.redirect("/dashboard");
        },
    },
};
*/

import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";

export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const categories = await db.categoryMembersStore.getUserCategories(loggedInUser._id);
            const viewData = {
                title: "Playtime Dashboard",
                user: loggedInUser,
                categories: categories,
            };
            return h.view("dashboard-view", viewData);
        },
    },

    addCategory: {
        validate: {
            payload: CategorySpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard-view", { title: "Category Error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newCategory = {
                userid: loggedInUser._id,
                title: request.payload.title,
            };
            await db.categoryMembersStore.addCategory(newCategory);
            return h.redirect("/dashboard");
        },
    },

    deleteCategory: {
        handler: async function (request, h) {
            const category = await db.categoryMembersStore.getCategoryById(request.params.id);
            await db.categoryMembersStore.deleteCategoryById(category._id);
            return h.redirect("/dashboard");
        },
    },
};
