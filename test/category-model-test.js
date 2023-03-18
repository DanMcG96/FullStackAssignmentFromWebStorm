import { assert } from "chai";
import { db } from "../src/models/db.js";
import { kildare, testCategories } from "./fixtures.js";

suite("Category API Tests", () => {
    setup(async () => {
        db.init("json");
        await db.categoryMembersStore.deleteAllCategories();
        for (let i = 0; i < testCategories.length; i++) {
            testCategories[i] = await db.categoryMembersStore.addCategory(testCategories[i]);
        }
    });

    test("Create a Category", async () => {
        const newCategory = await db.categoryMembersStore.addCategory(kildare);
        assert.deepEqual(newCategory, kildare);
    });

    test("delete all Categories", async () => {
        let categoriesBeforeDeleteAll = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesBeforeDeleteAll.length, 4);
        await db.categoryMembersStore.deleteAllCategories();
        const categoriesAfterDeleteAll = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesAfterDeleteAll.length, 0);
    });

    test("delete one category - success", async () => {
        let categoriesBeforeDeleteOne = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesBeforeDeleteOne.length, 4);
        await db.categoryMembersStore.deleteCategoryById(testCategories[0]._id);
        const categoriesAfterDeleteOne = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesAfterDeleteOne.length, categoriesBeforeDeleteOne.length - 1);
    });

    test("delete one category - fail", async () => {
        let categoriesB4DeleteOneFail = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesB4DeleteOneFail.length, 4);
        await db.categoryMembersStore.deleteCategoryById("drone");
        let categoriesAfterDeleteOneFail = await db.categoryMembersStore.getAllCategories();
        assert.equal(categoriesAfterDeleteOneFail.length, 4);
    });

    test("get a category - success", async () => {
        const newCategory = await db.categoryMembersStore.addCategory(kildare);
        const returnedCategory = await db.categoryMembersStore.getCategoryById(newCategory._id);
        assert.equal(newCategory, kildare);
    });

    test("get a category - fail", async () => {
        let returnedCategory = await db.categoryMembersStore.getCategoryById("");
        assert.isNull(returnedCategory);
    });

    test("get user categories", async () => {
        let newCategory = await db.categoryMembersStore.addCategory(kildare);
        assert.deepEqual(newCategory, kildare);
    });

    test("delete a category - bad id", async () => {
        let totalCategories = await db.categoryMembersStore.getAllCategories();
        assert.equal(totalCategories.length, 4);
        await db.categoryMembersStore.deleteCategoryById("123");
        let totalCategories2 = await db.categoryMembersStore.getAllCategories();
        assert.equal(totalCategories2.length, 4);
    });
});
