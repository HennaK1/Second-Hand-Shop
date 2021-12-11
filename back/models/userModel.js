"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(
        "SELECT Email, UserName, FROM User"
    );
    return rows;
  } catch (e) {
    console.error("getAllUsers error", e.message);
    next(httpError("Database error", 500));
  }
};

const getUser = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
        "SELECT Email, UserName FROM User WHERE UserName = ?",
        [id]
    );
    return rows;
  } catch (e) {
    console.error("getUser error", e.message);
    next(httpError("Database error", 500));
  }
};

const addUser = async (name, email, username, password, next) => {
  try {
    const [rows] = await promisePool.execute(
        "INSERT INTO User (FirstName, Email, UserName, Password,) VALUES (?, ?, ?, ?)",
        [name, email, username, password]
    );
    return rows;
  } catch (e) {
    console.error("addUser error", e.message);
    next(httpError("Database error", 500));
  }
};

const getUserLogin = async (params) => {
  try {
    console.log("getUserLogin", params);
    const [rows] = await promisePool.execute(
        "SELECT * FROM User WHERE Email = ?;",
        params
    );
    return rows;
  } catch (e) {
    console.log("getUserLogin error", e.message);
    return [];
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
};