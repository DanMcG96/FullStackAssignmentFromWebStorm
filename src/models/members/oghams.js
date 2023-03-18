import { v4 } from "uuid";

let oghams = [];

export const oghamMembers = {
    async getAllOghams() {
        return oghams;
    },

    async addOgham(categoryId, ogham) {
        ogham._id = v4();
        ogham.categoryid = categoryId;
        oghams.push(ogham);
        return ogham;
    },

    async getOghamsByCategoryId(id) {
        return oghams.filter((ogham) => ogham.categoryid === id);
    },

    async getOghamById(id) {
        return oghams.find((ogham) => ogham._id === id);
    },

    async getCategoryOghams(categoryId) {
        return oghams.filter((ogham) => ogham.categoryid === categoryId);
    },

    async deleteOgham(id) {
        const index = oghams.findIndex((ogham) => ogham._id === id);
        oghams.splice(index, 1);
    },

    updateOgham(ogham, updatedOgham) {
        ogham.title = updatedOgham.title;
        ogham.lat = updatedOgham.lat;
        ogham.long = updatedOgham.long;
        ogham.county = updatedOgham.county;
        ogham.translation = updatedOgham.translation;
    },

    async deleteAll() {
        oghams = [];
    },
};
