/* import { db } from "../models/db.js";

export const accountsController = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Ireland's Ogham's" });
        },
    },

    signUpForm: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-view", { title: "Ireland's Ogham's: Sign Up" });
        },
    },

    loginForm: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-view", { title: "Ireland's Ogham's: Login" });
        },
    },

    logIn: {
        auth: false,
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userMembersStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        },
    },

    signUp: {
        auth: false,
        handler: async function (request, h) {
            const user = request.payload;
            await db.userMembersStore.addUser(user);
            return h.redirect("/");
        },
    },

    logOut: {
        auth: false,
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    async validate(request, session) {
        const user = await db.userMembersStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },
};

*/

import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";
import { UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Playlist" });
        },
    },
    signUpForm: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-view", { title: "Sign up for Playlist" });
        },
    },
    signUp: {
        auth: false,
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const user = request.payload;
            await db.userMembersStore.addUser(user);
            return h.redirect("/");
        },
    },
    loginForm: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-view", { title: "Login to Playlist" });
        },
    },
    logIn: {
        auth: false,
        validate: {
            payload: UserCredentialsSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("login-view", { title: "Login Error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userMembersStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        },
    },

    logOut: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    async validate(request, session) {
        const user = await db.userMembersStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },
};
