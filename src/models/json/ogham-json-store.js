import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/oghams.json"));
db.data = { oghams: [] };

export const oghamJsonStore = {
    async getAlloghams() {
        await db.read();
        return db.data.oghams;
    },

    async addOgham(categoryId, ogham) {
        await db.read();
        ogham._id = v4();
        ogham.categoryid = categoryId;
        db.data.oghams.push(ogham);
        await db.write();
        return ogham;
    },

    async getOghamsByCategoryId(id) {
        await db.read();
        return db.data.oghams.filter((ogham) => ogham.categoryid === id);
    },

    async getOghamById(id) {
        await db.read();
        let u = db.data.oghams.find((ogham) => ogham._id === id);
        if (u === undefined) u = null;
        return u;
    },

    async deleteOgham(id) {
        await db.read();
        const index = db.data.oghams.findIndex((ogham) => ogham._id === id);
        db.data.oghams.splice(index, 1);
        await db.write();
    },

    async deleteAll0ghams() {
        db.data.oghams = [];
        await db.write();
    },

    async updateOgham(ogham, updatedOgham) {
        ogham.title = updatedOgham.title;
        ogham.lat = updatedOgham.lat;
        ogham.long = updatedOgham.long;
        ogham.county = updatedOgham.county;
        ogham.translation = updatedOgham.translation;
        await db.write();
    },
};
