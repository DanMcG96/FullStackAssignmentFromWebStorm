/* import { v4 } from "uuid";
import { oghamMembers } from "./oghams.js";

let categories = [];

export const categoryMembers = {
    async getAllCategories() {
        return categories;
    },

    async addCategory(category) {
        category._id = v4();
        categories.push(category);
        return category;
    },

    async getCategoryById(id) {
        const list = categories.find((category) => category._id === id);
        list.oghams = await oghamMembers.getOghamByCategoryId(list._id);
        return list;
    },

    async getUserCategories(userid) {
        return categories.filter((category) => category.userid === userid);
    },
    /*
    async getUserCategories(userid) {
        return categories.filter((category) => category.userid === userid);
    },

    async deleteCategoryById(id) {
        const index = categories.findIndex((category) => category._id === id);
        categories.splice(index, 1);
    },

    async deleteAllCategories() {
        categories = [];
    },
};
*/

import { v4 } from "uuid";
import { oghamMembers } from "./oghams.js";

let categories = [];

export const categoryMembers = {
    async getAllCategories() {
        return categories;
    },

    async addCategory(category) {
        category._id = v4();
        categories.push(category);
        return category;
    },

    async getCategoryById(id) {
        const list = categories.find((category) => category._id === id);
        list.oghams = await oghamMembers.getOghamsByCategoryId(list._id);
        return list;
    },

    async getUserCategories(userid) {
        return categories.filter((category) => category.userid === userid);
    },

    async deleteCategoryById(id) {
        const index = categories.findIndex((category) => category._id === id);
        categories.splice(index, 1);
    },

    async deleteAllCategories() {
        categories = [];
    },
};
