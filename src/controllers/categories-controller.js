import { db } from "../models/db.js";
import { OghamSpec } from "../models/joi-schemas.js";

export const categoriesController = {
    index: {
        handler: async function (request, h) {
            const category = await db.categoryMembersStore.getCategoryById(request.params.id);
            const viewData = {
                title: "Ireland's Ogham's",
                category: category,
            };
            return h.view("categories-view", viewData);
        },
    },

    addOgham: {
        validate: {
            payload: OghamSpec,
            options: { abortEarly: false },
            failAction: async function (request, h, error) {
                const currentCategory = await db.categoryMembersStore.getCategoryById(request.params.id);
                return h.view("categories-view", { title: "Ogham: Error", category: currentCategory, errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const category = await db.categoryMembersStore.getCategoryById(request.params.id);
            const newOgham = {
                title: request.payload.title,
                lat: Number(request.payload.lat),
                long: Number(request.payload.long),
                county: request.payload.county,
                translation: request.payload.translation,
            };
            await db.oghamMembersStore.addOgham(category._id, newOgham);
            return h.redirect(`/category/${category._id}`);
        },
    },

    deleteOgham: {
        handler: async function (request, h) {
            const category = await db.categoryMembersStore.getCategoryById(request.params.id);
            await db.oghamMembersStore.deleteOgham(request.params.oghamid);
            return h.redirect(`/category/${category._id}`);
        },
    },
};
