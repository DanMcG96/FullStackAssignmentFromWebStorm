import { assert } from "chai";
import { db } from "../src/models/db.js";
import { slieveWyle, testOghams } from "./fixtures.js";
import { v4 } from "uuid";

suite("Ogham API tests", async () => {
    setup(async () => {
        db.init("json");
        await db.oghamMembersStore.deleteAll0ghams();
        for (let i = 0; i < testOghams.length; i++) {
            testOghams[i] = db.oghamMembersStore.addOgham(v4(), testOghams[i]);
        }
    });

    test("Create Ogham", async () => {
        const ogham = await db.oghamMembersStore.addOgham(v4(), slieveWyle);
        assert.deepEqual(ogham, slieveWyle);
    });

    test("Get an Ogham", async () => {
        const ogham = await db.oghamMembersStore.addOgham(v4(), slieveWyle);
        const returnedOgham = db.oghamMembersStore.getOghamById(ogham._id);
        assert.deepEqual(ogham, slieveWyle, returnedOgham);
    });

    test("Get an Ogham -fail", async () => {
        const checkOghamId = await db.oghamMembersStore.getOghamById("");
        assert.isNull(checkOghamId);
        const checkOghamCategoryId = await db.oghamMembersStore.getOghamsByCategoryId("");
        assert.isNull(checkOghamCategoryId);
    });
});
