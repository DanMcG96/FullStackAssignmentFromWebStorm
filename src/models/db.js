import { userMembers } from "./members/user-mem.js";
import { categoryMembers } from "./members/categories.js";
import { oghamMembers } from "./members/oghams.js";
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { oghamJsonStore } from "./json/ogham-json-store.js";

export const db = {
    userMembersStore: null,
    categoryMembersStore: null,
    oghamMembersStore: null,

    init(storeType) {
        switch (storeType) {
            case "json":
                this.categoryMembersStore = categoryJsonStore;
                this.userMembersStore = userJsonStore;
                this.oghamMembersStore = oghamJsonStore;
                break;
            default:
                this.categoryMembersStore = categoryMembers;
                this.userMembersStore = userMembers;
                this.oghamMembersStore = oghamMembers;
        }
    },
};
