import { assert } from "chai";
import { db } from "../src/models/db.js";
import { aoife } from "./fixtures.js";
import { testUsers } from "./fixtures.js";

suite("User API Tests", () => {
    setup(async () => {
        db.init("json");
        await db.userMembersStore.deleteAll();
        for (let i = 0; i < testUsers.length; i++) {
            testUsers[i] = await db.userMembersStore.addUser(testUsers[i]);
        }
    });

    test("create a user", async () => {
        const newUser = await db.userMembersStore.addUser(aoife);
        assert.deepEqual(aoife, newUser);
    });

    test("delete all users", async () => {
        let returnedUsers = await db.userMembersStore.getAllUsers();
        assert.equal(returnedUsers.length, 3);
        await db.userMembersStore.deleteAll();
        returnedUsers = await db.userMembersStore.getAllUsers();
        assert.equal(returnedUsers.length, 0);
    });

    test("get a user - success", async () => {
        const user = await db.userMembersStore.addUser(aoife);
        const returnedUser1 = await db.userMembersStore.getUserById(user._id);
        assert.deepEqual(user, returnedUser1);
        const returnedUser2 = await db.userMembersStore.getUserByEmail(user.email);
        assert.deepEqual(user, returnedUser2);
    });

    //Try to retrieve a user that has just been deleted

    test("delete One User - success", async () => {
        await db.userMembersStore.deleteUserById(testUsers[0]._id);
        const returnedUsers = await db.userMembersStore.getAllUsers();
        assert.equal(returnedUsers.length, testUsers.length - 1);
        const deletedUser = await db.userMembersStore.getUserById(testUsers[0]._id);
        assert.isNull(deletedUser);
        const deletedUser2 = await db.userMembersStore.getUserByEmail(testUsers[0].email);
        assert.isNull(deletedUser2);
    });

    test("get a user - bad id/ bad email", async () => {
        const badUser = await db.userMembersStore.getUserById("123");
        assert.isNull(badUser);
        const badUserEmail = await db.userMembersStore.getUserByEmail("killo@billo.ie");
        assert.isNull(badUserEmail);
    });

    test("get a user - bad params", async () => {
        let nullUser = await db.userMembersStore.getUserByEmail("");
        assert.isNull(nullUser);
        nullUser = await db.userMembersStore.getUserById("");
        assert.isNull(nullUser);
        nullUser = await db.userMembersStore.getUserById();
        assert.isNull(nullUser);
    });

    test("delete one user - fail", async () => {
        await db.userMembersStore.deleteUserById("99");
        const returnedUsers = await db.userMembersStore.getAllUsers();
        assert.equal(returnedUsers.length, testUsers.length);
    });
});
