"use strict";
const db = require("./conn");
const bcrypt = require("bcryptjs");

class UsersModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // PRIVATE (Instance) METHOD TO CHECK PASSWORD VALIDITY
    async checkPassword(hashedPassword) {
        // RETURNS TRUE OR FALSE
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    // INSTANCE METHOD!
    // NOT PASSING ANY ARGUMENTS
    async save() {
        try {
            const response = await db.one(`INSERT INTO reviewer (name, email, password) VALUES ($1, $2, $3) RETURNING id;`, [this.name, this.email, this.password])
            return response;
        } catch (error) {
            console.error("ERROR: ", error.message);
            return error.message;
        }
    }

    // ANOTHER INSTANCE METHOD
    // NOT PASSING ARGUMENTS
    async login() {
        try {
            const response = await db.one(`SELECT id, name, email, password FROM reviewer WHERE email = $1;`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                // if (isValid === absolutely, completely, totally like really, really, TRUE)
                const { name, id } = response;
                return { isValid, name, user_id: id }
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error("ERROR:", error.message);
            return error.message;
        }
    }
}

module.exports = UsersModel;